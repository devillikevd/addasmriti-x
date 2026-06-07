import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  // Proxy to memory service
  try {
    const backendUrl = process.env.NEXT_PUBLIC_MEMORY_SERVICE_URL || 'http://localhost:8001'
    const params = new URLSearchParams(searchParams)
    const res = await fetch(`${backendUrl}/api/v1/memories/?${params}`, {
      headers: { 'Content-Type': 'application/json' },
      next: { revalidate: 30 },
    })
    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const backendUrl = process.env.NEXT_PUBLIC_MEMORY_SERVICE_URL || 'http://localhost:8001'
    const res = await fetch(`${backendUrl}/api/v1/memories/`, {
      method: 'POST',
      body: formData,
    })
    const data = await res.json()
    return NextResponse.json(data, { status: res.status })
  } catch (err) {
    return NextResponse.json({ error: 'Service unavailable' }, { status: 503 })
  }
}
