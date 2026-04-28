'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './MassSchedule.module.css'

interface MassEntry {
  name: string
  parish: string
  utcHour: number
  utcMinute: number
  channelId: string
  channelUrl: string
  type: 'mass' | 'devotion'
}

interface LiveStream {
  channelId: string
  videoId: string
  title: string
  thumbnail: string
}

const dailyMasses: MassEntry[] = [
  {
    name: 'Low Mass',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 5, utcMinute: 30,
    channelId: 'UCGNiUjfJu2KOf71MKz86z7A',
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'mass',
  },
  {
    name: 'Sung Mass',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 10, utcMinute: 0,
    channelId: 'UCGNiUjfJu2KOf71MKz86z7A',
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'mass',
  },
  {
    name: 'Low Mass',
    parish: 'SSPX Toronto, Canada',
    utcHour: 11, utcMinute: 15,
    channelId: 'UC_W1sjtJTk7pE1j-EUbR5Tg',
    channelUrl: 'https://www.youtube.com/channel/UC_W1sjtJTk7pE1j-EUbR5Tg/live',
    type: 'mass',
  },
  {
    name: 'Sung Mass',
    parish: 'Shrine of St. Elizabeth of Hungary, Cleveland',
    utcHour: 11, utcMinute: 30,
    channelId: 'UC-HuFJsZMy5CdwfXp9j-J0Q',
    channelUrl: 'https://www.youtube.com/channel/UC-HuFJsZMy5CdwfXp9j-J0Q/live',
    type: 'mass',
  },
  {
    name: 'Holy Rosary',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 15, utcMinute: 45,
    channelId: 'UCGNiUjfJu2KOf71MKz86z7A',
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'devotion',
  },
  {
    name: 'Solemn Mass',
    parish: 'SSPX Poland',
    utcHour: 16, utcMinute: 0,
    channelId: 'UCMa2Tt8bO4WMtgGhHNT8SvQ',
    channelUrl: 'https://www.youtube.com/channel/UCMa2Tt8bO4WMtgGhHNT8SvQ/live',
    type: 'mass',
  },
  {
    name: 'Vespers & Benediction',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 16, utcMinute: 15,
    channelId: 'UCGNiUjfJu2KOf71MKz86z7A',
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'devotion',
  },
  {
    name: 'Evening Mass',
    parish: 'Oxford Oratory, England',
    utcHour: 17, utcMinute: 0,
    channelId: 'UCZ6YQ4ZBs0fbeNPHl16YyFw',
    channelUrl: 'https://www.youtube.com/channel/UCZ6YQ4ZBs0fbeNPHl16YyFw/live',
    type: 'mass',
  },
]

function getLocalTime(utcHour: number, utcMinute: number): string {
  const now = new Date()
  const utcDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), utcHour, utcMinute))
  return utcDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
}

export default function MassSchedule() {
  const [timezone, setTimezone] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [liveStreams, setLiveStreams] = useState<LiveStream[]>([])
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [activeTitle, setActiveTitle] = useState<string>('')
  const [, setTick] = useState(0)

  const fetchLiveStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/live-status')
      const data = await res.json()
      if (data.live) {
        setLiveStreams(data.live)
        // Auto-play first live stream if nothing is playing
        if (!activeVideo && data.live.length > 0) {
          setActiveVideo(data.live[0].videoId)
          setActiveTitle(data.live[0].title)
        }
      }
    } catch {
      // Silent fail
    }
  }, [activeVideo])

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }))
      setTick(t => t + 1)
    }
    updateTime()
    const timeInterval = setInterval(updateTime, 30000)
    fetchLiveStatus()
    const liveInterval = setInterval(fetchLiveStatus, 3 * 60 * 1000)
    return () => { clearInterval(timeInterval); clearInterval(liveInterval) }
  }, [fetchLiveStatus])

  const isChannelLive = (channelId: string): LiveStream | undefined => {
    return liveStreams.find(s => s.channelId === channelId)
  }

  const sorted = [...dailyMasses].sort((a, b) => {
    const now = new Date()
    const nowMinutes = now.getHours() * 60 + now.getMinutes()
    const aDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), a.utcHour, a.utcMinute))
    const bDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), b.utcHour, b.utcMinute))
    const aMinutes = aDate.getHours() * 60 + aDate.getMinutes()
    const bMinutes = bDate.getHours() * 60 + bDate.getMinutes()
    const aLive = isChannelLive(a.channelId) ? -10000 : 0
    const bLive = isChannelLive(b.channelId) ? -10000 : 0
    const aOffset = (aMinutes - nowMinutes + 1440) % 1440 + aLive
    const bOffset = (bMinutes - nowMinutes + 1440) % 1440 + bLive
    return aOffset - bOffset
  })

  const nextMass = sorted[0]
  const nextTime = nextMass ? getLocalTime(nextMass.utcHour, nextMass.utcMinute) : ''

  if (!timezone) return null

  return (
    <div className={styles.wrapper}>

      {/* === THE SCREEN === */}
      <div className={styles.tvFrame}>
        <div className={styles.tvBar}>
          <div className={styles.tvBarLeft}>
            {activeVideo ? (
              <span className={styles.tvLiveBadge}><span className={styles.liveDot} /> LIVE</span>
            ) : (
              <span className={styles.tvOffAir}>Schedule</span>
            )}
          </div>
          <div className={styles.tvBarCenter}>
            {activeTitle || 'Sacred Tradition Television'}
          </div>
          <div className={styles.tvBarRight}>
            {currentTime}
          </div>
        </div>

        <div className={styles.tvScreen}>
          {activeVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Live Mass Stream"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.tvIframe}
            />
          ) : (
            <div className={styles.tvOffScreen}>
              <img src="/mass.png" alt="" className={styles.tvOffImage} />
              <div className={styles.tvOffOverlay}>
                <div className={styles.tvOffContent}>
                  <div className={styles.tvOffCross}>✠</div>
                  <h3 className={styles.tvOffTitle}>No Mass Currently Streaming</h3>
                  <p className={styles.tvOffNext}>
                    Next: <strong>{nextMass?.name}</strong> at {nextTime}
                  </p>
                  <p className={styles.tvOffParish}>{nextMass?.parish}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === TIMEZONE BAR === */}
      <div className={styles.tzBar}>
        <span className={styles.tzLabel}>{timezone.replace(/_/g, ' ')}</span>
        <span className={styles.tzLabel}>{liveStreams.length > 0 ? `${liveStreams.length} channel${liveStreams.length > 1 ? 's' : ''} live` : 'Checking streams...'}</span>
      </div>

      {/* === CHANNEL GUIDE === */}
      <div className={styles.guideLabel}>Channel Guide</div>
      <div className={styles.guideScroll}>
        {sorted.map((mass, i) => {
          const live = isChannelLive(mass.channelId)
          const isActive = live && activeVideo === live.videoId
          return (
            <div
              key={i}
              className={`${styles.guideCard} ${live ? styles.guideCardLive : ''} ${isActive ? styles.guideCardActive : ''}`}
              onClick={() => {
                if (live) {
                  setActiveVideo(live.videoId)
                  setActiveTitle(live.title)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                } else {
                  window.open(mass.channelUrl, '_blank')
                }
              }}
            >
              <div className={styles.guideThumb}>
                {live && live.thumbnail ? (
                  <img src={live.thumbnail} alt={mass.name} className={styles.guideThumbImg} />
                ) : (
                  <div className={styles.guideThumbPlaceholder}>
                    <span className={styles.guideThumbIcon}>{mass.type === 'mass' ? '☩' : '📿'}</span>
                  </div>
                )}
                {live && (
                  <span className={styles.guideLiveBadge}><span className={styles.liveDot} /> LIVE</span>
                )}
                <span className={styles.guideTime}>{getLocalTime(mass.utcHour, mass.utcMinute)}</span>
              </div>
              <div className={styles.guideInfo}>
                <span className={styles.guideName}>{mass.name}</span>
                <span className={styles.guideParish}>{mass.parish}</span>
              </div>
            </div>
          )
        })}
        <a href="/masses" className={styles.guideCardAll}>
          <div className={styles.guideAllIcon}>✠</div>
          <span className={styles.guideAllText}>Browse All<br/>43+ Channels</span>
        </a>
      </div>
    </div>
  )
}
