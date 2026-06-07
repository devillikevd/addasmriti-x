import { apiClient } from './client'
import type { Memory, CreateMemoryInput, MemoryFilter, PaginatedResponse } from '@/types/memory'

export const memoriesApi = {
  async getAll(filter?: MemoryFilter, page = 1, limit = 20): Promise<PaginatedResponse<Memory>> {
    const { data } = await apiClient.get('/api/v1/memories', { params: { ...filter, page, limit } })
    return data
  },

  async getById(id: string): Promise<Memory> {
    const { data } = await apiClient.get(`/api/v1/memories/${id}`)
    return data
  },

  async create(input: CreateMemoryInput): Promise<Memory> {
    const formData = new FormData()
    Object.entries(input).forEach(([key, val]) => {
      if (val instanceof File) formData.append(key, val)
      else if (Array.isArray(val)) val.forEach(v => formData.append(key, v instanceof File ? v : String(v)))
      else if (val !== undefined) formData.append(key, String(val))
    })
    const { data } = await apiClient.post('/api/v1/memories', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    return data
  },

  async update(id: string, input: Partial<CreateMemoryInput>): Promise<Memory> {
    const { data } = await apiClient.patch(`/api/v1/memories/${id}`, input)
    return data
  },

  async delete(id: string): Promise<void> {
    await apiClient.delete(`/api/v1/memories/${id}`)
  },

  async like(id: string): Promise<void> {
    await apiClient.post(`/api/v1/memories/${id}/like`)
  },

  async share(id: string): Promise<{ shareUrl: string }> {
    const { data } = await apiClient.post(`/api/v1/memories/${id}/share`)
    return data
  },

  async search(query: string, page = 1): Promise<PaginatedResponse<Memory>> {
    const { data } = await apiClient.get('/api/v1/memories/search', { params: { q: query, page } })
    return data
  },
}
