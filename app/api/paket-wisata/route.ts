import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("paket_wisata")
      .select("*")
      .order("created_at", { ascending: false })

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

    // Validate required fields
    if (!name || !price) {
      return NextResponse.json(
        { error: "Nama paket dan harga wajib diisi" }, 
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("paket_wisata")
      .insert([
        {
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