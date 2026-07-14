'use client'
import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void
      }
    }
  }
}

interface EmbedRendererProps {
  html: string
}

export default function EmbedRenderer({ html }: EmbedRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const isInstagram = html.includes('instagram-media')

    if (!isInstagram) return

    function processEmbeds() {
      window.instgrm?.Embeds.process()
    }

    if (window.instgrm) {
      processEmbeds()
      return
    }

    const existingScript = document.querySelector(
      'script[src="//www.instagram.com/embed.js"]'
    )

    if (existingScript) {
      existingScript.addEventListener('load', processEmbeds)
      return () => existingScript.removeEventListener('load', processEmbeds)
    }

    const script = document.createElement('script')
    script.src = '//www.instagram.com/embed.js'
    script.async = true
    script.onload = processEmbeds
    document.body.appendChild(script)
  }, [html])

  return (
    <div
      ref={containerRef}
      className="embed-media"
      suppressHydrationWarning      
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}