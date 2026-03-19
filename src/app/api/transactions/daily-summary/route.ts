import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const API_BASE_URL = process.env.BACKEND_URL ?? process.env.NEXT_PUBLIC_API_BASE_URL

export async function GET(req: NextRequest) {
  if (!API_BASE_URL) {
    return NextResponse.json({ error: 'API base URL not configured' }, { status: 500 })
  }

  const cookieStore = await cookies()
  const token = cookieStore.get('aturdana-token')?.value
  if (!token) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { searchParams } = req.nextUrl
  const startDate = searchParams.get('start_date')
  const endDate = searchParams.get('end_date')
  if (!startDate || !endDate) {
    return NextResponse.json({ error: 'start_date and end_date are required' }, { status: 400 })
  }

  const backendUrl = new URL(`${API_BASE_URL}/api/transactions`)
  backendUrl.searchParams.set('start_date', startDate)
  backendUrl.searchParams.set('end_date', endDate)
  backendUrl.searchParams.set('limit', '100')
  backendUrl.searchParams.set('sort_by', 'date')
  backendUrl.searchParams.set('sort_order', 'asc')

  console.log('[daily-summary] fetching:', backendUrl.toString())
  const res = await fetch(backendUrl.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (res.status === 404) {
    return NextResponse.json({ data: [] })
  }
  if (!res.ok) {
    const body = await res.text().catch(() => '')
    console.error(`[daily-summary] backend ${res.status}:`, body)
    return NextResponse.json({ error: 'Backend error', status: res.status, detail: body }, { status: res.status })
  }

  const json = await res.json()
  const transactions: Array<{ type: string; amount: number; date: string }> = json.data ?? []

  // Build all day slots from start_date to end_date (inclusive, UTC)
  const slots: Record<string, { income: number; expense: number }> = {}
  const cursor = new Date(startDate.substring(0, 10) + 'T00:00:00Z')
  const last = new Date(endDate.substring(0, 10) + 'T00:00:00Z')
  while (cursor <= last) {
    const key = cursor.toISOString().substring(0, 10)
    slots[key] = { income: 0, expense: 0 }
    cursor.setUTCDate(cursor.getUTCDate() + 1)
  }

  for (const tx of transactions) {
    const day = tx.date.substring(0, 10)
    if (!slots[day]) continue
    if (tx.type === 'income') {
      slots[day].income += tx.amount
    } else {
      slots[day].expense += tx.amount
    }
  }

  const data = Object.entries(slots).map(([date, totals]) => ({
    date,
    income: totals.income,
    expense: totals.expense,
  }))

  return NextResponse.json({ data })
}
