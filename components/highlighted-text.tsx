"use client"

import { highlightKeywords, TextPart } from "@/lib/utils"

interface HighlightedTextProps {
  text: string
  keywords?: string[]
}

export function HighlightedText({ text, keywords }: HighlightedTextProps) {
  const parts: TextPart[] = highlightKeywords(text, keywords)
  
  return (
    <>
      {parts.map((part, idx) => (
        <span
          key={idx}
          className={part.highlighted ? "text-purple-400 font-medium" : ""}
        >
          {part.text}
        </span>
      ))}
    </>
  )
}
