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
      .from("bumdes")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "BUMDes unit not found" }, { status: 404 })
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
      name,
      description,
      category,
      contact_person,
      contact_number,
      location,
      image_url,
      image_path,
      additional_images,
      additional_image_paths,
      is_active,
      established_year
    } = body

    const { data, error } = await supabase
      .from("bumdes")
      .update({
        name,
        description,
        category,
        contact_person,
        contact_number,
        location,
        image_url,
        image_path,
        additional_images: additional_images || [], // Update as array
        additional_image_paths: additional_image_paths || [], // Update as array
        is_active,
        established_year,
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

    // Get the unit data to delete associated images
    const { data: unitData } = await supabase
      .from("bumdes")
      .select("image_path, additional_image_paths")
      .eq("id", id)
      .single()

    // Delete the unit record
    const { error } = await supabase
      .from("bumdes")
      .delete()
      .eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Delete associated image from storage
    const imagesToDelete: string[] = []
    
    if (unitData?.image_path) {
      imagesToDelete.push(unitData.image_path)
    }
    
    if (unitData?.additional_image_paths && Array.isArray(unitData.additional_image_paths)) {
      imagesToDelete.push(...unitData.additional_image_paths)
    }

    if (imagesToDelete.length > 0) {
      try {
        await supabase.storage.from("images").remove(imagesToDelete)
      } catch (storageError) {
        console.error("Error deleting images from storage:", storageError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}