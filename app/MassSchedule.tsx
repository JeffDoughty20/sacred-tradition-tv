'use client'

import { useState, useEffect, useCallback } from 'react'
import styles from './MassSchedule.module.css'
import type { ScheduleData, Stream, Recorded } from './lib/schedule'

const DEFAULT_CHANT_VIDEO = 't8X34t77c-U'

interface Props {
  // Server-fetched schedule, rendered into the HTML on first paint.
  initialData?: ScheduleData
  // When set, only show these channels (used by the order pages).
  channelIds?: readonly string[]
}

function applyFilter<T extends { channelId: string }>(items: T[], ids?: readonly string[]) {
  if (!ids) return items
  const keep = new Set(ids)
  return items.filter((i) => keep.has(i.channelId))
}

export default function MassSchedule({ initialData, channelIds }: Props) {
  const [streams, setStreams] = useState<Stream[]>(applyFilter(initialData?.streams ?? [], channelIds))
  const [recorded, setRecorded] = useState<Recorded[]>(applyFilter(initialData?.recorded ?? [], channelIds))
  const [recordedWeek, setRecordedWeek] = useState<Recorded[]>(applyFilter(initialData?.recordedWeek ?? [], channelIds))
  const [activeVideoId, setActiveVideoId] = useState<string>(DEFAULT_CHANT_VIDEO)
  const [activeTitle, setActiveTitle] = useState<string>('Gregorian Chant — Eucharistic Adoration')
  const [activeSub, setActiveSub] = useState<string>('Sacred Tradition Television')
  const [isLiveActive, setIsLiveActive] = useState(false)
  const [currentTime, setCurrentTime] = useState('')
  const [timezone, setTimezone] = useState('')
  const [lastChecked, setLastChecked] = useState('')
  const [mounted, setMounted] = useState(false)

  const fetchStreams = useCallback(async () => {
    try {
      const res = await fetch('/api/live')
      const data: ScheduleData = await res.json()
      if (data.streams) setStreams(applyFilter(data.streams, channelIds))
      if (data.recorded) setRecorded(applyFilter(data.recorded, channelIds))
      if (data.recordedWeek) setRecordedWeek(applyFilter(data.recordedWeek, channelIds))
      if (data.checkedAt) {
        setLastChecked(new Date(data.checkedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
      }
    } catch { /* keep what we have */ }
  }, [channelIds])

  useEffect(() => {
    setMounted(true)
    setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone)
    if (initialData?.checkedAt) {
      setLastChecked(new Date(initialData.checkedAt).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' }))
    }
    const update = () => setCurrentTime(new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }))
    update()
    const timeInt = setInterval(update, 30000)
    // Server data is fresh on load; first client refresh after 5 minutes.
    const fetchInt = setInterval(fetchStreams, 5 * 60 * 1000)
    return () => { clearInterval(timeInt); clearInterval(fetchInt) }
  }, [fetchStreams, initialData?.checkedAt])

  const play = (s: Stream) => {
    setActiveVideoId(s.videoId); setActiveTitle(s.title); setActiveSub(s.channelName); setIsLiveActive(s.isLive)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const playRecorded = (r: Recorded) => {
    setActiveVideoId(r.videoId); setActiveTitle(r.title); setActiveSub(r.channelName); setIsLiveActive(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  const playChant = () => {
    setActiveVideoId(DEFAULT_CHANT_VIDEO)
    setActiveTitle('Gregorian Chant — Eucharistic Adoration')
    setActiveSub('Sacred Tradition Television')
    setIsLiveActive(false)
  }

  const liveStreams = streams.filter((s) => s.isLive)
  const upcomingStreams = streams.filter((s) => !s.isLive)
  const liveCount = liveStreams.length

  // Time/date labels depend on the viewer's locale, so they render only after mount.
  const formatTime = (utc: string | null) => {
    if (!mounted || !utc) return ''
    try { return new Date(utc).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true }) } catch { return '' }
  }
  const formatDate = (utc: string | null) => {
    if (!mounted || !utc) return ''
    try {
      const d = new Date(utc); const now = new Date()
      if (d.toDateString() === now.toDateString()) return 'Today'
      const tomorrow = new Date(now); tomorrow.setDate(tomorrow.getDate() + 1)
      if (d.toDateString() === tomorrow.toDateString()) return 'Tomorrow'
      return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
    } catch { return '' }
  }
  const formatDay = (utc: string) => {
    if (!mounted || !utc) return ''
    try {
      const d = new Date(utc)
      const diffDays = Math.floor((Date.now() - d.getTime()) / 86400000)
      if (diffDays <= 6) return d.toLocaleDateString([], { weekday: 'long' })
      return d.toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })
    } catch { return '' }
  }

  const renderCard = (s: Stream, i: number) => {
    const isActive = activeVideoId === s.videoId
    return (
      <div key={s.videoId || i} className={`${styles.card} ${s.isLive ? styles.cardLive : ''} ${isActive ? styles.cardActive : ''}`} onClick={() => play(s)}>
        <div className={styles.cardThumb}>
          <img src={s.thumbnail} alt={s.title} className={styles.cardImg} />
          <div className={styles.cardOverlay}><span className={styles.cardPlay}>▶</span></div>
          {s.isLive ? (
            <span className={styles.cardLiveBadge}><span className={styles.liveDot} /> LIVE</span>
          ) : s.startTime ? (
            <span className={styles.cardTime}>{formatTime(s.startTime)}</span>
          ) : null}
          {!s.isLive && s.startTime && <span className={styles.cardDate}>{formatDate(s.startTime)}</span>}
        </div>
        <div className={styles.cardInfo}>
          <span className={styles.cardName}>{s.title}</span>
          <span className={styles.cardSub}>{s.channelName}</span>
        </div>
      </div>
    )
  }

  const renderRecordedCard = (r: Recorded, i: number, showDay: boolean) => {
    const isActive = activeVideoId === r.videoId
    return (
      <div key={r.videoId || i} className={`${styles.card} ${isActive ? styles.cardActive : ''}`} onClick={() => playRecorded(r)}>
        <div className={styles.cardThumb}>
          <img src={r.thumbnail} alt={r.title} className={styles.cardImg} />
          <div className={styles.cardOverlay}><span className={styles.cardPlay}>▶</span></div>
          <span className={styles.cardOnDemand}>Recorded</span>
          {showDay && r.publishedAt && <span className={styles.cardDate}>{formatDay(r.publishedAt)}</span>}
        </div>
        <div className={styles.cardInfo}>
          <span className={styles.cardName}>{r.title}</span>
          <span className={styles.cardSub}>{r.channelName}</span>
        </div>
      </div>
    )
  }

  const nothingYet = streams.length === 0 && recorded.length === 0 && recordedWeek.length === 0

  return (
    <div className={styles.wrapper}>
      {/* === TV SCREEN === */}
      <div className={styles.tvFrame}>
        <div className={styles.tvBar}>
          <div className={styles.tvBarLeft}>
            {isLiveActive
              ? <span className={styles.tvLiveBadge}><span className={styles.liveDot} /> LIVE</span>
              : <span className={styles.tvOnDemand}>♪ Adoration</span>}
          </div>
          <div className={styles.tvBarCenter}>{activeTitle}</div>
          <div className={styles.tvBarRight}>{currentTime}</div>
        </div>
        <div className={styles.tvScreen}>
          <iframe
            key={activeVideoId}
            src={`https://www.youtube.com/embed/${activeVideoId}?autoplay=1&rel=0&modestbranding=1`}
            title={activeTitle}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.tvIframe}
          />
        </div>
        <div className={styles.tvInfoBar}>
          <span className={styles.tvInfoName}>{activeTitle}</span>
          <span className={styles.tvInfoSub}>{activeSub}</span>
          {activeVideoId !== DEFAULT_CHANT_VIDEO && (
            <button className={styles.tvChantBtn} onClick={playChant}>♪ Chant</button>
          )}
        </div>
      </div>

      {/* === STATUS BAR === */}
      <div className={styles.statusBar}>
        <span className={styles.statusLabel}>{timezone ? timezone.replace(/_/g, ' ') : 'Local time'}</span>
        <span className={styles.statusLabel}>
          {liveCount > 0 ? `${liveCount} live now` : 'No live streams'} · Updated {lastChecked || '...'}
        </span>
      </div>

      {/* === ROW 1: LIVE NOW === */}
      {liveStreams.length > 0 && (
        <div className={styles.rowSection}>
          <div className={styles.rowHeader}>
            <span className={styles.rowIcon}><span className={styles.liveDotBig} /></span>
            <h3 className={styles.rowTitle}>Live Now</h3>
            <span className={styles.rowCount}>{liveStreams.length} streaming</span>
          </div>
          <div className={styles.rowScroll}>{liveStreams.map(renderCard)}</div>
        </div>
      )}

      {/* === ROW 2: UPCOMING === */}
      {upcomingStreams.length > 0 && (
        <div className={styles.rowSection}>
          <div className={styles.rowHeader}>
            <span className={styles.rowIcon}>☩</span>
            <h3 className={styles.rowTitle}>Upcoming Masses &amp; Devotions</h3>
            <span className={styles.rowCount}>{upcomingStreams.length} scheduled</span>
          </div>
          <div className={styles.rowScroll}>{upcomingStreams.map(renderCard)}</div>
        </div>
      )}

      {/* === ROW 3: GREGORIAN CHANT === */}
      <div className={styles.rowSection}>
        <div className={styles.rowHeader}>
          <span className={styles.rowIcon}>♪</span>
          <h3 className={styles.rowTitle}>Gregorian Chant &amp; Adoration</h3>
        </div>
        <div className={styles.rowScroll}>
          <div className={`${styles.card} ${activeVideoId === DEFAULT_CHANT_VIDEO ? styles.cardActive : ''}`} onClick={playChant}>
            <div className={styles.cardThumb}>
              <img src="/mass.png" alt="Gregorian Chant" className={styles.cardImg} />
              <div className={styles.cardOverlay}><span className={styles.cardPlay}>▶</span></div>
              <span className={styles.cardOnDemand}>Always On</span>
            </div>
            <div className={styles.cardInfo}>
              <span className={styles.cardName}>Gregorian Chant — Adoration</span>
              <span className={styles.cardSub}>Eucharistic Worship</span>
            </div>
          </div>
        </div>
      </div>

      {/* === ROW 4: TODAY'S RECORDED === */}
      {recorded.length > 0 && (
        <div className={styles.rowSection}>
          <div className={styles.rowHeader}>
            <span className={styles.rowIcon}>▶</span>
            <h3 className={styles.rowTitle}>Today&apos;s Recorded Masses</h3>
            <span className={styles.rowCount}>{recorded.length} available</span>
          </div>
          <div className={styles.rowScroll}>{recorded.map((r, i) => renderRecordedCard(r, i, false))}</div>
        </div>
      )}

      {/* === ROW 5: THIS WEEK === */}
      {recordedWeek.length > 0 && (
        <div className={styles.rowSection}>
          <div className={styles.rowHeader}>
            <span className={styles.rowIcon}>✠</span>
            <h3 className={styles.rowTitle}>This Week&apos;s Masses</h3>
            <span className={styles.rowCount}>{recordedWeek.length} available</span>
          </div>
          <div className={styles.rowScroll}>{recordedWeek.map((r, i) => renderRecordedCard(r, i, true))}</div>
        </div>
      )}

      {nothingYet && (
        <div className={styles.noStreams}>
          <p className={styles.noStreamsText}>Loading schedule...</p>
          <p className={styles.noStreamsSub}>Checking Latin Mass streams worldwide</p>
        </div>
      )}

      <div className={styles.browseAllBox}>
        <a href="/masses" className={styles.browseAllButton}>✠ Browse Full Channel Directory</a>
      </div>
    </div>
  )
}
