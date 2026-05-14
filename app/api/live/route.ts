import { NextResponse } from 'next/server'

// All curated channel IDs from /masses directory.
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

// In-memory cache. Survives between requests on a warm Vercel container.
let cache: {
  streams: Stream[]
  recorded: Recorded[]
  time: number
} = {
  streams: [],
  recorded: [],
  time: 0,
}

const CACHE_TTL = 15 * 60 * 1000        // 15 minutes
const LOOKBACK_HOURS = 24               // "Today's Recorded" window

// YouTube uploads playlists are always 'UU' + channelId.slice(2)
function uploadsPlaylistId(channelId: string): string {
  return 'UU' + channelId.slice(2)
}

// Returns { ok: true, items: [...] } on success (even if items is empty).
// Returns { ok: false, items: [] } on any error (HTTP 4xx/5xx, network, quota).
// This distinction is critical so we don't cache empty results from a failed call.
async function fetchChannelUploads(
  channelId: string,
  apiKey: string
): Promise<{ ok: boolean; items: any[] }> {
  try {
    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?part=snippet,contentDetails` +
      `&playlistId=${uploadsPlaylistId(channelId)}` +
      `&maxResults=5` +
      `&key=${apiKey}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return { ok: false, items: [] }
    const data = await res.json()
    if (data.error) return { ok: false, items: [] }
    return { ok: true, items: data.items || [] }
  } catch {
    return { ok: false, items: [] }
  }
}

// Fetches videos.list in batches of 50. Returns a map of videoId -> video object
// with snippet (incl. liveBroadcastContent) and liveStreamingDetails.
async function fetchVideoDetails(
  videoIds: string[],
  apiKey: string
): Promise<Record<string, any>> {
  const details: Record<string, any> = {}
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50)
    try {
      const url =
        `https://www.googleapis.com/youtube/v3/videos` +
        `?part=snippet,liveStreamingDetails` +
        `&id=${batch.join(',')}` +
        `&key=${apiKey}`
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) continue
      const data = await res.json()
      if (data.error) continue
      for (const item of data.items || []) {
        if (item.id) details[item.id] = item
      }
    } catch {
      /* swallow per-batch error; partial data still useful */
    }
  }
  return details
}

function buildResponse(streams: Stream[], recorded: Recorded[], debug: any, time: number) {
  return {
    streams,
    recorded,
    liveCount: streams.filter((s) => s.isLive).length,
    upcomingCount: streams.filter((s) => !s.isLive).length,
    recordedCount: recorded.length,
    checkedAt: new Date(time).toISOString(),
    debug,
  }
}

export async function GET() {
  const now = Date.now()
  const apiKey = process.env.YOUTUBE_API_KEY

  const debug: {
    hasKey: boolean
    fromCache: boolean
    channelsOk: number
    channelsFailed: number
    videosTotal: number
    classified: { live: number; upcoming: number; recorded: number; skipped: number }
    err: string
  } = {
    hasKey: !!apiKey,
    fromCache: false,
    channelsOk: 0,
    channelsFailed: 0,
    videosTotal: 0,
    classified: { live: 0, upcoming: 0, recorded: 0, skipped: 0 },
    err: 'none',
  }

  if (!apiKey) {
    debug.err = 'YOUTUBE_API_KEY env var not set'
    return NextResponse.json(buildResponse(cache.streams, cache.recorded, debug, now))
  }

  // Serve from cache if fresh
  if (cache.time > 0 && now - cache.time < CACHE_TTL) {
    debug.fromCache = true
    return NextResponse.json(buildResponse(cache.streams, cache.recorded, debug, cache.time))
  }

  // --- Step 1: Fetch recent uploads from every channel in parallel ---
  const results = await Promise.all(
    CHANNEL_IDS.map((id) =>
      fetchChannelUploads(id, apiKey).then((r) => ({ channelId: id, ...r }))
    )
  )

  const allItems: Array<{ playlistItem: any; channelId: string }> = []
  for (const r of results) {
    if (r.ok) {
      debug.channelsOk++
      for (const item of r.items) {
        allItems.push({ playlistItem: item, channelId: r.channelId })
      }
    } else {
      debug.channelsFailed++
    }
  }
  debug.videosTotal = allItems.length

  // If no channels succeeded, the API is genuinely failing (quota, key revoked, etc.)
  // Return whatever's in cache and DO NOT update cache.time so we'll retry on next request.
  if (debug.channelsOk === 0) {
    debug.fromCache = true
    debug.err = `all ${debug.channelsFailed} channel fetches failed (likely quota exhausted)`
    return NextResponse.json(buildResponse(cache.streams, cache.recorded, debug, cache.time || now))
  }

  // --- Step 2: Get live/upcoming/none status for every collected video ---
  const videoIds: string[] = []
  for (const item of allItems) {
    const vid = item.playlistItem.contentDetails?.videoId
    if (vid && !videoIds.includes(vid)) videoIds.push(vid)
  }
  const details = await fetchVideoDetails(videoIds, apiKey)

  // --- Step 3: Classify each video into live / upcoming / recorded ---
  const streams: Stream[] = []
  const recorded: Recorded[] = []
  const seen = new Set<string>()
  const since = new Date(now - LOOKBACK_HOURS * 60 * 60 * 1000)

  for (const entry of allItems) {
    const videoId = entry.playlistItem.contentDetails?.videoId
    if (!videoId || seen.has(videoId)) continue
    seen.add(videoId)

    const detail = details[videoId]
    if (!detail) {
      // videos.list call failed for this batch — fall back to treating as recorded
      // if recent, otherwise skip
      const publishedAt =
        entry.playlistItem.contentDetails?.videoPublishedAt ||
        entry.playlistItem.snippet?.publishedAt
      if (!publishedAt || new Date(publishedAt) < since) {
        debug.classified.skipped++
        continue
      }
      recorded.push({
        title: entry.playlistItem.snippet?.title || '',
        videoId,
        channelName:
          entry.playlistItem.snippet?.channelTitle ||
          CHANNEL_NAMES[entry.channelId] ||
          '',
        thumbnail:
          entry.playlistItem.snippet?.thumbnails?.high?.url ||
          entry.playlistItem.snippet?.thumbnails?.medium?.url ||
          `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`,
        publishedAt,
      })
      debug.classified.recorded++
      continue
    }

    const snippet = detail.snippet || {}
    const liveDetails = detail.liveStreamingDetails || {}
    const status = snippet.liveBroadcastContent // "live" | "upcoming" | "none"

    const title = snippet.title || entry.playlistItem.snippet?.title || ''
    const channelName =
      snippet.channelTitle ||
      entry.playlistItem.snippet?.channelTitle ||
      CHANNEL_NAMES[entry.channelId] ||
      ''
    const thumbnail =
      snippet.thumbnails?.high?.url ||
      snippet.thumbnails?.medium?.url ||
      `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`

    if (status === 'live') {
      streams.push({
        title,
        videoId,
        channelName,
        startTime: liveDetails.actualStartTime || null,
        isLive: true,
        thumbnail,
      })
      debug.classified.live++
    } else if (status === 'upcoming') {
      streams.push({
        title,
        videoId,
        channelName,
        startTime: liveDetails.scheduledStartTime || null,
        isLive: false,
        thumbnail,
      })
      debug.classified.upcoming++
    } else {
      // status === "none": either a regular upload or a finished live stream
      const publishedAt =
        entry.playlistItem.contentDetails?.videoPublishedAt ||
        entry.playlistItem.snippet?.publishedAt ||
        ''
      if (!publishedAt || new Date(publishedAt) < since) {
        debug.classified.skipped++
        continue
      }
      recorded.push({
        title,
        videoId,
        channelName,
        thumbnail,
        publishedAt,
      })
      debug.classified.recorded++
    }
  }

  // --- Step 4: Sort and commit to cache ---
  streams.sort((a, b) => {
    if (a.isLive !== b.isLive) return a.isLive ? -1 : 1
    if (!a.startTime) return 1
    if (!b.startTime) return -1
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  })
  recorded.sort(
    (a, b) =>
      new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )

  cache.streams = streams
  cache.recorded = recorded
  cache.time = now

  return NextResponse.json(buildResponse(streams, recorded, debug, now))
}
