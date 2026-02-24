import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export interface TextPart {
  text: string
  highlighted: boolean
}

export function highlightKeywords(text: string, keywords?: string[]): TextPart[] {
  if (!keywords || keywords.length === 0) return [{ text, highlighted: false }]
  
  const sortedKeywords = [...keywords].sort((a, b) => b.length - a.length)
  const pattern = new RegExp(`(${sortedKeywords.map(k => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi')
  
  const parts = text.split(pattern)
  
  return parts.map((part) => {
    const isKeyword = sortedKeywords.some(k => k.toLowerCase() === part.toLowerCase())
    return { text: part, highlighted: isKeyword }
  })
}
