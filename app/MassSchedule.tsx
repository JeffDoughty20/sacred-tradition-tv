'use client'

import { useState, useEffect } from 'react'
import styles from './MassSchedule.module.css'

interface MassEntry {
  name: string
  parish: string
  utcHour: number
  utcMinute: number
  channelUrl: string
  type: 'mass' | 'devotion'
}

const dailyMasses: MassEntry[] = [
  {
    name: 'Low Mass',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 5,
    utcMinute: 30,
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'mass',
  },
  {
    name: 'Low Mass',
    parish: 'SSPX Toronto, Canada',
    utcHour: 11,
    utcMinute: 15,
    channelUrl: 'https://www.youtube.com/channel/UC_W1sjtJTk7pE1j-EUbR5Tg/live',
    type: 'mass',
  },
  {
    name: 'Sung Mass',
    parish: 'Shrine of St. Elizabeth of Hungary, Cleveland',
    utcHour: 11,
    utcMinute: 30,
    channelUrl: 'https://www.youtube.com/channel/UC-HuFJsZMy5CdwfXp9j-J0Q/live',
    type: 'mass',
  },
  {
    name: 'Sung Mass',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 10,
    utcMinute: 0,
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'mass',
  },
  {
    name: 'Solemn Mass',
    parish: 'SSPX Poland',
    utcHour: 16,
    utcMinute: 0,
    channelUrl: 'https://www.youtube.com/channel/UCMa2Tt8bO4WMtgGhHNT8SvQ/live',
    type: 'mass',
  },
  {
    name: 'Evening Mass',
    parish: 'Oxford Oratory, England',
    utcHour: 17,
    utcMinute: 0,
    channelUrl: 'https://www.youtube.com/channel/UCZ6YQ4ZBs0fbeNPHl16YyFw/live',
    type: 'mass',
  },
  {
    name: 'Holy Rosary',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 15,
    utcMinute: 45,
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'devotion',
  },
  {
    name: 'Vespers & Benediction',
    parish: 'SSPX Saint-Nicolas-du-Chardonnet, Paris',
    utcHour: 16,
    utcMinute: 15,
    channelUrl: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live',
    type: 'devotion',
  },
]

function getLocalTime(utcHour: number, utcMinute: number): string {
  const now = new Date()
  const utcDate = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), utcHour, utcMinute))
  return utcDate.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
}

function isLiveNow(utcHour: number, utcMinute: number): boolean {
  const now = new Date()
  const utcNowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes()
  const massMinutes = utcHour * 60 + utcMinute
  const diff = utcNowMinutes - massMinutes
  return diff >= -5 && diff <= 75
}

function isUpcoming(utcHour: number, utcMinute: number): boolean {
  const now = new Date()
  const utcNowMinutes = now.getUTCHours() * 60 + now.getUTCMinutes()
  const massMinutes = utcHour * 60 + utcMinute
  const diff = massMinutes - utcNowMinutes
  return diff > 0 && diff <= 60
}

export default function MassSchedule() {
  const [timezone, setTimezone] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [, setTick] = useState(0)

  useEffect(() => {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone
    setTimezone(tz)

    const updateTime = () => {
      setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }))
      setTick(t => t + 1)
    }

    updateTime()
    const interval = setInterval(updateTime, 30000)
    return () => clearInterval(interval)
  }, [])

  const sorted = [...dailyMasses].sort((a, b) => {
    const aLocal = new Date(Date.UTC(2000, 0, 1, a.utcHour, a.utcMinute)).getTime()
    const bLocal = new Date(Date.UTC(2000, 0, 1, b.utcHour, b.utcMinute)).getTime()
    return aLocal - bLocal
  })

  if (!timezone) return null

  return (
    <div className={styles.wrapper}>
      <div className={styles.tzBar}>
        <span className={styles.tzLabel}>Your time zone: {timezone.replace(/_/g, ' ')}</span>
        <span className={styles.tzCurrent}>{currentTime}</span>
      </div>
      <div className={styles.massList}>
        {sorted.map((mass, i) => {
          const live = isLiveNow(mass.utcHour, mass.utcMinute)
          const upcoming = isUpcoming(mass.utcHour, mass.utcMinute)
          return (
            <a
              key={i}
              href={mass.channelUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.massRow} ${live ? styles.massRowLive : ''} ${upcoming ? styles.massRowUpcoming : ''}`}
            >
              <div className={styles.massTimeCol}>
                <span className={styles.massLocalTime}>{getLocalTime(mass.utcHour, mass.utcMinute)}</span>
                {live && <span className={styles.liveBadge}><span className={styles.liveDot} /> LIVE</span>}
                {upcoming && !live && <span className={styles.upcomingBadge}>Soon</span>}
              </div>
              <div className={styles.massInfoCol}>
                <span className={styles.massName}>{mass.name}</span>
                <span className={styles.massParish}>{mass.parish}</span>
              </div>
              <div className={styles.massTypeCol}>
                <span className={mass.type === 'mass' ? styles.typeMass : styles.typeDevotion}>
                  {mass.type === 'mass' ? '☩' : '📿'}
                </span>
              </div>
              <div className={styles.watchCol}>
                <span className={styles.watchBtn}>{live ? '▶ Watch Now' : 'Watch →'}</span>
              </div>
            </a>
          )
        })}
      </div>
      <div className={styles.browseAll}>
        <a href="/masses" className={styles.browseLink}>✠ Browse All 43+ Live Mass Channels</a>
      </div>
    </div>
  )
}
