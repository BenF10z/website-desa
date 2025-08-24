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
      .from("paket_wisata")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Paket wisata not found" }, { status: 404 })
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
      price,
      duration,
      location,
      image_url,
      image_path,
      additional_images,
      additional_image_paths,
      facilities,
      itinerary,
      min_participants,
      max_participants,
      contact_person,
      contact_number,
      is_active
    } = body

    const { data, error } = await supabase
      .from("paket_wisata")
      .update({
        name,
        description,
        price: parseFloat(price),
        duration,
        location,
        image_url,
        image_path,
        additional_images: additional_images || [],
        additional_image_paths: additional_image_paths || [],
        facilities: facilities || [],
        itinerary: itinerary || {},
        min_participants: parseInt(min_participants) || 1,
        max_participants: parseInt(max_participants) || 50,
        contact_person,
        contact_number,
        is_active: is_active !== false,
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

    // Get the item data to delete associated images
    const { data: itemData } = await supabase
      .from("paket_wisata")
      .select("image_path, additional_image_paths")
      .eq("id", id)
      .single()

    // Delete the item record
    const { error } = await supabase
      .from("paket_wisata")
      .delete()
      .eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Delete associated images from storage
    const imagesToDelete = []
    if (itemData?.image_path) {
      imagesToDelete.push(itemData.image_path)
    }
    if (itemData?.additional_image_paths && Array.isArray(itemData.additional_image_paths)) {
      imagesToDelete.push(...itemData.additional_image_paths)
    }

    if (imagesToDelete.length > 0) {
      try {
        await supabase.storage.from("images").remove(imagesToDelete);
      } catch (storageError) {
        console.error("Error deleting images from storage:", storageError);
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}