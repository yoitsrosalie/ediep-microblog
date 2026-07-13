import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { revalidatePath } from 'next/cache'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL as string,
  process.env.SUPABASE_SERVICE_ROLE_KEY as string
)

export async function POST(req: Request) {
  try {
    const body = await req.json()

    if (!body.headline || typeof body.headline !== 'string') {
      return NextResponse.json({ error: 'Headline is required' }, { status: 400 })
    }

    const insertRow = {
      type: body.type ?? 'text',
      headline: body.headline,
      content: body.content ?? null,
      image_url: body.image_url ?? null,
      embed_url: body.embed_url ?? null,
      embed_label: body.embed_label ?? null,
    }

    const { data, error } = await supabaseAdmin.from('posts').insert([insertRow])

    if (error) return NextResponse.json({ error }, { status: 500 })

    revalidatePath('/')

    return NextResponse.json({ data }, { status: 201 })
  } catch (err) {
    console.error('API create-post error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
