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
    name: 'Sung Mass',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 10, utcMinute: 0,
    channelId: 'UCGNiUjfJu2KOf71MKz86z7A',
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'mass',
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
    name: 'Evening Mass',
    parish: 'Oxford Oratory, England',
    utcHour: 17, utcMinute: 0,
    channelId: 'UCZ6YQ4ZBs0fbeNPHl16YyFw',
    channelUrl: 'https://www.youtube.com/channel/UCZ6YQ4ZBs0fbeNPHl16YyFw/live',
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
    name: 'Vespers & Benediction',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 16, utcMinute: 15,
    channelId: 'UCGNiUjfJu2KOf71MKz86z7A',
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'devotion',
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
  const [, setTick] = useState(0)

  const fetchLiveStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/live-status')
      const data = await res.json()
      if (data.live) {
        setLiveStreams(data.live)
      }
    } catch {
      // Silent fail
    }
  }, [])

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }))
      setTick(t => t + 1)
    }
    updateTime()
    const timeInterval = setInterval(updateTime, 30000)

    // Fetch live status
    fetchLiveStatus()
    const liveInterval = setInterval(fetchLiveStatus, 3 * 60 * 1000) // every 3 min

    return () => {
      clearInterval(timeInterval)
      clearInterval(liveInterval)
    }
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

    // Live channels always come first
    const aLive = isChannelLive(a.channelId) ? -10000 : 0
    const bLive = isChannelLive(b.channelId) ? -10000 : 0

    const aOffset = (aMinutes - nowMinutes + 1440) % 1440 + aLive
    const bOffset = (bMinutes - nowMinutes + 1440) % 1440 + bLive

    return aOffset - bOffset
  })

  if (!timezone) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.tzBar}>
        <span className={styles.tzLabel}>Your time zone: {timezone.replace(/_/g, ' ')}</span>
        <span className={styles.tzCurrent}>{currentTime}</span>
      </div>

      {/* Embedded live video */}
      {activeVideo && (
        <div className={styles.livePlayer}>
          <div className={styles.livePlayerHeader}>
            <span className={styles.livePlayerBadge}><span className={styles.liveDot} /> LIVE NOW</span>
            <button className={styles.livePlayerClose} onClick={() => setActiveVideo(null)}>✕ Close</button>
          </div>
          <div className={styles.videoWrapper}>
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1`}
              title="Live Mass"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className={styles.videoFrame}
            />
          </div>
        </div>
      )}

      <div className={styles.massList}>
        {sorted.map((mass, i) => {
          const live = isChannelLive(mass.channelId)
          return (
            <div
              key={i}
              className={`${styles.massRow} ${live ? styles.massRowLive : ''}`}
              onClick={() => {
                if (live) {
                  setActiveVideo(live.videoId)
                } else {
                  window.open(mass.channelUrl, '_blank')
                }
              }}
            >
              <div className={styles.massTimeCol}>
                <span className={styles.massLocalTime}>{getLocalTime(mass.utcHour, mass.utcMinute)}</span>
                {live && <span className={styles.liveBadge}><span className={styles.liveDot} /> LIVE</span>}
              </div>
              <div className={styles.massInfoCol}>
                <span className={styles.massName}>{mass.name}</span>
                <span className={styles.massParish}>{mass.parish}</span>
                {live && <span className={styles.liveTitle}>{live.title}</span>}
              </div>
              <div className={styles.massTypeCol}>
                <span className={mass.type === 'mass' ? styles.typeMass : styles.typeDevotion}>
                  {mass.type === 'mass' ? '☩' : '📿'}
                </span>
              </div>
              <div className={styles.watchCol}>
                <span className={live ? styles.watchBtnLive : styles.watchBtn}>
                  {live ? '▶ Watch Now' : 'Watch →'}
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <div className={styles.browseAll}>
        <a href="/masses" className={styles.browseLink}>✠ Browse All 43+ Live Mass Channels</a>
      </div>
    </div>
  )
}
