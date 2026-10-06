import { NextResponse } from 'next/server'
import { getSchedule } from '../../lib/schedule'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await getSchedule()
  return NextResponse.json(data)
}
