import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { data, error } = await supabase
      .from("berita")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Berita not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
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
      status 
    } = body

    const { data, error } = await supabase
      .from("berita")
      .update({
        title,
        content,
        excerpt,
        slug,
        featured_image,
        additional_images: additional_images || [],
        image_paths: image_paths || [],
        author,
        category,
        is_featured,
        status,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)
      .select()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json(data[0])
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)

    // Get the berita data to delete associated images
    const { data: beritaData } = await supabase
      .from("berita")
      .select("image_paths, featured_image")
      .eq("id", id)
      .single()

    // Delete the berita record
    const { error } = await supabase
      .from("berita")
      .delete()
      .eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Delete associated images from storage
    if (beritaData?.image_paths && beritaData.image_paths.length > 0) {
      try {
        await supabase.storage.from("images").remove(beritaData.image_paths)
      } catch (storageError) {
        console.error("Error deleting images from storage:", storageError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}