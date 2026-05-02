import { NextResponse } from 'next/server'

let cache: { data: any; timestamp: number } | null = null
const CACHE_TTL = 5 * 60 * 1000 // 5 minutes

export async function GET() {
  const now = Date.now()
  if (cache && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data)
  }

  const streams: Array<{
    title: string
    videoId: string
    channelName: string
    startTime: string | null
    isLive: boolean
    thumbnail: string
  }> = []

  // Method 1: Scrape latinmass.live for real live/upcoming data
  try {
    const res = await fetch('https://www.latinmass.live/', {
      cache: 'no-store',
      headers: { 'User-Agent': 'SacredTraditionTV/1.0' },
    })
    const html = await res.text()

    // Parse the <ul> section with live/upcoming streams
    // Format: <li><a href="https://www.youtube.com/watch?v=VIDEO_ID">Title (Channel)</a><br />Starts at: <span class="UTC">2026-05-02T04:50:00Z</span></li>
    // Or LIVE: <li><span style="color:red;font-weight:bold;">LIVE:</span> <a href="...">Title (Channel)</a></li>

    const liveRegex = /LIVE:<\/span>\s*<a[^>]+href="https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^"&]+)"[^>]*>([^<]+)<\/a>/gi
    const upcomingRegex = /<a[^>]+href="https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^"&]+)"[^>]*>([^<]+)<\/a><br\s*\/?>\s*Starts at:\s*<span class="UTC">([^<]+)<\/span>/gi

    let match
    while ((match = liveRegex.exec(html)) !== null) {
      const videoId = match[1]
      const titleFull = match[2]
      // Parse "Title (Channel Name)" format
      const parenMatch = titleFull.match(/^(.+)\(([^)]+)\)\s*$/)
      streams.push({
        title: parenMatch ? parenMatch[1].trim() : titleFull,
        videoId,
        channelName: parenMatch ? parenMatch[2].trim() : '',
        startTime: null,
        isLive: true,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      })
    }

    while ((match = upcomingRegex.exec(html)) !== null) {
      const videoId = match[1]
      const titleFull = match[2]
      const utcTime = match[3]
      const parenMatch = titleFull.match(/^(.+)\(([^)]+)\)\s*$/)
      streams.push({
        title: parenMatch ? parenMatch[1].trim() : titleFull,
        videoId,
        channelName: parenMatch ? parenMatch[2].trim() : '',
        startTime: utcTime,
        isLive: false,
        thumbnail: `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
      })
    }
  } catch {
    // If latinmass.live is down, fall back to YouTube API
  }

  // Method 2: If no results from scraping, use YouTube API as backup
  if (streams.length === 0) {
    const apiKey = process.env.YOUTUBE_API_KEY
    if (apiKey) {
      try {
        const searches = await Promise.all([
          fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&q=traditional+latin+mass&maxResults=25&key=${apiKey}`, { cache: 'no-store' }),
          fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=upcoming&type=video&q=traditional+latin+mass&maxResults=25&key=${apiKey}`, { cache: 'no-store' }),
        ])

        for (let i = 0; i < searches.length; i++) {
          const data = await searches[i].json()
          if (data.items) {
            for (const item of data.items) {
              streams.push({
                title: item.snippet?.title || '',
                videoId: item.id?.videoId || '',
                channelName: item.snippet?.channelTitle || '',
                startTime: item.snippet?.publishedAt || null,
                isLive: i === 0,
                thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || '',
              })
            }
          }
        }
      } catch { /* silent */ }
    }
  }

  // Deduplicate by videoId
  const seen = new Set<string>()
  const unique = streams.filter(s => {
    if (seen.has(s.videoId)) return false
    seen.add(s.videoId)
    return true
  })

  // Method 3: Search YouTube API for today's recorded Latin Masses
  const recorded: Array<{
    title: string
    videoId: string
    channelName: string
    thumbnail: string
    publishedAt: string
  }> = []

  let rawRecordedCount = 0

  const apiKey = process.env.YOUTUBE_API_KEY
  if (apiKey) {
    try {
      // Look back 24 hours for recorded masses
      const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000)
      const publishedAfter = yesterday.toISOString()

      const res = await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=latin+mass&maxResults=25&order=date&publishedAfter=${encodeURIComponent(publishedAfter)}&key=${apiKey}`,
        { cache: 'no-store' }
      )
      const data = await res.json()
      rawRecordedCount = data.items?.length || 0
      if (data.items) {
        const latinKeywords = ['latin mass', 'tridentine', 'missa', 'tlm', 'fssp', 'sspx', 'icrss', 'traditional mass', 'low mass', 'high mass', 'sung mass', 'solemn mass', 'messe', 'heilige messe', 'traditional catholic']
        for (const item of data.items) {
          const vid = item.id?.videoId
          if (!vid || seen.has(vid)) continue
          const title = (item.snippet?.title || '').toLowerCase()
          const channel = (item.snippet?.channelTitle || '').toLowerCase()
          const combined = title + ' ' + channel
          const isLatin = latinKeywords.some(kw => combined.includes(kw))
          if (!isLatin) continue
          seen.add(vid)
          recorded.push({
            title: item.snippet?.title || '',
            videoId: vid,
            channelName: item.snippet?.channelTitle || '',
            thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || '',
            publishedAt: item.snippet?.publishedAt || '',
          })
        }
      }
    } catch { /* silent */ }
  }

  const result = {
    streams: unique,
    recorded,
    liveCount: unique.filter(s => s.isLive).length,
    upcomingCount: unique.filter(s => !s.isLive).length,
    recordedCount: recorded.length,
    checkedAt: new Date().toISOString(),
    debug: { apiKeyPresent: !!apiKey, searchWindow: 'last 24h', rawFromYouTube: rawRecordedCount, afterFilter: recorded.length },
  }

  cache = { data: result, timestamp: now }
  return NextResponse.json(result)
}
