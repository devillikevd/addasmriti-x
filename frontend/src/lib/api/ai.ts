import { aiClient } from './client'
import type { ChatMessage, AIGenerationJob, TranscriptionResult, VoiceCloneJob } from '@/types/ai'

export const aiApi = {
  async chat(twinId: string, message: string, userId: string): Promise<ChatMessage> {
    const { data } = await aiClient.post('/api/v1/chat', { twin_id: twinId, message, user_id: userId })
    return data
  },

  async transcribe(audioBlob: Blob): Promise<TranscriptionResult> {
    const form = new FormData()
    form.append('audio', audioBlob, 'recording.webm')
    const { data } = await aiClient.post('/api/v1/transcribe', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data
  },

  async trainTwin(twinId: string, memoryIds: string[]): Promise<{ status: string }> {
    const { data } = await aiClient.post('/api/v1/train-twin', { twin_id: twinId, memory_ids: memoryIds })
    return data
  },

  async generatePodcast(memoryIds: string[], title: string): Promise<AIGenerationJob> {
    const { data } = await aiClient.post('/api/v1/generate/podcast', { memory_ids: memoryIds, title })
    return data
  },

  async getJobStatus(jobId: string): Promise<AIGenerationJob> {
    const { data } = await aiClient.get(`/api/v1/jobs/${jobId}`)
    return data
  },

  async cloneVoice(audioBlobs: Blob[]): Promise<VoiceCloneJob> {
    const form = new FormData()
    audioBlobs.forEach((b, i) => form.append('samples', b, `sample_${i}.webm`))
    const { data } = await aiClient.post('/api/v1/voice/clone', form, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data
  },
}
