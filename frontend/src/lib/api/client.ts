import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000'
const AI_URL = process.env.NEXT_PUBLIC_AI_SERVICE_URL || 'http://localhost:8002'

function createClient(baseURL: string): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: { 'Content-Type': 'application/json' },
  })

  client.interceptors.request.use((config: InternalAxiosRequestConfig) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('access_token')
      if (token) config.headers.Authorization = `Bearer ${token}`
    }
    return config
  })

  client.interceptors.response.use(
    res => res,
    async (error: AxiosError) => {
      if (error.response?.status === 401 && typeof window !== 'undefined') {
        localStorage.removeItem('access_token')
        window.location.href = '/auth/login'
      }
      return Promise.reject(error)
    }
  )
  return client
}

export const apiClient = createClient(API_URL)
export const aiClient = createClient(AI_URL)
