import { formatDistanceToNow, format, parseISO, isValid } from 'date-fns'

export function formatRelativeTime(dateString: string): string {
  try {
    const date = parseISO(dateString)
    if (!isValid(date)) return 'Unknown date'
    return formatDistanceToNow(date, { addSuffix: true })
  } catch { return 'Unknown date' }
}

export function formatDate(dateString: string, fmt = 'MMM dd, yyyy'): string {
  try {
    const date = parseISO(dateString)
    if (!isValid(date)) return dateString
    return format(date, fmt)
  } catch { return dateString }
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}
