'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Heart, Share2, Volume2, Eye, Bookmark, Sparkles } from 'lucide-react'
import type { Memory } from '@/types/memory'
import { cn } from '@/lib/utils/cn'
import { formatRelativeTime, formatNumber } from '@/lib/utils/format'
import { useState } from 'react'

interface MemoryCardProps {
  memory: Memory
  onLike?: () => void
  onShare?: () => void
  onPlay?: () => void
  className?: string
}

const EMOTION_EMOJI: Record<string, string> = {
  nostalgia: '🌅', joy: '😊', sadness: '💧', pride: '🦁', gratitude: '🙏',
  humor: '😄', love: '❤️', peace: '🕊️', longing: '🌙', wonder: '✨'
}

export function MemoryCard({ memory, onLike, onShare, onPlay, className }: MemoryCardProps) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(memory.likeCount)

  const handleLike = () => {
    setLiked(!liked)
    setLikeCount(c => liked ? c - 1 : c + 1)
    onLike?.()
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn("group relative glass-panel rounded-3xl border border-white/10 overflow-hidden shadow-xl hover:shadow-[0_20px_40px_rgba(255,127,26,0.15)] transition-all duration-300", className)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-heritage-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      
      {/* Cover image */}
      {memory.images?.[0] ? (
        <div className="relative h-56 overflow-hidden">
          <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
          <img src={memory.images[0]} alt={memory.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-black/20 to-transparent z-10" />
          
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            <span className="text-xs bg-black/60 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full font-medium uppercase tracking-wider">
              {memory.memoryType}
            </span>
          </div>
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2 z-20">
            {memory.emotionTags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs glass-dark border border-white/20 text-white/90 px-2.5 py-1 rounded-full font-medium shadow-lg">
                {EMOTION_EMOJI[tag]} <span className="capitalize">{tag}</span>
              </span>
            ))}
          </div>
          {memory.audioUrl && (
            <button onClick={onPlay} className="absolute top-4 left-4 w-10 h-10 bg-heritage-500 text-white rounded-full flex items-center justify-center hover:bg-heritage-400 transition-colors shadow-[0_0_15px_rgba(255,127,26,0.5)] z-20">
              <Volume2 className="h-5 w-5" />
            </button>
          )}
        </div>
      ) : (
        <div className="h-48 relative overflow-hidden flex items-center justify-center glass-dark border-b border-white/5">
          <div className="absolute inset-0 bg-gradient-to-br from-heritage-500/20 to-bengal-500/20 blur-2xl" />
          <span className="text-6xl relative z-10 filter drop-shadow-lg group-hover:scale-110 transition-transform duration-500">
            {memory.memoryType === 'recipe' ? '🍛' : memory.memoryType === 'festival' ? '🎉' : memory.memoryType === 'song' ? '🎵' : '📖'}
          </span>
        </div>
      )}

      <div className="p-6 relative z-10">
        <div className="flex items-start gap-3 mb-4">
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-xl text-white leading-tight mb-2 line-clamp-2 group-hover:text-heritage-400 transition-colors">{memory.title}</h3>
            <p className="text-sm text-white/50 line-clamp-2 leading-relaxed font-light">{memory.content}</p>
          </div>
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-white/40 mb-5 font-medium">
          {memory.timePeriod && (
            <span className="flex items-center gap-1.5"><Calendar className="h-3.5 w-3.5" />{memory.timePeriod}</span>
          )}
          {memory.location && (
            <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" />{memory.location.city}</span>
          )}
          <span className="flex items-center gap-1.5"><Eye className="h-3.5 w-3.5" />{formatNumber(memory.viewCount)} views</span>
        </div>

        {/* Author row */}
        {memory.author && (
          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-white/10">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-bengal-500 flex items-center justify-center text-white text-xs font-bold shrink-0 shadow-lg">
              {memory.author.fullName.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white/90 truncate">{memory.author.fullName}</p>
              <p className="text-xs text-white/40">{formatRelativeTime(memory.createdAt)}</p>
            </div>
            {memory.author.isElder && (
              <span className="text-xs bg-heritage-500/20 border border-heritage-500/30 text-heritage-400 px-2.5 py-1 rounded-full font-bold tracking-wider uppercase">Elder</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            <button onClick={handleLike} className={cn("flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all border border-transparent",
              liked ? "bg-red-500/20 text-red-400 border-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.2)]" : "text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20")}>
              <Heart className={cn("h-4 w-4", liked && "fill-current")} />
              {formatNumber(likeCount)}
            </button>
            <button onClick={onShare} className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full text-white/50 hover:text-white hover:bg-white/10 hover:border-white/20 border border-transparent transition-all">
              <Share2 className="h-4 w-4" />
              {formatNumber(memory.shareCount)}
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className={cn("text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1",
              memory.culturalSignificance >= 8 ? "bg-heritage-500/20 border border-heritage-500/30 text-heritage-300 shadow-[0_0_10px_rgba(255,127,26,0.2)]" :
              memory.culturalSignificance >= 5 ? "bg-bengal-500/20 border border-bengal-500/30 text-bengal-300" : "bg-white/10 border border-white/20 text-white/60"
            )}>
              <Sparkles className="w-3 h-3" /> {memory.culturalSignificance}/10
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  )
}
