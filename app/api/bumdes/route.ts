import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("bumdes")
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
      category,
      contact_person,
      contact_number,
      location,
      image_url,
      image_path,
      is_active,
      established_year
    } = body

    // Validate required fields
    if (!name || !description) {
      return NextResponse.json(
        { error: "Name and description are required" }, 
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("bumdes")
      .insert([
        {
          name,
          description,
          category: category || 'Perdagangan',
          contact_person,
          contact_number,
          location,
          image_url,
          image_path,
          is_active: is_active !== undefined ? is_active : true,
          established_year: established_year || new Date().getFullYear(),
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