import { NextResponse } from 'next/server'

const CHANNELS = [
  { id: 'UCGNiUjfJu2KOf71MKz86z7A', name: 'SSPX Paris' },
  { id: 'UC_W1sjtJTk7pE1j-EUbR5Tg', name: 'SSPX Toronto' },
  { id: 'UC-HuFJsZMy5CdwfXp9j-J0Q', name: 'Cleveland' },
  { id: 'UCMa2Tt8bO4WMtgGhHNT8SvQ', name: 'SSPX Poland' },
  { id: 'UCZ6YQ4ZBs0fbeNPHl16YyFw', name: 'Oxford Oratory' },
  { id: 'UC1nuBPRlL4Y-e6dsN_HQbOA', name: 'FSSP Phoenix' },
  { id: 'UCBb7H5dkIrNjCmwBSwUX9Zw', name: 'ICRSS Chicago' },
  { id: 'UCDiftFDDgXrRDSIeffAtY4A', name: 'FSSP Kansas City' },
]

let cache: { data: any; timestamp: number } | null = null
const CACHE_TTL = 10 * 60 * 1000 // 10 minutes

export async function GET() {
  const now = Date.now()

  if (cache && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data)
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ live: [], error: 'No API key' })
  }

  try {
    const liveChannels: Array<{ channelId: string; videoId: string; title: string; thumbnail: string }> = []

    // Check channels in parallel
    const checks = CHANNELS.map(async (channel) => {
      try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channel.id}&eventType=live&type=video&maxResults=1&key=${apiKey}`
        const res = await fetch(url, { cache: 'no-store' })
        const data = await res.json()

        if (data.items && data.items.length > 0) {
          const item = data.items[0]
          liveChannels.push({
            channelId: channel.id,
            videoId: item.id.videoId,
            title: item.snippet.title,
            thumbnail: item.snippet.thumbnails?.medium?.url || '',
          })
        }
      } catch {
        // Skip failed channel
      }
    })

    await Promise.all(checks)

    const result = {
      live: liveChannels,
      checkedAt: new Date().toISOString(),
    }

    cache = { data: result, timestamp: now }

    return NextResponse.json(result)
  } catch {
    return NextResponse.json({ live: [], error: 'API error' })
  }
}
