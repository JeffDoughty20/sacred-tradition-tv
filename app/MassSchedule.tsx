'use client'

import { useState, useEffect } from 'react'
import styles from './MassSchedule.module.css'

interface Channel {
  name: string
  subtitle: string
  channelId?: string
  videoId?: string
  utcHour: number
  utcMinute: number
  isLive?: boolean // true = live stream channel, false = recorded/playlist
}

// Default Gregorian chant to play when site opens
const DEFAULT_CHANT: Channel = {
  name: 'Gregorian Chant',
  subtitle: 'Sacred Tradition Television',
  videoId: 'KTH8HKcUe0E',
  utcHour: 0, utcMinute: 0,
  isLive: false,
}

const latinMass: Channel[] = [
  { name: 'FSSP Phoenix', subtitle: 'Phoenix, AZ', channelId: 'UC1nuBPRlL4Y-e6dsN_HQbOA', utcHour: 14, utcMinute: 0, isLive: true },
  { name: 'Shrine of St. Elizabeth', subtitle: 'Cleveland, OH', channelId: 'UC-HuFJsZMy5CdwfXp9j-J0Q', utcHour: 11, utcMinute: 30, isLive: true },
  { name: 'SSPX Toronto', subtitle: 'Toronto, Canada', channelId: 'UC_W1sjtJTk7pE1j-EUbR5Tg', utcHour: 11, utcMinute: 15, isLive: true },
  { name: 'ICRSS Chicago', subtitle: 'Chicago, IL', channelId: 'UCBb7H5dkIrNjCmwBSwUX9Zw', utcHour: 12, utcMinute: 0, isLive: true },
  { name: 'SSPX Paris — Low Mass', subtitle: 'Saint-Nicolas-du-Chardonnet', channelId: 'UCGNiUjfJu2KOf71MKz86z7A', utcHour: 5, utcMinute: 30, isLive: true },
  { name: 'SSPX Paris — Sung Mass', subtitle: 'Saint-Nicolas-du-Chardonnet', channelId: 'UCGNiUjfJu2KOf71MKz86z7A', utcHour: 10, utcMinute: 0, isLive: true },
  { name: 'SSPX Poland', subtitle: 'Warszawa', channelId: 'UCMa2Tt8bO4WMtgGhHNT8SvQ', utcHour: 16, utcMinute: 0, isLive: true },
  { name: 'Oxford Oratory', subtitle: 'Oxford, England', channelId: 'UCZ6YQ4ZBs0fbeNPHl16YyFw', utcHour: 17, utcMinute: 0, isLive: true },
]

const chantAndRosary: Channel[] = [
  { name: 'Gregorian Chant', subtitle: 'Monks of the Desert', videoId: 'KTH8HKcUe0E', utcHour: 0, utcMinute: 0, isLive: false },
  { name: 'SSPX Seminary — Rosary', subtitle: 'Daily at 4:00 PM ET', channelId: 'UCZoB5_BphShGRovMZ2AsG5A', utcHour: 20, utcMinute: 0, isLive: true },
  { name: 'Sacred Polyphony', subtitle: 'Palestrina & Victoria', videoId: 'BOVXbSFziXQ', utcHour: 0, utcMinute: 0, isLive: false },
  { name: 'SSPX Paris — Chapelet', subtitle: 'Daily Rosary', channelId: 'UCGNiUjfJu2KOf71MKz86z7A', utcHour: 15, utcMinute: 45, isLive: true },
  { name: 'Chant of the Mystics', subtitle: 'Healing Gregorian Chant', videoId: 'kZY2eeozdo8', utcHour: 0, utcMinute: 0, isLive: false },
  { name: 'Silverstream Priory', subtitle: 'Divine Office', channelId: 'UCpnItyslD0BqEOYBbTRy35w', utcHour: 19, utcMinute: 30, isLive: true },
  { name: 'Requiem — Mozart', subtitle: 'Sacred Classical', videoId: 'sPlhKP0nZII', utcHour: 0, utcMinute: 0, isLive: false },
]

const vaticanLive: Channel[] = [
  { name: 'Vatican News', subtitle: 'Official Vatican Channel', channelId: 'UCxIsefyl9g9A5SGWA4FvGIA', utcHour: 9, utcMinute: 0, isLive: true },
  { name: 'Vatican Media', subtitle: 'Holy See Press Office', channelId: 'UCKMuFzwGVQ7PaGMwMvW0Fiw', utcHour: 9, utcMinute: 30, isLive: true },
]

function getLocalTime(utcHour: number, utcMinute: number): { time: string; label: string } {
  const now = new Date()
  const today = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), utcHour, utcMinute))
  const tomorrow = new Date(today.getTime() + 86400000)

  const nowMs = now.getTime()
  const todayMs = today.getTime()
  const tomorrowMs = tomorrow.getTime()

  // If today's time hasn't passed (or within 75 min window), show as Today
  if (todayMs + 75 * 60000 > nowMs && todayMs - 30 * 60000 < nowMs) {
    return { time: today.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }), label: 'Now' }
  } else if (todayMs > nowMs) {
    return { time: today.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }), label: 'Today' }
  } else {
    return { time: tomorrow.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }), label: 'Tomorrow' }
  }
}

function getEmbedUrl(ch: Channel): string {
  if (ch.videoId) {
    return `https://www.youtube.com/embed/${ch.videoId}?autoplay=1&rel=0&modestbranding=1`
  }
  if (ch.channelId) {
    return `https://www.youtube.com/embed/live_stream?channel=${ch.channelId}&autoplay=1&rel=0&modestbranding=1`
  }
  return ''
}

export default function MassSchedule() {
  const [active, setActive] = useState<Channel>(DEFAULT_CHANT)
  const [currentTime, setCurrentTime] = useState('')
  const [timezone, setTimezone] = useState('')
  const [thumbs, setThumbs] = useState<Record<string, string>>({})

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const update = () => setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }))
    update()
    const i = setInterval(update, 30000)
    fetch('/api/channels').then(r => r.json()).then(d => { if (d && typeof d === 'object') setThumbs(d) }).catch(() => {})
    return () => clearInterval(i)
  }, [])

  const play = (ch: Channel) => {
    setActive(ch)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const sortChannels = (channels: Channel[]) => {
    return [...channels].sort((a, b) => {
      // Non-live (recorded) content goes to the end
      if (!a.isLive && b.isLive) return 1
      if (a.isLive && !b.isLive) return -1
      if (!a.isLive && !b.isLive) return 0
      // Live channels sorted by next upcoming
      const now = new Date()
      const nowMin = now.getHours() * 60 + now.getMinutes()
      const aD = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), a.utcHour, a.utcMinute))
      const bD = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), b.utcHour, b.utcMinute))
      const aMin = aD.getHours() * 60 + aD.getMinutes()
      const bMin = bD.getHours() * 60 + bD.getMinutes()
      return ((aMin - nowMin + 1440) % 1440) - ((bMin - nowMin + 1440) % 1440)
    })
  }

  const renderCard = (ch: Channel, i: number) => {
    const thumb = ch.channelId ? thumbs[ch.channelId] : null
    const isActive = active === ch || (active.channelId === ch.channelId && active.utcHour === ch.utcHour && active.videoId === ch.videoId)
    const timeInfo = ch.isLive ? getLocalTime(ch.utcHour, ch.utcMinute) : null

    return (
      <div key={i} className={`${styles.card} ${isActive ? styles.cardActive : ''}`} onClick={() => play(ch)}>
        <div className={styles.cardThumb}>
          {thumb ? (
            <img src={thumb} alt={ch.name} className={styles.cardImg} />
          ) : (
            <div className={styles.cardPlaceholder}>
              <span className={styles.cardPlaceholderIcon}>{ch.isLive ? '☩' : '♪'}</span>
            </div>
          )}
          <div className={styles.cardOverlay}>
            <span className={styles.cardPlay}>▶</span>
          </div>
          {timeInfo && (
            <span className={`${styles.cardTime} ${timeInfo.label === 'Now' ? styles.cardTimeNow : ''}`}>
              {timeInfo.time}
            </span>
          )}
          {timeInfo && (
            <span className={`${styles.cardLabel} ${timeInfo.label === 'Now' ? styles.cardLabelNow : timeInfo.label === 'Tomorrow' ? styles.cardLabelTomorrow : styles.cardLabelToday}`}>
              {timeInfo.label}
            </span>
          )}
          {!ch.isLive && (
            <span className={styles.cardOnDemand}>On Demand</span>
          )}
        </div>
        <div className={styles.cardInfo}>
          <span className={styles.cardName}>{ch.name}</span>
          <span className={styles.cardSub}>{ch.subtitle}</span>
        </div>
      </div>
    )
  }

  const renderRow = (title: string, icon: string, channels: Channel[]) => (
    <div className={styles.rowSection}>
      <div className={styles.rowHeader}>
        <span className={styles.rowIcon}>{icon}</span>
        <h3 className={styles.rowTitle}>{title}</h3>
      </div>
      <div className={styles.rowScroll}>
        {sortChannels(channels).map((ch, i) => renderCard(ch, i))}
      </div>
    </div>
  )

  if (!timezone) return null

  return (
    <div className={styles.wrapper}>
      {/* === TV SCREEN === */}
      <div className={styles.tvFrame}>
        <div className={styles.tvBar}>
          <div className={styles.tvBarLeft}>
            {active.isLive !== false ? (
              <span className={styles.tvLiveBadge}><span className={styles.liveDot} /> LIVE</span>
            ) : (
              <span className={styles.tvOnDemand}>♪ Playing</span>
            )}
          </div>
          <div className={styles.tvBarCenter}>{active.name}</div>
          <div className={styles.tvBarRight}>{currentTime}</div>
        </div>
        <div className={styles.tvScreen}>
          <iframe
            src={getEmbedUrl(active)}
            title={active.name}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.tvIframe}
          />
        </div>
        <div className={styles.tvInfoBar}>
          <span className={styles.tvInfoName}>{active.name}</span>
          <span className={styles.tvInfoSub}>{active.subtitle}</span>
          <span className={styles.tvInfoTz}>{timezone.replace(/_/g, ' ')}</span>
        </div>
      </div>

      {renderRow('Traditional Latin Mass', '☩', latinMass)}
      {renderRow('Gregorian Chant & Holy Rosary', '♪', chantAndRosary)}
      {renderRow('Vatican Live', '🔑', vaticanLive)}
    </div>
  )
}
