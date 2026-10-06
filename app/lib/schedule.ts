// Shared schedule logic. Used by:
//   - app/api/live/route.ts        (the JSON endpoint the client polls)
//   - app/page.tsx                 (server-renders today's schedule into the HTML)
//   - app/masses/sspx/page.tsx     (server-renders the SSPX-only schedule)
//
// Keeping it in one place means Google sees the same data the visitor sees.

export interface Stream {
  title: string
  videoId: string
  channelId: string
  channelName: string
  startTime: string | null
  isLive: boolean
  thumbnail: string
}

export interface Recorded {
  title: string
  videoId: string
  channelId: string
  channelName: string
  thumbnail: string
  publishedAt: string
}

export interface ScheduleData {
  streams: Stream[]
  recorded: Recorded[]
  recordedWeek: Recorded[]
  liveCount: number
  upcomingCount: number
  recordedCount: number
  recordedWeekCount: number
  checkedAt: string
  debug: any
}

// ---------------------------------------------------------------------------
// Channel directory. Grouped by order so pages can filter.
// ---------------------------------------------------------------------------

export const ORDERS = {
  religious: {
    label: 'Religious Orders',
    ids: [
      'UC9haz_LghUfO8Mp0HilRM1Q', 'UCSOfVkj3M3O5djD9C0Jw9QQ', 'UCAnKL0epa83Br5tZfTZD7Eg',
      'UCpnItyslD0BqEOYBbTRy35w', 'UCC1VpC-qvCdYzexfY81fU1Q', 'UCY53AqHeZ3n3HgjttLdcBww',
      'UCVtxsZQ_o7S7kNCyFNtRHvQ',
    ],
  },
  fssp: {
    label: 'Fraternity of Saint Peter (FSSP)',
    ids: [
      'UC1nuBPRlL4Y-e6dsN_HQbOA', 'UCDiftFDDgXrRDSIeffAtY4A', 'UCp3fLkScbe6hjEBncVk-EoA',
      'UCowKIe4fG3k7UNUGX-6pvgg', 'UCItp3GIpTS67DvqOLuWuWig', 'UCKyyBg-7STnPDO_-oEQWY0g',
      'UCGphbd3fgXviaxp5DjscYkw', 'UCy7sVkgogsfm3tBpWyNHhEQ', 'UC-k7cYplIu_EGCi7iKsLwig',
      'UClAtfCutuTEauRbJIUCVlcA', 'UCYWH7ffSj122xg4FLC9bz_g',
    ],
  },
  icrss: {
    label: 'Institute of Christ the King (ICRSS)',
    ids: [
      'UCBb7H5dkIrNjCmwBSwUX9Zw', 'UCV59wZ51HxRpXVsF-zsXbGg', 'UCT-aKExUFTkWeTymsDXi_yA',
      'UCP3UYnnLs9gPCnlpaeLm41A', 'UCHhWuGhHEo7HCEKJ1MObM9g', 'UCKec9U7C22wXtoKENiYQcNQ',
    ],
  },
  sspx: {
    label: 'Society of Saint Pius X (SSPX)',
    ids: [
      'UCZoB5_BphShGRovMZ2AsG5A', 'UCTvY1fvpD7jnT-uKEyuTSaw', 'UCHJ-3FHV4SaAApHUkpu1WWw',
      'UC7b-QQ7PbrZs6yAUdJkSL7w', 'UC5AwyRmhCooK05cufOGAG1w', 'UC9YlPkoxPrcjbqH6fL-sJ7g',
      'UCwcR47Gy6U2StngG6FW9OEg', 'UC_W1sjtJTk7pE1j-EUbR5Tg', 'UCGNiUjfJu2KOf71MKz86z7A',
      'UCQKWgHLZxKCmIIRmok8tNuw', 'UCWHw6qGmRaxwErJqdtqvOJQ', 'UCMa2Tt8bO4WMtgGhHNT8SvQ',
    ],
  },
  diocesan: {
    label: 'Diocesan & Other Parishes',
    ids: [
      'UC-HuFJsZMy5CdwfXp9j-J0Q', 'UCblrlrqAau4Co8zdNG05q-A', 'UCAmIjqfkWf6pW-14htSl2WA',
      'UCZ6YQ4ZBs0fbeNPHl16YyFw', 'UCCd9cGbxpbLzjxqSsmiyznw', 'UCRRUmJAW2o_nh74VB3ijYxQ',
      'UCaR8PNiIP4WFIbca2h4tOAw', 'UCSLpi48jvqHTZjlwz7GI03w',
    ],
  },
} as const

export const CHANNEL_IDS: string[] = Object.values(ORDERS).flatMap((o) => [...o.ids])

export const CHANNEL_NAMES: Record<string, string> = {
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
  'UCHJ-3FHV4SaAApHUkpu1WWw': 'Our Lady of Sorrows Priory, Phoenix, AZ',
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

// ---------------------------------------------------------------------------
// Cache + fetch
// ---------------------------------------------------------------------------

const CACHE_TTL = 15 * 60 * 1000
const TODAY_HOURS = 24
const WEEK_HOURS = 7 * 24
const MAX_PER_CHANNEL = 15

let cache: { data: ScheduleData | null; time: number } = { data: null, time: 0 }

function uploadsPlaylistId(channelId: string) {
  return 'UU' + channelId.slice(2)
}

async function fetchChannelUploads(channelId: string, apiKey: string) {
  try {
    const url =
      `https://www.googleapis.com/youtube/v3/playlistItems` +
      `?part=snippet,contentDetails&playlistId=${uploadsPlaylistId(channelId)}` +
      `&maxResults=${MAX_PER_CHANNEL}&key=${apiKey}`
    const res = await fetch(url, { cache: 'no-store' })
    if (!res.ok) return { ok: false, items: [] as any[] }
    const data = await res.json()
    if (data.error) return { ok: false, items: [] as any[] }
    return { ok: true, items: (data.items || []) as any[] }
  } catch {
    return { ok: false, items: [] as any[] }
  }
}

async function fetchVideoDetails(videoIds: string[], apiKey: string) {
  const details: Record<string, any> = {}
  for (let i = 0; i < videoIds.length; i += 50) {
    const batch = videoIds.slice(i, i + 50)
    try {
      const url =
        `https://www.googleapis.com/youtube/v3/videos` +
        `?part=snippet,liveStreamingDetails&id=${batch.join(',')}&key=${apiKey}`
      const res = await fetch(url, { cache: 'no-store' })
      if (!res.ok) continue
      const data = await res.json()
      if (data.error) continue
      for (const item of data.items || []) if (item.id) details[item.id] = item
    } catch { /* partial data is fine */ }
  }
  return details
}

function empty(debug: any): ScheduleData {
  return {
    streams: [], recorded: [], recordedWeek: [],
    liveCount: 0, upcomingCount: 0, recordedCount: 0, recordedWeekCount: 0,
    checkedAt: new Date().toISOString(), debug,
  }
}

export async function getSchedule(): Promise<ScheduleData> {
  const now = Date.now()
  const apiKey = process.env.YOUTUBE_API_KEY

  if (!apiKey) return cache.data ?? empty({ hasKey: false, err: 'YOUTUBE_API_KEY not set' })
  if (cache.data && now - cache.time < CACHE_TTL) {
    return { ...cache.data, debug: { ...cache.data.debug, fromCache: true } }
  }

  const debug: any = {
    hasKey: true, fromCache: false, channelsOk: 0, channelsFailed: 0, videosTotal: 0,
    classified: { live: 0, upcoming: 0, today: 0, week: 0, skipped: 0 }, err: 'none',
  }

  const results = await Promise.all(
    CHANNEL_IDS.map((id) => fetchChannelUploads(id, apiKey).then((r) => ({ channelId: id, ...r })))
  )

  const allItems: Array<{ playlistItem: any; channelId: string }> = []
  for (const r of results) {
    if (r.ok) { debug.channelsOk++; for (const item of r.items) allItems.push({ playlistItem: item, channelId: r.channelId }) }
    else debug.channelsFailed++
  }
  debug.videosTotal = allItems.length

  if (debug.channelsOk === 0) {
    debug.err = `all ${debug.channelsFailed} channel fetches failed (likely quota exhausted)`
    return cache.data ? { ...cache.data, debug } : empty(debug)
  }

  const videoIds = Array.from(new Set(allItems.map((i) => i.playlistItem.contentDetails?.videoId).filter(Boolean)))
  const details = await fetchVideoDetails(videoIds, apiKey)

  const streams: Stream[] = []
  const recorded: Recorded[] = []
  const recordedWeek: Recorded[] = []
  const seen = new Set<string>()
  const todayCutoff = new Date(now - TODAY_HOURS * 3600 * 1000)
  const weekCutoff = new Date(now - WEEK_HOURS * 3600 * 1000)

  for (const entry of allItems) {
    const videoId = entry.playlistItem.contentDetails?.videoId
    if (!videoId || seen.has(videoId)) continue
    seen.add(videoId)

    const detail = details[videoId]
    const snippet = detail?.snippet || entry.playlistItem.snippet || {}
    const live = detail?.liveStreamingDetails || {}
    const status = snippet.liveBroadcastContent
    const channelId = entry.channelId
    const title = snippet.title || entry.playlistItem.snippet?.title || ''
    const channelName = CHANNEL_NAMES[channelId] || snippet.channelTitle || entry.playlistItem.snippet?.channelTitle || ''
    const thumbnail = snippet.thumbnails?.high?.url || snippet.thumbnails?.medium?.url || `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
    const publishedAt = entry.playlistItem.contentDetails?.videoPublishedAt || entry.playlistItem.snippet?.publishedAt || ''

    if (status === 'live') {
      streams.push({ title, videoId, channelId, channelName, startTime: live.actualStartTime || null, isLive: true, thumbnail })
      debug.classified.live++
    } else if (status === 'upcoming') {
      streams.push({ title, videoId, channelId, channelName, startTime: live.scheduledStartTime || null, isLive: false, thumbnail })
      debug.classified.upcoming++
    } else {
      if (!publishedAt) { debug.classified.skipped++; continue }
      const pub = new Date(publishedAt)
      if (pub >= todayCutoff) { recorded.push({ title, videoId, channelId, channelName, thumbnail, publishedAt }); debug.classified.today++ }
      else if (pub >= weekCutoff) { recordedWeek.push({ title, videoId, channelId, channelName, thumbnail, publishedAt }); debug.classified.week++ }
      else debug.classified.skipped++
    }
  }

  streams.sort((a, b) => {
    if (a.isLive !== b.isLive) return a.isLive ? -1 : 1
    if (!a.startTime) return 1
    if (!b.startTime) return -1
    return new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
  })
  const newestFirst = (a: Recorded, b: Recorded) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  recorded.sort(newestFirst)
  recordedWeek.sort(newestFirst)

  const data: ScheduleData = {
    streams, recorded, recordedWeek,
    liveCount: streams.filter((s) => s.isLive).length,
    upcomingCount: streams.filter((s) => !s.isLive).length,
    recordedCount: recorded.length,
    recordedWeekCount: recordedWeek.length,
    checkedAt: new Date(now).toISOString(),
    debug,
  }
  cache = { data, time: now }
  return data
}

// Narrow a schedule to one set of channels (used by the order pages).
export function filterSchedule(data: ScheduleData, channelIds: readonly string[]): ScheduleData {
  const keep = new Set(channelIds)
  const streams = data.streams.filter((s) => keep.has(s.channelId))
  const recorded = data.recorded.filter((r) => keep.has(r.channelId))
  const recordedWeek = data.recordedWeek.filter((r) => keep.has(r.channelId))
  return {
    ...data, streams, recorded, recordedWeek,
    liveCount: streams.filter((s) => s.isLive).length,
    upcomingCount: streams.filter((s) => !s.isLive).length,
    recordedCount: recorded.length,
    recordedWeekCount: recordedWeek.length,
  }
}
