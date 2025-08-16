import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const featured = searchParams.get("featured")
    const category = searchParams.get("category")
    
    let query = supabase
      .from("berita")
      .select("*")
      .eq("status", "published")
      .order("published_at", { ascending: false })

    if (featured === "true") {
      query = query.eq("is_featured", true)
    }

    if (category) {
      query = query.eq("category", category)
    }

    if (limit) {
      query = query.limit(parseInt(limit))
    }

    const { data, error } = await query

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data || [])
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      title, 
      content, 
      excerpt, 
      slug, 
      featured_image, 
      additional_images,
      image_paths,
      author, 
      category, 
      is_featured,
      status = 'published'
    } = body

    // Validate required fields
    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" }, 
        { status: 400 }
      )
    }

    // Generate slug if not provided
    const finalSlug = slug || title.toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .trim()

    const { data, error } = await supabase
      .from("berita")
      .insert([
        {
          title,
          content,
          excerpt,
          slug: finalSlug,
          featured_image,
          additional_images: additional_images || [],
          image_paths: image_paths || [],
          author: author || 'Admin Desa',
          category: category || 'Berita Umum',
          is_featured: is_featured || false,
          status,
          published_at: new Date().toISOString(),
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0], { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}