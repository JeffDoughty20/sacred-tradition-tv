'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './MassSchedule.module.css'

interface LiveStream {
  channelId: string
  channelName: string
  videoId: string
  title: string
  thumbnail: string
}

export default function MassSchedule() {
  const [timezone, setTimezone] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [knownLive, setKnownLive] = useState<LiveStream[]>([])
  const [otherLive, setOtherLive] = useState<LiveStream[]>([])
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [activeTitle, setActiveTitle] = useState('')
  const [totalChannels, setTotalChannels] = useState(0)
  const [lastChecked, setLastChecked] = useState('')
  const [, setTick] = useState(0)

  const fetchLiveStatus = useCallback(async () => {
    try {
      const res = await fetch('/api/live-status')
      const data = await res.json()
      if (data.knownLive) setKnownLive(data.knownLive)
      if (data.otherLive) setOtherLive(data.otherLive)
      if (data.totalChannelsMonitored) setTotalChannels(data.totalChannelsMonitored)
      if (data.checkedAt) setLastChecked(new Date(data.checkedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))

      const allLive = [...(data.knownLive || []), ...(data.otherLive || [])]
      if (!activeVideo && allLive.length > 0) {
        setActiveVideo(allLive[0].videoId)
        setActiveTitle(allLive[0].title)
      }
    } catch { /* silent */ }
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

  const allLive = [...knownLive, ...otherLive]

  if (!timezone) return null

  return (
    <div className={styles.wrapper}>

      {/* === THE TV SCREEN === */}
      <div className={styles.tvFrame}>
        <div className={styles.tvBar}>
          <div className={styles.tvBarLeft}>
            {activeVideo ? (
              <span className={styles.tvLiveBadge}><span className={styles.liveDot} /> LIVE</span>
            ) : (
              <span className={styles.tvOffAir}>
                {allLive.length > 0 ? `${allLive.length} Live` : 'Off Air'}
              </span>
            )}
          </div>
          <div className={styles.tvBarCenter}>
            {activeTitle || 'Sacred Tradition Television'}
          </div>
          <div className={styles.tvBarRight}>{currentTime}</div>
        </div>

        <div className={styles.tvScreen}>
          {activeVideo ? (
            <iframe
              src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0&modestbranding=1`}
              title="Live Stream"
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
                  <p className={styles.tvOffSub}>Monitoring {totalChannels} channels worldwide</p>
                  <p className={styles.tvOffSub}>Last checked: {lastChecked || '...'}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* === STATUS BAR === */}
      <div className={styles.statusBar}>
        <span className={styles.statusLabel}>{timezone.replace(/_/g, ' ')}</span>
        <span className={styles.statusLabel}>
          {allLive.length > 0
            ? `${allLive.length} channel${allLive.length > 1 ? 's' : ''} streaming now`
            : 'No channels currently live'}
        </span>
      </div>

      {/* === LIVE NOW CHANNELS === */}
      {allLive.length > 0 && (
        <>
          <div className={styles.guideHeader}>
            <span className={styles.guideLabel}>
              <span className={styles.liveDotSmall} /> Live Now
            </span>
          </div>
          <div className={styles.guideScroll}>
            {allLive.map((stream, i) => (
              <div
                key={i}
                className={`${styles.guideCard} ${styles.guideCardLive} ${activeVideo === stream.videoId ? styles.guideCardActive : ''}`}
                onClick={() => {
                  setActiveVideo(stream.videoId)
                  setActiveTitle(stream.title)
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
              >
                <div className={styles.guideThumb}>
                  {stream.thumbnail ? (
                    <img src={stream.thumbnail} alt={stream.channelName} className={styles.guideThumbImg} />
                  ) : (
                    <div className={styles.guideThumbPlaceholder}>
                      <span className={styles.guideThumbIcon}>☩</span>
                    </div>
                  )}
                  <span className={styles.guideLiveBadge}><span className={styles.liveDot} /> LIVE</span>
                </div>
                <div className={styles.guideInfo}>
                  <span className={styles.guideName}>{stream.title}</span>
                  <span className={styles.guideParish}>{stream.channelName}</span>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* === CHANNEL DIRECTORY LINK === */}
      <div className={styles.guideHeader}>
        <span className={styles.guideLabel}>Channel Guide</span>
        <a href="/masses" className={styles.browseAllLink}>Browse All {totalChannels}+ Channels →</a>
      </div>
      <p className={styles.guideNote}>
        Visit our full directory to find live-streaming Traditional Latin Masses from parishes and religious orders around the world.
      </p>
      <div className={styles.browseAllBox}>
        <a href="/masses" className={styles.browseAllButton}>
          ✠ Open Live Mass Directory
        </a>
      </div>
    </div>
  )
}
