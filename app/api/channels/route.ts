import { NextResponse } from 'next/server'

let cache: { data: any; timestamp: number } | null = null
const CACHE_TTL = 24 * 60 * 60 * 1000 // 24 hours

export async function GET() {
  if (cache && Date.now() - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data)
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json({})
  }

  const channelIds = [
    'UCGNiUjfJu2KOf71MKz86z7A', // SSPX Paris
    'UC_W1sjtJTk7pE1j-EUbR5Tg', // SSPX Toronto
    'UC-HuFJsZMy5CdwfXp9j-J0Q', // Cleveland
    'UCZoB5_BphShGRovMZ2AsG5A', // SSPX Seminary USA
    'UCMa2Tt8bO4WMtgGhHNT8SvQ', // SSPX Poland
    'UCZ6YQ4ZBs0fbeNPHl16YyFw', // Oxford Oratory
    'UC1nuBPRlL4Y-e6dsN_HQbOA', // FSSP Phoenix
    'UCBb7H5dkIrNjCmwBSwUX9Zw', // ICRSS Chicago
    'UCxIsefyl9g9A5SGWA4FvGIA', // Vatican News
    'UCKMuFzwGVQ7PaGMwMvW0Fiw', // Vatican Media
    'UCpnItyslD0BqEOYBbTRy35w', // Silverstream Priory
  ].join(',')

  try {
    const url = `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelIds}&key=${apiKey}`
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()

    const thumbnails: Record<string, string> = {}
    if (data.items) {
      for (const item of data.items) {
        thumbnails[item.id] = item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || ''
      }
    }

    cache = { data: thumbnails, timestamp: Date.now() }
    return NextResponse.json(thumbnails)
  } catch {
    return NextResponse.json({})
  }
}
