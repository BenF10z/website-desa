import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  try {
    const { data, error } = await supabase
      .from("apbdes")
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
      nama_kegiatan,
      bidang,
      anggaran_kegiatan,
      tahun_anggaran,
      foto_dokumentasi,
      foto_path,
      deskripsi,
      lokasi,
      is_active
    } = body

    // Validate required fields
    if (!nama_kegiatan || !bidang || !anggaran_kegiatan) {
      return NextResponse.json(
        { error: "Nama kegiatan, bidang, dan anggaran kegiatan wajib diisi" }, 
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from("apbdes")
      .insert([
        {
          nama_kegiatan,
          bidang,
          anggaran_kegiatan: parseFloat(anggaran_kegiatan),
          tahun_anggaran: tahun_anggaran || new Date().getFullYear(),
          foto_dokumentasi,
          foto_path,
          deskripsi,
          lokasi,
          is_active: is_active !== undefined ? is_active : true,
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