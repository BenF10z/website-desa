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
      .from("apbdes")
      .select("*")
      .eq("id", params.id)
      .single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    if (!data) {
      return NextResponse.json({ error: "Kegiatan APBDes tidak ditemukan" }, { status: 404 })
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

    const { data, error } = await supabase
      .from("apbdes")
      .update({
        nama_kegiatan,
        bidang,
        anggaran_kegiatan: parseFloat(anggaran_kegiatan),
        tahun_anggaran,
        foto_dokumentasi,
        foto_path,
        deskripsi,
        lokasi,
        is_active,
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
      .from("apbdes")
      .select("foto_path")
      .eq("id", id)
      .single()

    // Delete the record
    const { error } = await supabase
      .from("apbdes")
      .delete()
      .eq("id", id)

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    // Delete associated image from storage
    if (itemData?.foto_path) {
      try {
        await supabase.storage.from("images").remove([itemData.foto_path])
      } catch (storageError) {
        console.error("Error deleting image from storage:", storageError)
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}