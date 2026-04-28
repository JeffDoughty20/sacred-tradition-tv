'use client'

import { useState, useEffect } from 'react'
import styles from './MassSchedule.module.css'

interface Channel {
  name: string
  subtitle: string
  channelId: string
  utcHour: number
  utcMinute: number
}

// Verified daily streamers with known UTC times
const latinMass: Channel[] = [
  { name: 'FSSP Phoenix', subtitle: 'Phoenix, AZ', channelId: 'UC1nuBPRlL4Y-e6dsN_HQbOA', utcHour: 14, utcMinute: 0 },
  { name: 'Shrine of St. Elizabeth', subtitle: 'Cleveland, OH', channelId: 'UC-HuFJsZMy5CdwfXp9j-J0Q', utcHour: 11, utcMinute: 30 },
  { name: 'SSPX Toronto', subtitle: 'Toronto, Canada', channelId: 'UC_W1sjtJTk7pE1j-EUbR5Tg', utcHour: 11, utcMinute: 15 },
  { name: 'ICRSS Chicago', subtitle: 'Chicago, IL', channelId: 'UCBb7H5dkIrNjCmwBSwUX9Zw', utcHour: 12, utcMinute: 0 },
  { name: 'SSPX Paris — Low Mass', subtitle: 'Saint-Nicolas-du-Chardonnet', channelId: 'UCGNiUjfJu2KOf71MKz86z7A', utcHour: 5, utcMinute: 30 },
  { name: 'SSPX Paris — Sung Mass', subtitle: 'Saint-Nicolas-du-Chardonnet', channelId: 'UCGNiUjfJu2KOf71MKz86z7A', utcHour: 10, utcMinute: 0 },
  { name: 'SSPX Poland', subtitle: 'Warszawa', channelId: 'UCMa2Tt8bO4WMtgGhHNT8SvQ', utcHour: 16, utcMinute: 0 },
  { name: 'Oxford Oratory', subtitle: 'Oxford, England', channelId: 'UCZ6YQ4ZBs0fbeNPHl16YyFw', utcHour: 17, utcMinute: 0 },
]

const rosary: Channel[] = [
  { name: 'SSPX Seminary — Rosary', subtitle: 'St. Thomas Aquinas Seminary', channelId: 'UCZoB5_BphShGRovMZ2AsG5A', utcHour: 20, utcMinute: 0 },
  { name: 'SSPX Paris — Chapelet', subtitle: 'Daily Holy Rosary', channelId: 'UCGNiUjfJu2KOf71MKz86z7A', utcHour: 15, utcMinute: 45 },
  { name: 'Silverstream Priory', subtitle: 'Divine Office & Rosary', channelId: 'UCpnItyslD0BqEOYBbTRy35w', utcHour: 19, utcMinute: 30 },
]

const vaticanLive: Channel[] = [
  { name: 'Vatican News', subtitle: 'Official Vatican Channel', channelId: 'UCxIsefyl9g9A5SGWA4FvGIA', utcHour: 9, utcMinute: 0 },
  { name: 'Vatican Media', subtitle: 'Holy See Press Office', channelId: 'UCKMuFzwGVQ7PaGMwMvW0Fiw', utcHour: 9, utcMinute: 30 },
]

function getLocalTime(utcHour: number, utcMinute: number): string {
  const now = new Date()
  const d = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), utcHour, utcMinute))
  return d.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })
}

export default function MassSchedule() {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)
  const [currentTime, setCurrentTime] = useState('')
  const [timezone, setTimezone] = useState('')
  const [thumbs, setThumbs] = useState<Record<string, string>>({})

  useEffect(() => {
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    const update = () => setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }))
    update()
    const i = setInterval(update, 30000)

    // Fetch YouTube channel thumbnails
    fetch('/api/channels')
      .then(r => r.json())
      .then(data => { if (data && typeof data === 'object') setThumbs(data) })
      .catch(() => {})

    return () => clearInterval(i)
  }, [])

  const playChannel = (ch: Channel) => {
    setActiveChannel(ch)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const renderRow = (title: string, icon: string, channels: Channel[]) => {
    const sorted = [...channels].sort((a, b) => {
      const now = new Date()
      const nowMin = now.getHours() * 60 + now.getMinutes()
      const aD = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), a.utcHour, a.utcMinute))
      const bD = new Date(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate(), b.utcHour, b.utcMinute))
      const aMin = aD.getHours() * 60 + aD.getMinutes()
      const bMin = bD.getHours() * 60 + bD.getMinutes()
      return ((aMin - nowMin + 1440) % 1440) - ((bMin - nowMin + 1440) % 1440)
    })

    return (
      <div className={styles.rowSection}>
        <div className={styles.rowHeader}>
          <span className={styles.rowIcon}>{icon}</span>
          <h3 className={styles.rowTitle}>{title}</h3>
        </div>
        <div className={styles.rowScroll}>
          {sorted.map((ch, i) => {
            const thumb = thumbs[ch.channelId]
            const isActive = activeChannel?.channelId === ch.channelId && activeChannel?.utcHour === ch.utcHour
            return (
              <div key={i} className={`${styles.card} ${isActive ? styles.cardActive : ''}`} onClick={() => playChannel(ch)}>
                <div className={styles.cardThumb}>
                  {thumb ? (
                    <img src={thumb} alt={ch.name} className={styles.cardImg} />
                  ) : (
                    <div className={styles.cardPlaceholder}>
                      <span className={styles.cardPlaceholderIcon}>{icon}</span>
                    </div>
                  )}
                  <div className={styles.cardOverlay}>
                    <span className={styles.cardPlay}>▶</span>
                  </div>
                  <span className={styles.cardTime}>{getLocalTime(ch.utcHour, ch.utcMinute)}</span>
                </div>
                <div className={styles.cardInfo}>
                  <span className={styles.cardName}>{ch.name}</span>
                  <span className={styles.cardSub}>{ch.subtitle}</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  if (!timezone) return null

  return (
    <div className={styles.wrapper}>

      {/* === TV SCREEN === */}
      <div className={styles.tvFrame}>
        <div className={styles.tvBar}>
          <div className={styles.tvBarLeft}>
            {activeChannel ? (
              <span className={styles.tvLiveBadge}><span className={styles.liveDot} /> LIVE</span>
            ) : (
              <span className={styles.tvOffAir}>Select a Channel</span>
            )}
          </div>
          <div className={styles.tvBarCenter}>
            {activeChannel ? activeChannel.name : 'Sacred Tradition Television'}
          </div>
          <div className={styles.tvBarRight}>{currentTime}</div>
        </div>
        <div className={styles.tvScreen}>
          {activeChannel ? (
            <iframe
              src={`https://www.youtube.com/embed/live_stream?channel=${activeChannel.channelId}&autoplay=1&rel=0&modestbranding=1`}
              title={activeChannel.name}
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
                  <h3 className={styles.tvOffTitle}>Sacred Tradition Television</h3>
                  <p className={styles.tvOffSub}>Select a channel below to begin watching</p>
                  <p className={styles.tvOffTz}>{timezone.replace(/_/g, ' ')}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {activeChannel && (
          <div className={styles.tvInfoBar}>
            <span className={styles.tvInfoName}>{activeChannel.name}</span>
            <span className={styles.tvInfoSub}>{activeChannel.subtitle}</span>
            <button className={styles.tvClose} onClick={() => setActiveChannel(null)}>✕</button>
          </div>
        )}
      </div>

      {/* === ROW 1: LATIN MASS === */}
      {renderRow('Traditional Latin Mass', '☩', latinMass)}

      {/* === ROW 2: ROSARY & CHANT === */}
      {renderRow('Holy Rosary & Divine Office', '📿', rosary)}

      {/* === ROW 3: VATICAN === */}
      {renderRow('Vatican Live', '🔑', vaticanLive)}

    </div>
  )
}
