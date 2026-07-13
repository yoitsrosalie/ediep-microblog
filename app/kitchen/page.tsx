'use client'
import { useState } from 'react'

export default function AdminPage() {
  const [postType, setPostType] = useState<'text' | 'image' |'embed' | 'quote'>('text')
  const [headline, setHeadline] = useState('')
  const [content, setContent] = useState('')
  const [imageUrl, setImageUrl] = useState('')
  const [embedUrl, setEmbedUrl] = useState('')
  const [embedLabel, setEmbedLabel] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Server-side insertion moved to app/api/create-post/route.ts
  // Removed server-only createClient/POST handler from this client component

  function resetForm() {
    if (isSubmitting) return
    setPostType('text')
    setHeadline('')
    setContent('')
    setImageUrl('')
    setEmbedUrl('')
    setEmbedLabel('')
  }
  
  async function handleSubmit() {
    if (!headline.trim()) {
      window.alert('Headline is required.');
      return;
    }

    setIsSubmitting(true)

    const newPost = {
      type: postType,
      headline,
      content: postType === 'text' ? content : null,
      image_url: postType === 'image' ? imageUrl : null,
      embed_url: postType === 'embed' ? embedUrl : null,
      embed_label: postType === 'embed' ? embedLabel : null,
    }

    try {
      const res = await fetch('/api/create-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newPost),
      })

      if (!res.ok) {
        const errText = await res.text()
        console.error('Error creating post:', errText)
        window.alert('Error creating post: ' + errText)
        return
      }

      window.alert('Post created successfully!')
      window.open('/', '_blank')
    } catch (err) {
      console.error('Unexpected error creating post:', err)
      window.alert('Unexpected error — see console for details.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="flex flex-col min-h-screen bg-slate-50 text-black py-8 px-8">
      <div className="mx-auto w-full max-w-6xl">
      <div className="grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)] items-start">
        <div className="lg:col-start-1 space-y-4">
        <h1 className="text-2xl font-semibold">Hi Eric!</h1>
        <p className="text-sm text-slate-600">Choose a post type then fill in the details.</p>
        </div>
        
        <div className="w-full h-full min-h-[520px] max-w-2xl lg:col-start-2 bg-slate-200 text-black p-6 rounded-lg space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-black font-semibold" htmlFor="postType">
              Select Post Type
            </label>
            <select id="postType" className="w-full rounded-md border border-slate-700 px-3 py-2" value={postType} onChange={(e) => setPostType(e.target.value as "text" | "image" | "embed" | "quote")}>
            <option value="text">Text</option>
            <option value="image">Image</option>
            <option value="embed">Embed</option>
            <option value="quote">Quote</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black font-semibold" htmlFor="headline">
              Headline
            </label>
            <input id="headline" className="w-full rounded-md border border-slate-700 px-3 py-2" value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline" />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-black font-semibold" htmlFor="content">
              Content
            </label>
          <textarea id="content" className=" w-full rounded-md border border-slate-700 px-3 py-2" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Content" />
          </div>

         <div className="space-y-2">
            {postType === 'image' && (
            <>
              <label className="text-sm font-medium text-black font-semibold" htmlFor="imageUrl">
              Image URL
              </label>

              <input id="imageUrl" className="w-full rounded-md border border-slate-700 px-3 py-2" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" />
            </>
            )}
          </div>

          <div className="space-y-2">
            {postType === 'embed' && (
              <>
              <label className="text-sm font-medium text-black font-semibold" htmlFor="embedUrl">
              Embed URL
              </label>
              <input id="embedUrl" className="w-full rounded-md border border-slate-700 px-3 py-2" value={embedUrl} onChange={(e) => setEmbedUrl(e.target.value)} placeholder="Embed URL" />
              
              <label className="text-sm font-medium text-black font-semibold" htmlFor="embedLabel">
              Embed Label
              </label>
              <input id="embedLabel" className="w-full rounded-md border border-slate-700 px-3 py-2" value={embedLabel} onChange={(e) => setEmbedLabel(e.target.value)} placeholder="Embed Label" />
              </>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button type="button" className="rounded-md border border-slate-700 px-4 py-2 text-black hover:bg-slate-300" onClick={resetForm} disabled={isSubmitting}>
              Clear
            </button>
            
            <button type="button" className="rounded-md bg-amber-400 px-4 py-2 font-semibold text-slate-950 hover:bg-amber-300" onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>

        </div>
      </div>
      </div>
    </main>
  )
}