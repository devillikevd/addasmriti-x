'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, Square, Play, Pause, Trash2, Upload, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils/cn'
import { formatDuration } from '@/lib/utils/date'

interface VoiceRecorderProps {
  onRecordingComplete: (blob: Blob, duration: number) => void
  maxDuration?: number
  className?: string
}

type RecorderState = 'idle' | 'recording' | 'paused' | 'done'

export function VoiceRecorder({ onRecordingComplete, maxDuration = 600, className }: VoiceRecorderProps) {
  const [state, setState] = useState<RecorderState>('idle')
  const [duration, setDuration] = useState(0)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [visualizerData, setVisualizerData] = useState<number[]>(Array(40).fill(5))

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioChunksRef = useRef<Blob[]>([])
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const timerRef = useRef<NodeJS.Timeout | null>(null)
  const analyserRef = useRef<AnalyserNode | null>(null)
  const animFrameRef = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      if (audioUrl) URL.revokeObjectURL(audioUrl)
    }
  }, [audioUrl])

  const updateVisualizer = useCallback(() => {
    if (!analyserRef.current) return
    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)
    const normalized = Array.from({ length: 40 }, (_, i) => {
      const idx = Math.floor(i * dataArray.length / 40)
      return Math.max(4, (dataArray[idx] / 255) * 80)
    })
    setVisualizerData(normalized)
    animFrameRef.current = requestAnimationFrame(updateVisualizer)
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: { echoCancellation: true, noiseSuppression: true, sampleRate: 44100 } })

      const audioCtx = new AudioContext()
      const source = audioCtx.createMediaStreamSource(stream)
      const analyser = audioCtx.createAnalyser()
      analyser.fftSize = 256
      source.connect(analyser)
      analyserRef.current = analyser
      updateVisualizer()

      const mediaRecorder = new MediaRecorder(stream, { mimeType: 'audio/webm;codecs=opus' })
      mediaRecorderRef.current = mediaRecorder
      audioChunksRef.current = []

      mediaRecorder.ondataavailable = (e) => { if (e.data.size > 0) audioChunksRef.current.push(e.data) }
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setAudioUrl(url)
        onRecordingComplete(blob, duration)
        stream.getTracks().forEach(t => t.stop())
        if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
        setVisualizerData(Array(40).fill(5))
        setState('done')
      }

      mediaRecorder.start(100)
      setState('recording')
      timerRef.current = setInterval(() => {
        setDuration(prev => {
          if (prev + 1 >= maxDuration) { stopRecording(); return prev }
          return prev + 1
        })
      }, 1000)
    } catch (err) {
      console.error('Microphone error:', err)
      alert('Could not access microphone. Please allow microphone permissions.')
    }
  }

  const pauseRecording = () => {
    if (!mediaRecorderRef.current) return
    if (state === 'recording') {
      mediaRecorderRef.current.pause()
      if (timerRef.current) clearInterval(timerRef.current)
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      setState('paused')
    } else if (state === 'paused') {
      mediaRecorderRef.current.resume()
      timerRef.current = setInterval(() => setDuration(p => p + 1), 1000)
      updateVisualizer()
      setState('recording')
    }
  }

  const stopRecording = () => {
    mediaRecorderRef.current?.stop()
    if (timerRef.current) clearInterval(timerRef.current)
  }

  const deleteRecording = () => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioUrl(null)
    setDuration(0)
    setState('idle')
    audioChunksRef.current = []
  }

  const progress = maxDuration > 0 ? (duration / maxDuration) * 100 : 0

  return (
    <div className={cn("w-full", className)}>
      {/* Visualizer */}
      <div className="relative mb-6 h-36 rounded-3xl bg-gradient-to-br from-heritage-50 to-bengal-50 border border-heritage-100 flex items-center justify-center overflow-hidden">
        {state === 'recording' || state === 'paused' ? (
          <div className="flex items-end gap-0.5 h-20 px-4">
            {visualizerData.map((h, i) => (
              <motion.div
                key={i}
                className={cn("flex-1 rounded-full", state === 'paused' ? 'bg-neutral-300' : 'bg-gradient-to-t from-heritage-500 to-bengal-400')}
                animate={{ height: state === 'paused' ? 4 : h }}
                transition={{ duration: 0.1 }}
              />
            ))}
          </div>
        ) : state === 'done' ? (
          <div className="text-center">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="text-lg font-bold text-neutral-700">{formatDuration(duration)}</p>
            <p className="text-sm text-neutral-400">Recording saved</p>
          </div>
        ) : (
          <div className="text-center text-neutral-400">
            <Mic className="w-10 h-10 mx-auto mb-2 opacity-30" />
            <p className="text-sm">Tap to start recording</p>
          </div>
        )}

        {/* Progress bar */}
        {(state === 'recording' || state === 'paused') && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-100">
            <motion.div className="h-full bg-gradient-to-r from-heritage-500 to-bengal-400 rounded-full"
              style={{ width: `${progress}%` }} />
          </div>
        )}
      </div>

      {/* Timer */}
      {(state === 'recording' || state === 'paused') && (
        <div className="text-center mb-5">
          <motion.p
            className={cn("text-5xl font-black tabular-nums", state === 'paused' ? 'text-neutral-400' : 'text-heritage-600')}
            animate={state === 'recording' ? { opacity: [1, 0.6, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          >
            {formatDuration(duration)}
          </motion.p>
          <p className="text-sm text-neutral-400 mt-1">{state === 'paused' ? '⏸ Paused' : '⏺ Recording'}</p>
        </div>
      )}

      {/* Controls */}
      <div className="flex items-center justify-center gap-4">
        <AnimatePresence mode="wait">
          {state === 'idle' && (
            <motion.div key="idle" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
              <Button size="xl" onClick={startRecording} className="rounded-full h-20 w-20 p-0 shadow-xl animate-pulse-glow">
                <Mic className="h-8 w-8" />
              </Button>
            </motion.div>
          )}

          {(state === 'recording' || state === 'paused') && (
            <motion.div key="recording" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-4">
              <Button size="lg" variant="outline" onClick={pauseRecording} className="rounded-full h-14 w-14 p-0">
                {state === 'paused' ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
              </Button>
              <Button size="xl" variant="destructive" onClick={stopRecording} className="rounded-full h-20 w-20 p-0 shadow-lg">
                <Square className="h-7 w-7" fill="currentColor" />
              </Button>
            </motion.div>
          )}

          {state === 'done' && (
            <motion.div key="done" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} className="flex items-center gap-4">
              {audioUrl && (
                <Button size="lg" variant="outline" onClick={() => {
                  if (audioRef.current) { isPlaying ? audioRef.current.pause() : audioRef.current.play(); setIsPlaying(!isPlaying) }
                }} className="rounded-full h-14 w-14 p-0">
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
              )}
              <Button size="lg" variant="outline" onClick={deleteRecording} className="rounded-full h-14 w-14 p-0 border-red-200 text-red-500 hover:bg-red-50">
                <Trash2 className="h-5 w-5" />
              </Button>
              <Button size="lg" onClick={startRecording} className="rounded-full h-14 w-14 p-0">
                <Mic className="h-5 w-5" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {audioUrl && (
        <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} className="hidden" />
      )}
    </div>
  )
}
