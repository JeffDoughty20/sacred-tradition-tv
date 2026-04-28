import { NextResponse } from 'next/server'

// All YouTube channel IDs from latinmass.live
const KNOWN_CHANNELS: Record<string, string> = {
  // Religious Orders
  'UC9haz_LghUfO8Mp0HilRM1Q': 'Canons Regular of New Jerusalem',
  'UCSOfVkj3M3O5djD9C0Jw9QQ': 'Society of Saint Augustine',
  'UCAnKL0epa83Br5tZfTZD7Eg': 'Fraternity of Saint Vincent Ferrer',
  'UCpnItyslD0BqEOYBbTRy35w': 'Silverstream Priory, Ireland',
  'UCC1VpC-qvCdYzexfY81fU1Q': 'Transalpine Redemptorists',
  'UCY53AqHeZ3n3HgjttLdcBww': 'Abbaye de Lagrasse, France',
  'UCVtxsZQ_o7S7kNCyFNtRHvQ': 'Kloster Maria Engelport',
  // SSPX
  'UCZoB5_BphShGRovMZ2AsG5A': 'SSPX Seminary USA',
  'UCTvY1fvpD7jnT-uKEyuTSaw': 'SSPX Phoenix, AZ',
  'UC7b-QQ7PbrZs6yAUdJkSL7w': "SSPX Saint Mary's, KS",
  'UC5AwyRmhCooK05cufOGAG1w': 'SSPX Sanford, FL',
  'UC9YlPkoxPrcjbqH6fL-sJ7g': 'SSPX Los Angeles, CA',
  'UCwcR47Gy6U2StngG6FW9OEg': 'SSPX Denver, CO',
  'UC_W1sjtJTk7pE1j-EUbR5Tg': 'SSPX Toronto, Canada',
  'UCHbqfz4IUafMFffk23IrnZQ': 'SSPX Saint Cesaire, Canada',
  'UCGNiUjfJu2KOf71MKz86z7A': 'SSPX Paris, France',
  'UCQKWgHLZxKCmIIRmok8tNuw': 'SSPX Great Britain',
  'UCYTLXswwX616jHMRmpNvj5Q': 'SSPX Scotland',
  'UCWHw6qGmRaxwErJqdtqvOJQ': 'SSPX Ireland',
  'UCOSyx9ZAMY0c3mE4aGDPA-Q': 'SSPX Belgium',
  'UC6qx2PRO71pPHKgrSIfNVOw': 'SSPX Switzerland',
  'UC_6V6HLm1-v5izmgVWmPkoQ': 'SSPX Portugal',
  'UC-2rfS6vNWzKMYrfb4t2d5Q': 'SSPX Italy',
  'UCE1Pm0P4Nkabxjl_RAIt9rg': 'SSPX Czech Republic',
  'UCD7pfztQBZNRc5EI4HsYE0g': 'SSPX Germany',
  'UCSSfmrco3Q0828hxCYCED8A': 'SSPX Lithuania',
  'UCMa2Tt8bO4WMtgGhHNT8SvQ': 'SSPX Poland',
  'UCCz-PGAcOk43pHVy-vDvn6w': 'SSPX Japan',
  'UCwOhc0R7xInF5xMmIYcQCNQ': 'SSPX New Zealand',
  'UCBqo4pYIxecfKNS8gyvl_7A': 'SSPX Sydney, Australia',
  'UCm44MLLBK5wohdkgL7L0I8g': 'SSPX Asia',
  'UCgWuMCM4W5YssfYRDyO0pQg': 'SSPX Colombia',
  // ICRSS
  'UCBb7H5dkIrNjCmwBSwUX9Zw': 'ICRSS Chicago, IL',
  'UCV59wZ51HxRpXVsF-zsXbGg': 'ICRSS St. Louis, MO',
  'UCHhWuGhHEo7HCEKJ1MObM9g': 'ICRSS Limerick, Ireland',
  'UCT-aKExUFTkWeTymsDXi_yA': 'ICRSS Detroit, MI',
  'UCP3UYnnLs9gPCnlpaeLm41A': 'ICRSS San Jose, CA',
  'UCKec9U7C22wXtoKENiYQcNQ': 'ICRSS Shrewsbury, UK',
  'UCWx22ZogtyY8V_cGnF3KoWg': 'ICRSS Rouen, France',
  // FSSP
  'UCDiftFDDgXrRDSIeffAtY4A': 'FSSP Kansas City',
  'UCKyyBg-7STnPDO_-oEQWY0g': 'FSSP Providence, RI',
  'UCItp3GIpTS67DvqOLuWuWig': 'FSSP Baltimore, MD',
  'UCp3fLkScbe6hjEBncVk-EoA': 'FSSP Sacramento, CA',
  'UCGphbd3fgXviaxp5DjscYkw': 'FSSP Tacoma, WA',
  'UC1nuBPRlL4Y-e6dsN_HQbOA': 'FSSP Phoenix, AZ',
  'UCowKIe4fG3k7UNUGX-6pvgg': 'FSSP Denver, CO',
  'UCy7sVkgogsfm3tBpWyNHhEQ': 'FSSP Hampton Roads, VA',
  'UC-k7cYplIu_EGCi7iKsLwig': 'FSSP Ottawa, Canada',
  'UCMUg3-27shTAtUo87XRrUpg': 'FSSP Thorold, Canada',
  'UCM-i8QqB--VNgGERPRKX1WQ': 'FSSP Mexico',
  'UCLFaFtNEDw2x1pUU_1NaCHQ': 'FSSP Grenoble, France',
  'UClAtfCutuTEauRbJIUCVlcA': 'FSSP Rome',
  'UC0Q-fzs5jeqKadSBDoMLRBA': 'FSSP Czech Republic',
  'UCiqSUGo8vY59ZafzVlN3iHA': 'FSSP Liege, Belgium',
  'UCYWH7ffSj122xg4FLC9bz_g': 'FSSP Krakow, Poland',
  'UCbUFCVgYukiowYO9kEk61mQ': 'FSSP Lyon, France',
  // Diocesan & Other
  'UC-HuFJsZMy5CdwfXp9j-J0Q': 'Shrine of St. Elizabeth, Cleveland',
  'UCblrlrqAau4Co8zdNG05q-A': 'Una Voce Quad Cities',
  'UCAmIjqfkWf6pW-14htSl2WA': 'Schola Cantorum Miami',
  'UCZ6YQ4ZBs0fbeNPHl16YyFw': 'Oxford Oratory',
  'UCCd9cGbxpbLzjxqSsmiyznw': 'The Oratory, Birmingham',
  'UC2TgFkFPL1u_EY-u_Y5LYUQ': 'Walsingham Ordinariate',
  'UCCnqMFZiYb3UyAIXH8u6mDg': 'Cardiff Oratory',
  'UCkdAVV2fOLDr9ukNqxusEfQ': 'Saint-Roch, Paris',
  'UCIz1_vK-gfwd26Q3cIvDxPg': 'St Eugene, Paris',
  'UCGs5sHhPEbFI2GfNDp2roZg': 'Eglise Saint Georges, France',
  'UC1bDu25SkBzTBDbJ8VTfaHQ': 'Strasbourg, France',
  'UCaR8PNiIP4WFIbca2h4tOAw': "St Anne's, Perth, Australia",
  'UCRRUmJAW2o_nh74VB3ijYxQ': 'Toronto Oratory',
  'UCOhqDIXrFDR3yakjTeo36pw': 'Christ the King, Kansas City',
  'UCZXBRN8Tjr9VFZpsXlD9nyA': "Saint Stephen's, Cleveland",
  'UCFIftyWRJgbv2PUbSZHMhqg': 'OLEM Cambridge',
  'UCSLpi48jvqHTZjlwz7GI03w': 'Ss. Peter and Paul, Wilmington',
  'UC97kcPAmA8pjKp7oGZk3Wxw': 'Cathedral Parish, Bridgeport',
  'UCYWouNjOeZOEm-LA5-WzrFw': 'IBP Bogota, Colombia',
  'UCUAvLdD8G1XlKn8zoD2eRsQ': 'IBP Bialystok, Poland',
  'UCcDxlLGpnrVY9PKNIwa1e9g': 'FSSP Ciudad de Mexico',
  'UCbic4_tVkQ5x8Cjy4V_d4xA': 'Fr. Z',
  'UCHJ1Xdt-so0opeU5Fa1myVQ': 'Agrupacion Catolica Universitaria',
}

let cache: { data: any; timestamp: number } | null = null
const CACHE_TTL = 15 * 60 * 1000 // 15 minutes

async function searchLiveStreams(apiKey: string, query: string): Promise<any[]> {
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&eventType=live&type=video&q=${encodeURIComponent(query)}&maxResults=50&key=${apiKey}`
    const res = await fetch(url, { cache: 'no-store' })
    const data = await res.json()
    return data.items || []
  } catch {
    return []
  }
}

export async function GET() {
  const now = Date.now()

  if (cache && now - cache.timestamp < CACHE_TTL) {
    return NextResponse.json(cache.data)
  }

  const apiKey = process.env.YOUTUBE_API_KEY
  if (!apiKey) {
    return NextResponse.json({ live: [], error: 'No API key configured' })
  }

  try {
    // Two broad searches to maximize coverage (200 quota units total)
    const [results1, results2] = await Promise.all([
      searchLiveStreams(apiKey, 'latin mass traditional catholic'),
      searchLiveStreams(apiKey, 'missa tridentina holy mass SSPX FSSP'),
    ])

    const allResults = [...results1, ...results2]
    const seen = new Set<string>()
    const liveChannels: Array<{
      channelId: string
      channelName: string
      videoId: string
      title: string
      thumbnail: string
    }> = []

    for (const item of allResults) {
      const channelId = item.snippet?.channelId
      if (!channelId || seen.has(channelId)) continue
      seen.add(channelId)

      const knownName = KNOWN_CHANNELS[channelId]
      liveChannels.push({
        channelId,
        channelName: knownName || item.snippet.channelTitle,
        videoId: item.id?.videoId || '',
        title: item.snippet?.title || '',
        thumbnail: item.snippet?.thumbnails?.high?.url || item.snippet?.thumbnails?.medium?.url || '',
      })
    }

    const result = {
      live: liveChannels,
      knownLive: liveChannels.filter(c => KNOWN_CHANNELS[c.channelId]),
      otherLive: liveChannels.filter(c => !KNOWN_CHANNELS[c.channelId]),
      totalChannelsMonitored: Object.keys(KNOWN_CHANNELS).length,
      checkedAt: new Date().toISOString(),
    }

    cache = { data: result, timestamp: now }
    return NextResponse.json(result)
  } catch (err) {
    return NextResponse.json({ live: [], error: 'API error' })
  }
}
