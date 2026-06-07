export type MemoryType = 'story' | 'event' | 'tradition' | 'recipe' | 'festival' | 'personal' | 'historical' | 'song' | 'poem'
export type Language = 'en' | 'bn' | 'hi' | 'ta' | 'te' | 'mr' | 'pa' | 'gu' | 'kn' | 'ml' | 'ur' | 'or' | 'as' | 'ne' | 'si' | 'sa'
export type EmotionTag = 'nostalgia' | 'joy' | 'sadness' | 'pride' | 'gratitude' | 'humor' | 'love' | 'peace' | 'longing' | 'wonder'
export type PreservationStatus = 'draft' | 'processing' | 'published' | 'archived'

export interface Coordinates { latitude: number; longitude: number }
export interface Location {
  id: string; name: string; address?: string; city: string
  state?: string; country: string; coordinates?: Coordinates
  locationType?: string; historicalSignificance?: string
}

export interface Memory {
  id: string; userId: string; title: string; content: string
  memoryType: MemoryType; timePeriod?: string; exactDate?: string
  location?: Location; emotionTags: EmotionTag[]; peopleMentioned: string[]
  placesMentioned: string[]; culturalSignificance: number; language: Language
  audioUrl?: string; videoUrl?: string; images: string[]; transcript?: string
  metadata?: Record<string, any>; viewCount: number; likeCount: number
  shareCount: number; preservationStatus: PreservationStatus
  isPublic: boolean; createdAt: string; updatedAt: string; author?: User
}

export interface User {
  id: string; email: string; fullName: string; avatarUrl?: string
  isElder: boolean; preferredLanguage: Language; bio?: string
  digitalTwinId?: string; location?: string; followerCount?: number
  followingCount?: number; memoryCount?: number; createdAt: string
}

export interface CreateMemoryInput {
  title: string; content: string; memoryType: MemoryType
  timePeriod?: string; exactDate?: string; location?: Partial<Location>
  emotionTags?: EmotionTag[]; peopleMentioned?: string[]
  language: Language; audioFile?: File; videoFile?: File
  images?: File[]; isPublic?: boolean
}

export interface MemoryFilter {
  memoryType?: MemoryType; language?: Language; emotionTags?: EmotionTag[]
  timePeriod?: string; location?: string; isPublic?: boolean; userId?: string
}

export interface PaginatedResponse<T> {
  data: T[]; total: number; page: number; limit: number; hasMore: boolean
}
