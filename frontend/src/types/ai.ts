export interface DigitalTwin {
  id: string; userId: string; twinName: string; voiceModelId?: string
  personalityVector?: number[]; speakingStyle?: Record<string, any>
  dialectFeatures?: Record<string, any>; emotionPatterns?: Record<string, any>
  memoryCount: number; trainingStatus: 'pending' | 'training' | 'completed' | 'failed'
  modelVersion?: string; lastTrainedAt?: string; avatarUrl?: string; createdAt: string
}

export interface ChatMessage {
  id: string; role: 'user' | 'assistant'; content: string
  audioUrl?: string; timestamp: string; metadata?: Record<string, any>
}

export interface VoiceRecording { blob: Blob; duration: number; url: string }

export interface AIGenerationJob {
  id: string; type: 'podcast' | 'documentary' | 'story' | 'comic' | 'book'
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress: number; outputUrl?: string; error?: string
  createdAt: string; completedAt?: string; title?: string; description?: string
}

export interface TranscriptionResult {
  text: string; language: string; confidence: number; segments?: Array<{
    start: number; end: number; text: string; confidence: number
  }>
}

export interface VoiceCloneJob {
  id: string; status: 'pending' | 'processing' | 'completed' | 'failed'
  voiceModelId?: string; sampleCount: number; createdAt: string
}
