export interface ApiResponse<T> {
  data: T; message?: string; success: boolean
}

export interface ApiError {
  message: string; code?: string; status: number; details?: Record<string, any>
}

export interface UploadResponse {
  url: string; key: string; contentType: string; size: number
}

export interface AuthTokens {
  accessToken: string; refreshToken: string; expiresIn: number
}

export interface LoginInput { email: string; password: string }
export interface RegisterInput {
  email: string; password: string; fullName: string
  preferredLanguage?: string; isElder?: boolean
}
