'use client'

import { useState, useEffect } from 'react'
import styles from './MassSchedule.module.css'

interface Channel {
  name: string
  subtitle: string
  channelId: string
  thumbnail: string
}

const latinMass: Channel[] = [
  { name: 'FSSP Phoenix', subtitle: 'Phoenix, AZ', channelId: 'UC1nuBPRlL4Y-e6dsN_HQbOA', thumbnail: '/mass.png' },
  { name: 'SSPX Seminary', subtitle: 'Winona, MN', channelId: 'UCZoB5_BphShGRovMZ2AsG5A', thumbnail: '/mass.png' },
  { name: 'Shrine of St. Elizabeth', subtitle: 'Cleveland, OH', channelId: 'UC-HuFJsZMy5CdwfXp9j-J0Q', thumbnail: '/mass.png' },
  { name: 'ICRSS Chicago', subtitle: 'Chicago, IL', channelId: 'UCBb7H5dkIrNjCmwBSwUX9Zw', thumbnail: '/mass.png' },
  { name: 'SSPX Paris', subtitle: 'Saint-Nicolas-du-Chardonnet', channelId: 'UCGNiUjfJu2KOf71MKz86z7A', thumbnail: '/mass.png' },
  { name: 'FSSP Kansas City', subtitle: 'Kansas City, MO', channelId: 'UCDiftFDDgXrRDSIeffAtY4A', thumbnail: '/mass.png' },
  { name: 'SSPX Toronto', subtitle: 'Toronto, Canada', channelId: 'UC_W1sjtJTk7pE1j-EUbR5Tg', thumbnail: '/mass.png' },
  { name: 'Oxford Oratory', subtitle: 'Oxford, England', channelId: 'UCZ6YQ4ZBs0fbeNPHl16YyFw', thumbnail: '/mass.png' },
  { name: 'FSSP Sacramento', subtitle: 'Sacramento, CA', channelId: 'UCp3fLkScbe6hjEBncVk-EoA', thumbnail: '/mass.png' },
  { name: 'Canons Regular', subtitle: 'New Jerusalem', channelId: 'UC9haz_LghUfO8Mp0HilRM1Q', thumbnail: '/mass.png' },
]

const chantAndRosary: Channel[] = [
  { name: 'Gregorian Chant 24/7', subtitle: 'Sacred Music Stream', channelId: 'UCnczYYBPJHPFhNBt9dI399Q', thumbnail: '/mass.png' },
  { name: 'SSPX Seminary Rosary', subtitle: 'Daily Holy Rosary', channelId: 'UCZoB5_BphShGRovMZ2AsG5A', thumbnail: '/mass.png' },
  { name: 'Gregorian Chant', subtitle: 'Monks of Norcia', channelId: 'UCpnItyslD0BqEOYBbTRy35w', thumbnail: '/mass.png' },
  { name: 'Holy Rosary Live', subtitle: 'Daily Mysteries', channelId: 'UC7b-QQ7PbrZs6yAUdJkSL7w', thumbnail: '/mass.png' },
  { name: 'Sacred Polyphony', subtitle: 'Choral Music', channelId: 'UCY53AqHeZ3n3HgjttLdcBww', thumbnail: '/mass.png' },
]

const vaticanLive: Channel[] = [
  { name: 'Vatican News', subtitle: 'Official Vatican Channel', channelId: 'UCxIsefyl9g9A5SGWA4FvGIA', thumbnail: '/mass.png' },
  { name: 'Vatican Media', subtitle: 'Holy See Press Office', channelId: 'UCKMuFzwGVQ7PaGMwMvW0Fiw', thumbnail: '/mass.png' },
  { name: 'Vatican News - Italiano', subtitle: 'Notizie dal Vaticano', channelId: 'UC7E-LYc1wivk33iMQG3pIJA', thumbnail: '/mass.png' },
  { name: 'Vatican News - Español', subtitle: 'Noticias del Vaticano', channelId: 'UCEKMBHgrabkCbv0P4u42p7A', thumbnail: '/mass.png' },
]

export default function MassSchedule() {
  const [activeChannel, setActiveChannel] = useState<Channel | null>(null)
  const [currentTime, setCurrentTime] = useState('')

  useEffect(() => {
    const update = () => setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }))
    update()
    const i = setInterval(update, 30000)
    return () => clearInterval(i)
  }, [])

  const playChannel = (ch: Channel) => {
    setActiveChannel(ch)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

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
                </div>
              </div>
            </div>
          )}
        </div>
        {activeChannel && (
          <div className={styles.tvInfoBar}>
            <span className={styles.tvInfoName}>{activeChannel.name}</span>
            <span className={styles.tvInfoSub}>{activeChannel.subtitle}</span>
            <button className={styles.tvClose} onClick={() => setActiveChannel(null)}>✕ Close</button>
          </div>
        )}
      </div>

      {/* === ROW 1: LATIN MASS === */}
      <div className={styles.rowSection}>
        <div className={styles.rowHeader}>
          <span className={styles.rowIcon}>☩</span>
          <h3 className={styles.rowTitle}>Traditional Latin Mass</h3>
        </div>
        <div className={styles.rowScroll}>
          {latinMass.map((ch, i) => (
            <div key={i} className={`${styles.card} ${activeChannel?.channelId === ch.channelId ? styles.cardActive : ''}`} onClick={() => playChannel(ch)}>
              <div className={styles.cardThumb}>
                <img src={ch.thumbnail} alt={ch.name} className={styles.cardImg} />
                <div className={styles.cardOverlay}>
                  <span className={styles.cardPlay}>▶</span>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{ch.name}</span>
                <span className={styles.cardSub}>{ch.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === ROW 2: GREGORIAN CHANT & ROSARY === */}
      <div className={styles.rowSection}>
        <div className={styles.rowHeader}>
          <span className={styles.rowIcon}>♪</span>
          <h3 className={styles.rowTitle}>Gregorian Chant &amp; Holy Rosary</h3>
        </div>
        <p className={styles.rowNote}>Gregorian chant streams between daily Rosary</p>
        <div className={styles.rowScroll}>
          {chantAndRosary.map((ch, i) => (
            <div key={i} className={`${styles.card} ${activeChannel?.channelId === ch.channelId ? styles.cardActive : ''}`} onClick={() => playChannel(ch)}>
              <div className={styles.cardThumb}>
                <img src={ch.thumbnail} alt={ch.name} className={styles.cardImg} />
                <div className={styles.cardOverlay}>
                  <span className={styles.cardPlay}>▶</span>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{ch.name}</span>
                <span className={styles.cardSub}>{ch.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* === ROW 3: VATICAN LIVE === */}
      <div className={styles.rowSection}>
        <div className={styles.rowHeader}>
          <span className={styles.rowIcon}>🔑</span>
          <h3 className={styles.rowTitle}>Vatican Live</h3>
        </div>
        <div className={styles.rowScroll}>
          {vaticanLive.map((ch, i) => (
            <div key={i} className={`${styles.card} ${activeChannel?.channelId === ch.channelId ? styles.cardActive : ''}`} onClick={() => playChannel(ch)}>
              <div className={styles.cardThumb}>
                <img src={ch.thumbnail} alt={ch.name} className={styles.cardImg} />
                <div className={styles.cardOverlay}>
                  <span className={styles.cardPlay}>▶</span>
                </div>
              </div>
              <div className={styles.cardInfo}>
                <span className={styles.cardName}>{ch.name}</span>
                <span className={styles.cardSub}>{ch.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
