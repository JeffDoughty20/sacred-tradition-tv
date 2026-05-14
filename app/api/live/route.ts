import { NextResponse } from 'next/server'

// All curated channel IDs from /masses directory.
// To add a new channel: just add its UC... ID here and a name below.
const CHANNEL_IDS = [
  // Religious Orders
  'UC9haz_LghUfO8Mp0HilRM1Q', 'UCSOfVkj3M3O5djD9C0Jw9QQ', 'UCAnKL0epa83Br5tZfTZD7Eg',
  'UCpnItyslD0BqEOYBbTRy35w', 'UCC1VpC-qvCdYzexfY81fU1Q', 'UCY53AqHeZ3n3HgjttLdcBww',
  'UCVtxsZQ_o7S7kNCyFNtRHvQ',
  // FSSP
  'UC1nuBPRlL4Y-e6dsN_HQbOA', 'UCDiftFDDgXrRDSIeffAtY4A', 'UCp3fLkScbe6hjEBncVk-EoA',
  'UCowKIe4fG3k7UNUGX-6pvgg', 'UCItp3GIpTS67DvqOLuWuWig', 'UCKyyBg-7STnPDO_-oEQWY0g',
  'UCGphbd3fgXviaxp5DjscYkw', 'UCy7sVkgogsfm3tBpWyNHhEQ', 'UC-k7cYplIu_EGCi7iKsLwig',
  'UClAtfCutuTEauRbJIUCVlcA', 'UCYWH7ffSj122xg4FLC9bz_g',
  // ICRSS
  'UCBb7H5dkIrNjCmwBSwUX9Zw', 'UCV59wZ51HxRpXVsF-zsXbGg', 'UCT-aKExUFTkWeTymsDXi_yA',
  'UCP3UYnnLs9gPCnlpaeLm41A', 'UCHhWuGhHEo7HCEKJ1MObM9g', 'UCKec9U7C22wXtoKENiYQcNQ',
  // SSPX
  'UCZoB5_BphShGRovMZ2AsG5A', 'UCTvY1fvpD7jnT-uKEyuTSaw', 'UC7b-QQ7PbrZs6yAUdJkSL7w',
  'UC5AwyRmhCooK05cufOGAG1w', 'UC9YlPkoxPrcjbqH6fL-sJ7g', 'UCwcR47Gy6U2StngG6FW9OEg',
  'UC_W1sjtJTk7pE1j-EUbR5Tg', 'UCGNiUjfJu2KOf71MKz86z7A', 'UCQKWgHLZxKCmIIRmok8tNuw',
  'UCWHw6qGmRaxwErJqdtqvOJQ', 'UCMa2Tt8bO4WMtgGhHNT8SvQ',
  // Diocesan & Other
  'UC-HuFJsZMy5CdwfXp9j-J0Q', 'UCblrlrqAau4Co8zdNG05q-A', 'UCAmIjqfkWf6pW-14htSl2WA',
  'UCZ6YQ4ZBs0fbeNPHl16YyFw', 'UCCd9cGbxpbLzjxqSsmiyznw', 'UCRRUmJAW2o_nh74VB3ijYxQ',
  'UCaR8PNiIP4WFIbca2h4tOAw', 'UCSLpi48jvqHTZjlwz7GI03w',
]

// Display name fallback if YouTube doesn't return a channelTitle
const CHANNEL_NAMES: Record<string, string> = {
  'UC9haz_LghUfO8Mp0HilRM1Q': 'Canons Regular of New Jerusalem',
  'UCSOfVkj3M3O5djD9C0Jw9QQ': 'Society of Saint Augustine',
  'UCAnKL0epa83Br5tZfTZD7Eg': 'Fraternity of Saint Vincent Ferrer',
  'UCpnItyslD0BqEOYBbTRy35w': 'Silverstream Priory, Ireland',
  'UCC1VpC-qvCdYzexfY81fU1Q': 'Transalpine Redemptorists',
  'UCY53AqHeZ3n3HgjttLdcBww': 'Abbaye de Lagrasse, France',
  'UCVtxsZQ_o7S7kNCyFNtRHvQ': 'Kloster Maria Engelport',
  'UC1nuBPRlL4Y-e6dsN_HQbOA': 'FSSP Phoenix, AZ',
  'UCDiftFDDgXrRDSIeffAtY4A': 'FSSP Kansas City',
  'UCp3fLkScbe6hjEBncVk-EoA': 'FSSP Sacramento, CA',
  'UCowKIe4fG3k7UNUGX-6pvgg': 'FSSP Denver, CO',
  'UCItp3GIpTS67DvqOLuWuWig': 'FSSP Baltimore, MD',
  'UCKyyBg-7STnPDO_-oEQWY0g': 'FSSP Providence, RI',
  'UCGphbd3fgXviaxp5DjscYkw': 'FSSP Tacoma, WA',
  'UCy7sVkgogsfm3tBpWyNHhEQ': 'FSSP Hampton Roads, VA',
  'UC-k7cYplIu_EGCi7iKsLwig': 'FSSP Ottawa, Canada',
  'UClAtfCutuTEauRbJIUCVlcA': 'FSSP Rome',
  'UCYWH7ffSj122xg4FLC9bz_g': 'FSSP Krakow, Poland',
  'UCBb7H5dkIrNjCmwBSwUX9Zw': 'ICRSS Chicago, IL',
  'UCV59wZ51HxRpXVsF-zsXbGg': 'ICRSS St. Louis, MO',
  'UCT-aKExUFTkWeTymsDXi_yA': 'ICRSS Detroit, MI',
  'UCP3UYnnLs9gPCnlpaeLm41A': 'ICRSS San Jose, CA',
  'UCHhWuGhHEo7HCEKJ1MObM9g': 'ICRSS Limerick, Ireland',
  'UCKec9U7C22wXtoKENiYQcNQ': 'ICRSS Shrewsbury, Great Britain',
  'UCZoB5_BphShGRovMZ2AsG5A': 'SSPX Seminary USA',
  'UCTvY1fvpD7jnT-uKEyuTSaw': 'SSPX Phoenix, AZ',
  'UC7b-QQ7PbrZs6yAUdJkSL7w': "SSPX Saint Mary's, KS",
  'UC5AwyRmhCooK05cufOGAG1w': 'SSPX Sanford, FL',
  'UC9YlPkoxPrcjbqH6fL-sJ7g': 'SSPX Los Angeles, CA',
  'UCwcR47Gy6U2StngG6FW9OEg': 'SSPX Denver, CO',
  'UC_W1sjtJTk7pE1j-EUbR5Tg': 'SSPX Toronto, Canada',
  'UCGNiUjfJu2KOf71MKz86z7A': 'SSPX Paris, France',
  'UCQKWgHLZxKCmIIRmok8tNuw': 'SSPX Great Britain',
  'UCWHw6qGmRaxwErJqdtqvOJQ': 'SSPX Ireland',
  'UCMa2Tt8bO4WMtgGhHNT8SvQ': 'SSPX Poland',
  'UC-HuFJsZMy5CdwfXp9j-J0Q': 'Shrine of St. Elizabeth of Hungary, Cleveland, OH',
  'UCblrlrqAau4Co8zdNG05q-A': 'Una Voce Quad Cities, Davenport, IA',
  'UCAmIjqfkWf6pW-14htSl2WA': 'Schola Cantorum Miamiensis',
  'UCZ6YQ4ZBs0fbeNPHl16YyFw': 'Oxford Oratory',
  'UCCd9cGbxpbLzjxqSsmiyznw': 'The Oratory, Birmingham, UK',
  'UCRRUmJAW2o_nh74VB3ijYxQ': 'Toronto Oratory',
  'UCaR8PNiIP4WFIbca2h4tOAw': "St. Anne's, Perth, Australia",
  'UCSLpi48jvqHTZjlwz7GI03w': 'Saints Peter and Paul, Wilmington, CA',
}

interface Stream {
  title: string
  videoId: string
  channelName: string
  startTime: string | null
  isLive: boolean
  thumbnail: string
}

interface Recorded {
  title: string
  videoId: string
  channelName: string
  thumbnail: string
  publishedAt: string
}

// Two-tier in-memory cache. Survives between requests on a warm Vercel container.
// Streams refresh every 5 minutes; recorded uploads every 60 minutes.
let cache: {
  streams: Stream[]
  recorded: Recorded[]
  streamsTime: number
  recordedTime: number
} = {
  streams: [],
  recorded: [],
  streamsTime: 0,
  recordedTime: 0,
}

const STREAM_TTL = 5 * 60 * 1000        // 5 minutes
const RECORDED_TTL = 60 * 60 * 1000     // 60 minutes
const LOOKBACK_HOURS = 24               // "Today's Recorded" window

// YouTube uploads playlists are always 'UU' + channelId.slice(2)
// (e.g. UC9haz... -> UU9haz...). Cheap trick that avoids a channels.list call.
function uploadsPlaylistId(channelId: string): string {
  return 'UU' + channelId.slice(2)
}

// Free: scrape latinmass.live for currently-live and upcoming streams.
async function scrapeLatinMassLive(): Promise<Stream[]> {
  const streams: Stream[] = []
  try {
    const res = await fetch('https://www.latinmass.live/', {
      cache: 'no-store',
      headers: { 'User-Agent': 'SacredTraditionTV/1.0' },
    })
    if (!res.ok) return streams
    const html = await res.text()

    const liveRegex = /LIVE:<\/span>\s*<a[^>]+href="https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^"&]+)"[^>]*>([^<]+)<\/a>/gi
    const upcomingRegex = /<a[^>]+href="https?:\/\/(?:www\.)?youtube\.com\/watch\?v=([^"&]+)"[^>]*>([^<]+)<\/a><br\s*\/?>\s*Starts at:\s*<span class="UTC">([^<]+)<\/span>/gi

    let match
    while ((match = liveRegex.exec(html)) !== null) {
      const videoId = match[1]
      const titleFull = match[2]
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
    /* silent — caller will fall back to cached data */
  }
  return streams
}

// 1 quota unit per call. Pulls the 5 most recent uploads from one channel.
async function fetchChannelUploads(
  channelId: string,
  apiKey: string,
  since: Date
): Promise<Recorded[]> {
  try {
    const playlistId = uploadsPlaylistId(channelId)
    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?part=snippet,contentDetails` +
      `&playlistId=${playlistId}` +
      `&maxResults=5` +
      `&key=${apiKey}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return []
    const data = await res.json()
    if (data.error) return []

    const out: Recorded[] = []
    for (const item of data.items || []) {
      const publishedAt =
        item.contentDetails?.videoPublishedAt || item.snippet?.publishedAt
      if (!publishedAt) continue
      if (new Date(publishedAt) < since) continue

      const videoId =
        item.contentDetails?.videoId ||
        item.snippet?.resourceId?.videoId
      if (!videoId) continue

      out.push({
        title: item.snippet?.title || '',
        videoId,
        channelName:
          item.snippet?.channelTitle ||
          CHANNEL_NAMES[channelId] ||
          '',
        thumbnail:
          item.snippet?.thumbnails?.high?.url ||
          item.snippet?.thumbnails?.medium?.url ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt,
      })
    }
    return out
  } catch {
    return []
  }
}

export async function GET() {
  const now = Date.now()
  const apiKey = process.env.YOUTUBE_API_KEY

  const debug: {
    hasKey: boolean
    streamsFromCache: boolean
    recordedFromCache: boolean
    channelsQueried: number
    channelsFailed: number
    err: string
  } = {
    hasKey: !!apiKey,
    streamsFromCache: false,
    recordedFromCache: false,
    channelsQueried: 0,
    channelsFailed: 0,
    err: 'none',
  }

  // --- Refresh live/upcoming streams (free) ---
  if (now - cache.streamsTime > STREAM_TTL) {
    const fresh = await scrapeLatinMassLive()
    // Only overwrite cache if we actually got data, OR if we've never cached anything
    if (fresh.length > 0 || cache.streamsTime === 0) {
      cache.streams = fresh
      cache.streamsTime = now
    } else {
      debug.streamsFromCache = true
    }
  } else {
    debug.streamsFromCache = true
  }

  // --- Refresh recorded uploads (1 unit per channel) ---
  if (apiKey && now - cache.recordedTime > RECORDED_TTL) {
    const since = new Date(now - LOOKBACK_HOURS * 60 * 60 * 1000)
    const results = await Promise.allSettled(
      CHANNEL_IDS.map((id) => fetchChannelUploads(id, apiKey, since))
    )

    const fresh: Recorded[] = []
    const seen = new Set<string>()
    let succeeded = 0
    let failed = 0

    for (const r of results) {
      if (r.status === 'fulfilled') {
        succeeded++
        for (const item of r.value) {
          if (!item.videoId || seen.has(item.videoId)) continue
          // Don't duplicate something that's currently live or upcoming
          if (cache.streams.some((s) => s.videoId === item.videoId)) continue
          seen.add(item.videoId)
          fresh.push(item)
        }
      } else {
        failed++
      }
    }

    // Newest first
    fresh.sort(
      (a, b) =>
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
    )

    debug.channelsQueried = succeeded
    debug.channelsFailed = failed

    // Only overwrite cache if we actually got something, OR first ever fetch
    if (fresh.length > 0 || cache.recordedTime === 0) {
      cache.recorded = fresh
      cache.recordedTime = now
    } else {
      debug.recordedFromCache = true
    }
  } else {
    debug.recordedFromCache = true
  }

  const result = {
    streams: cache.streams,
    recorded: cache.recorded,
    liveCount: cache.streams.filter((s) => s.isLive).length,
    upcomingCount: cache.streams.filter((s) => !s.isLive).length,
    recordedCount: cache.recorded.length,
    checkedAt: new Date().toISOString(),
    debug,
  }

  return NextResponse.json(result)
}
