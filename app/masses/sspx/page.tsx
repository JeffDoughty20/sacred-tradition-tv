import type { Metadata } from 'next'
import Link from 'next/link'
import styles from '../page.module.css'
import MassSchedule from '../../MassSchedule'
import { getSchedule, filterSchedule, ORDERS, CHANNEL_NAMES } from '../../lib/schedule'

export const revalidate = 900

const SSPX_IDS = ORDERS.sspx.ids

export const metadata: Metadata = {
  title: 'SSPX Live Mass Today — Watch Online | Sacred Tradition TV',
  description:
    'Watch SSPX Traditional Latin Mass live streams today from Society of Saint Pius X chapels, priories, and seminaries worldwide. Live, upcoming, and recorded SSPX Masses, Rosaries, and devotions in one place.',
  alternates: { canonical: '/masses/sspx' },
  openGraph: {
    title: 'SSPX Live Mass Today — Watch Online | Sacred Tradition TV',
    description:
      'Live and recorded Traditional Latin Masses from SSPX chapels and priories worldwide, updated throughout the day.',
    url: 'https://sacredtradition.tv/masses/sspx',
    siteName: 'Sacred Tradition TV',
    type: 'website',
    images: [{ url: '/logo.png' }],
  },
}

export default async function SspxPage() {
  const full = await getSchedule()
  const schedule = filterSchedule(full, SSPX_IDS)

  // Event structured data for upcoming SSPX streams with a scheduled start.
  const events = schedule.streams
    .filter((s) => s.startTime)
    .map((s) => ({
      '@context': 'https://schema.org',
      '@type': 'Event',
      name: s.title,
      startDate: s.startTime,
      eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
      eventStatus: 'https://schema.org/EventScheduled',
      location: {
        '@type': 'VirtualLocation',
        url: `https://www.youtube.com/watch?v=${s.videoId}`,
      },
      organizer: { '@type': 'Organization', name: s.channelName },
      image: s.thumbnail,
      isAccessibleForFree: true,
      description: `Live-streamed Traditional Latin Mass from ${s.channelName}, via Sacred Tradition TV.`,
    }))

  const breadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Sacred Tradition TV', item: 'https://sacredtradition.tv/' },
      { '@type': 'ListItem', position: 2, name: 'Live Mass Directory', item: 'https://sacredtradition.tv/masses' },
      { '@type': 'ListItem', position: 3, name: 'SSPX Live Mass', item: 'https://sacredtradition.tv/masses/sspx' },
    ],
  }

  return (
    <main className={styles.page}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {events.length > 0 && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(events) }} />
      )}

      <div className={styles.watermark} />

      {/* Logo Banner */}
      <section className={styles.logoBanner}>
        <div className={styles.logoBannerInner}>
          <Link href="/">
            <img src="/logo.png" alt="Sacred Tradition Television" className={styles.logo} />
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className={styles.header}>
        <div className={styles.sectionHeader}>
          <span className={styles.headerOrnament}>❧</span>
          <h1 className={styles.pageTitle}>SSPX Live Mass Today</h1>
          <span className={styles.headerOrnamentFlip}>❧</span>
        </div>
        <p className={styles.pageSubtitle}>
          Watch Traditional Latin Mass live streams from the Society of Saint Pius X
        </p>
        <p className={styles.pageNote}>
          Live, upcoming, and recently recorded Masses from SSPX chapels, priories, and
          seminaries in the United States, Canada, Great Britain, Ireland, France, and
          Poland. Sunday High Mass, daily Low Mass, the Holy Rosary, Vespers, and
          Benediction are streamed as each chapel goes live. Times shown are in your
          local time zone. Click any Mass to watch it here, or browse the chapel list
          below to visit a channel directly.
        </p>
      </section>

      {/* Schedule (SSPX only) */}
      <section className={styles.directory}>
        <MassSchedule initialData={schedule} channelIds={SSPX_IDS} />
      </section>

      {/* SSPX channel list */}
      <section className={styles.directory}>
        <h2 className={styles.categoryTitle}>SSPX Chapels &amp; Priories Streaming on YouTube</h2>
        <div className={styles.channelGrid}>
          {SSPX_IDS.map((id) => (
            <a
              key={id}
              href={`https://www.youtube.com/channel/${id}/live`}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelCard}
            >
              <span className={styles.channelIcon}>⛪</span>
              <span className={styles.channelName}>{CHANNEL_NAMES[id]}</span>
              <span className={styles.channelLive}>Watch Live →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Back links */}
      <section className={styles.backSection}>
        <Link href="/masses" className={styles.backLink}>
          ← Full Channel Directory
        </Link>
        <br />
        <Link href="/" className={styles.backLink}>
          ← Return to Sacred Tradition TV
        </Link>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerDivider}>
          <span className={styles.footerLine} />
          <span className={styles.footerCrossIcon}>✠</span>
          <span className={styles.footerLine} />
        </div>
        <p className={styles.footerMotto}><em>Ad Majorem Dei Gloriam</em></p>
        <p className={styles.footerCopy}>&copy; 2026 Sacred Tradition TV</p>
      </footer>
    </main>
  )
}
