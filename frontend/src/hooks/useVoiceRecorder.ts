import { useState, useRef, useCallback } from 'react'

export type RecorderStatus = 'idle' | 'recording' | 'paused' | 'stopped'

export function useVoiceRecorder(maxDurationSec = 600) {
  const [status, setStatus] = useState<RecorderStatus>('idle')
  const [duration, setDuration] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [audioUrl, setAudioUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const timerRef = useRef<NodeJS.Timeout | null>(null)

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const recorder = new MediaRecorder(stream)
      mediaRecorderRef.current = recorder
      chunksRef.current = []

      recorder.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data) }
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        setAudioBlob(blob)
        setAudioUrl(URL.createObjectURL(blob))
        stream.getTracks().forEach(t => t.stop())
        setStatus('stopped')
      }

      recorder.start(100)
      setStatus('recording')
      setDuration(0)
      timerRef.current = setInterval(() => {
        setDuration(d => {
          if (d + 1 >= maxDurationSec) { stop(); return d }
          return d + 1
        })
      }, 1000)
    } catch (err) {
      setError('Microphone access denied')
    }
  }, [maxDurationSec])

  const pause = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'recording') {
      mediaRecorderRef.current.pause()
      if (timerRef.current) clearInterval(timerRef.current)
      setStatus('paused')
    }
  }, [])

  const resume = useCallback(() => {
    if (mediaRecorderRef.current?.state === 'paused') {
      mediaRecorderRef.current.resume()
      timerRef.current = setInterval(() => setDuration(d => d + 1), 1000)
      setStatus('recording')
    }
  }, [])

  const stop = useCallback(() => {
    if (mediaRecorderRef.current && ['recording', 'paused'].includes(mediaRecorderRef.current.state)) {
      mediaRecorderRef.current.stop()
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const reset = useCallback(() => {
    if (audioUrl) URL.revokeObjectURL(audioUrl)
    setAudioBlob(null); setAudioUrl(null); setDuration(0); setStatus('idle'); setError(null)
  }, [audioUrl])

  return { status, duration, audioBlob, audioUrl, error, start, pause, resume, stop, reset }
}
