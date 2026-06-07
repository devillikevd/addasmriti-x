import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Memory, MemoryFilter } from '@/types/memory'

interface MemoryState {
  memories: Memory[]
  selectedMemory: Memory | null
  filter: MemoryFilter
  searchQuery: string
  isLoading: boolean
  setMemories: (memories: Memory[]) => void
  setSelectedMemory: (memory: Memory | null) => void
  setFilter: (filter: Partial<MemoryFilter>) => void
  setSearchQuery: (q: string) => void
  setLoading: (v: boolean) => void
  addMemory: (memory: Memory) => void
  removeMemory: (id: string) => void
  updateMemory: (id: string, updates: Partial<Memory>) => void
}

export const useMemoryStore = create<MemoryState>()(
  immer(set => ({
    memories: [],
    selectedMemory: null,
    filter: {},
    searchQuery: '',
    isLoading: false,
    setMemories: (memories) => set(s => { s.memories = memories }),
    setSelectedMemory: (memory) => set(s => { s.selectedMemory = memory }),
    setFilter: (filter) => set(s => { s.filter = { ...s.filter, ...filter } }),
    setSearchQuery: (q) => set(s => { s.searchQuery = q }),
    setLoading: (v) => set(s => { s.isLoading = v }),
    addMemory: (memory) => set(s => { s.memories.unshift(memory) }),
    removeMemory: (id) => set(s => { s.memories = s.memories.filter(m => m.id !== id) }),
    updateMemory: (id, updates) => set(s => {
      const idx = s.memories.findIndex(m => m.id === id)
      if (idx !== -1) Object.assign(s.memories[idx], updates)
    }),
  }))
)
