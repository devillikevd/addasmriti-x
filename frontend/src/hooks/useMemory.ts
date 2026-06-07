import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { memoriesApi } from '@/lib/api/memories'
import type { CreateMemoryInput, MemoryFilter } from '@/types/memory'
import toast from 'react-hot-toast'

export function useMemories(filter?: MemoryFilter, page = 1) {
  return useQuery({
    queryKey: ['memories', filter, page],
    queryFn: () => memoriesApi.getAll(filter, page),
    staleTime: 30_000,
  })
}

export function useMemory(id: string) {
  return useQuery({
    queryKey: ['memory', id],
    queryFn: () => memoriesApi.getById(id),
    enabled: !!id,
  })
}

export function useCreateMemory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (input: CreateMemoryInput) => memoriesApi.create(input),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['memories'] })
      toast.success('Memory preserved! 🎉')
    },
    onError: (err: any) => toast.error(err?.response?.data?.message || 'Failed to save memory'),
  })
}

export function useLikeMemory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => memoriesApi.like(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['memories'] }),
  })
}

export function useDeleteMemory() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (id: string) => memoriesApi.delete(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['memories'] })
      toast.success('Memory deleted')
    },
  })
}
