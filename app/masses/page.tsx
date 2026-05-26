import styles from './page.module.css'
import Link from 'next/link'

const channels = {
  religious: [
    { name: 'Canons Regular of New Jerusalem', url: 'https://www.youtube.com/channel/UC9haz_LghUfO8Mp0HilRM1Q/live' },
    { name: 'Society of Saint Augustine', url: 'https://www.youtube.com/channel/UCSOfVkj3M3O5djD9C0Jw9QQ/live' },
    { name: 'Fraternity of Saint Vincent Ferrer', url: 'https://www.youtube.com/channel/UCAnKL0epa83Br5tZfTZD7Eg/live' },
    { name: 'Silverstream Priory, Ireland', url: 'https://www.youtube.com/channel/UCpnItyslD0BqEOYBbTRy35w/live' },
    { name: 'Transalpine Redemptorists', url: 'https://www.youtube.com/channel/UCC1VpC-qvCdYzexfY81fU1Q/live' },
    { name: 'Abbaye de Lagrasse, France', url: 'https://www.youtube.com/channel/UCY53AqHeZ3n3HgjttLdcBww/live' },
    { name: 'Kloster Maria Engelport', url: 'https://www.youtube.com/channel/UCVtxsZQ_o7S7kNCyFNtRHvQ/live' },
  ],
  fssp: [
    { name: 'FSSP Phoenix, AZ', url: 'https://www.youtube.com/channel/UC1nuBPRlL4Y-e6dsN_HQbOA/live' },
    { name: 'FSSP Kansas City', url: 'https://www.youtube.com/channel/UCDiftFDDgXrRDSIeffAtY4A/live' },
    { name: 'FSSP Sacramento, CA', url: 'https://www.youtube.com/channel/UCp3fLkScbe6hjEBncVk-EoA/live' },
    { name: 'FSSP Denver, CO', url: 'https://www.youtube.com/channel/UCowKIe4fG3k7UNUGX-6pvgg/live' },
    { name: 'FSSP Baltimore, MD', url: 'https://www.youtube.com/channel/UCItp3GIpTS67DvqOLuWuWig/live' },
    { name: 'FSSP Providence, RI', url: 'https://www.youtube.com/channel/UCKyyBg-7STnPDO_-oEQWY0g/live' },
    { name: 'FSSP Tacoma, WA', url: 'https://www.youtube.com/channel/UCGphbd3fgXviaxp5DjscYkw/live' },
    { name: 'FSSP Hampton Roads, VA', url: 'https://www.youtube.com/channel/UCy7sVkgogsfm3tBpWyNHhEQ/live' },
    { name: 'FSSP Ottawa, Canada', url: 'https://www.youtube.com/channel/UC-k7cYplIu_EGCi7iKsLwig/live' },
    { name: 'FSSP Rome', url: 'https://www.youtube.com/channel/UClAtfCutuTEauRbJIUCVlcA/live' },
    { name: 'FSSP Krakow, Poland', url: 'https://www.youtube.com/channel/UCYWH7ffSj122xg4FLC9bz_g/live' },
  ],
  icrss: [
    { name: 'ICRSS Chicago, IL', url: 'https://www.youtube.com/channel/UCBb7H5dkIrNjCmwBSwUX9Zw/live' },
    { name: 'ICRSS St. Louis, MO', url: 'https://www.youtube.com/channel/UCV59wZ51HxRpXVsF-zsXbGg/live' },
    { name: 'ICRSS Detroit, MI', url: 'https://www.youtube.com/channel/UCT-aKExUFTkWeTymsDXi_yA/live' },
    { name: 'ICRSS San Jose, CA', url: 'https://www.youtube.com/channel/UCP3UYnnLs9gPCnlpaeLm41A/live' },
    { name: 'ICRSS Limerick, Ireland', url: 'https://www.youtube.com/channel/UCHhWuGhHEo7HCEKJ1MObM9g/live' },
    { name: 'ICRSS Shrewsbury, Great Britain', url: 'https://www.youtube.com/channel/UCKec9U7C22wXtoKENiYQcNQ/live' },
  ],
  sspx: [
    { name: 'SSPX Seminary USA', url: 'https://www.youtube.com/channel/UCZoB5_BphShGRovMZ2AsG5A/live' },
    { name: 'SSPX Phoenix, AZ', url: 'https://www.youtube.com/channel/UCTvY1fvpD7jnT-uKEyuTSaw/live' },
    { name: 'Our Lady of Sorrows Priory, Phoenix, AZ', url: 'https://www.youtube.com/channel/UCHJ-3FHV4SaAApHUkpu1WWw/live' },
    { name: "SSPX Saint Mary's, KS", url: 'https://www.youtube.com/channel/UC7b-QQ7PbrZs6yAUdJkSL7w/live' },
    { name: 'SSPX Sanford, FL', url: 'https://www.youtube.com/channel/UC5AwyRmhCooK05cufOGAG1w/live' },
    { name: 'SSPX Los Angeles, CA', url: 'https://www.youtube.com/channel/UC9YlPkoxPrcjbqH6fL-sJ7g/live' },
    { name: 'SSPX Denver, CO', url: 'https://www.youtube.com/channel/UCwcR47Gy6U2StngG6FW9OEg/live' },
    { name: 'SSPX Toronto, Canada', url: 'https://www.youtube.com/channel/UC_W1sjtJTk7pE1j-EUbR5Tg/live' },
    { name: 'SSPX Paris, France', url: 'https://www.youtube.com/channel/UCGNiUjfJu2KOf71MKz86z7A/live' },
    { name: 'SSPX Great Britain', url: 'https://www.youtube.com/channel/UCQKWgHLZxKCmIIRmok8tNuw/live' },
    { name: 'SSPX Ireland', url: 'https://www.youtube.com/channel/UCWHw6qGmRaxwErJqdtqvOJQ/live' },
    { name: 'SSPX Poland', url: 'https://www.youtube.com/channel/UCMa2Tt8bO4WMtgGhHNT8SvQ/live' },
  ],
  diocesan: [
    { name: 'Shrine of St. Elizabeth of Hungary, Cleveland, OH', url: 'https://www.youtube.com/channel/UC-HuFJsZMy5CdwfXp9j-J0Q/live' },
    { name: 'Una Voce Quad Cities, Davenport, IA', url: 'https://www.youtube.com/channel/UCblrlrqAau4Co8zdNG05q-A/live' },
    { name: 'Schola Cantorum Miamiensis', url: 'https://www.youtube.com/channel/UCAmIjqfkWf6pW-14htSl2WA/live' },
    { name: 'Oxford Oratory', url: 'https://www.youtube.com/channel/UCZ6YQ4ZBs0fbeNPHl16YyFw/live' },
    { name: 'The Oratory, Birmingham, UK', url: 'https://www.youtube.com/channel/UCCd9cGbxpbLzjxqSsmiyznw/live' },
    { name: 'Toronto Oratory', url: 'https://www.youtube.com/channel/UCRRUmJAW2o_nh74VB3ijYxQ/live' },
    { name: 'St. Anne&apos;s, Perth, Australia', url: 'https://www.youtube.com/channel/UCaR8PNiIP4WFIbca2h4tOAw/live' },
    { name: 'Saints Peter and Paul, Wilmington, CA', url: 'https://www.youtube.com/channel/UCSLpi48jvqHTZjlwz7GI03w/live' },
  ],
}

export default function LiveMasses() {
  return (
    <main className={styles.page}>
      <div className={styles.watermark} />

      {/* Logo Banner */}
      <section className={styles.logoBanner}>
        <div className={styles.logoBannerInner}>
          <Link href="/">
            <img
              src="/logo.png"
              alt="Sacred Tradition Television"
              className={styles.logo}
            />
          </Link>
        </div>
      </section>

      {/* Header */}
      <section className={styles.header}>
        <div className={styles.sectionHeader}>
          <span className={styles.headerOrnament}>❧</span>
          <h1 className={styles.pageTitle}>Live Mass Directory</h1>
          <span className={styles.headerOrnamentFlip}>❧</span>
        </div>
        <p className={styles.pageSubtitle}>
          Live-streaming Traditional Latin Masses from around the world
        </p>
        <p className={styles.pageNote}>
          Click any link below to watch. When the channel is live, the stream will play automatically.
        </p>
      </section>

      {/* Religious Orders */}
      <section className={styles.directory}>
        <h2 className={styles.categoryTitle}>Religious Orders</h2>
        <div className={styles.channelGrid}>
          {channels.religious.map((ch, i) => (
            <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" className={styles.channelCard}>
              <span className={styles.channelIcon}>⛪</span>
              <span className={styles.channelName}>{ch.name}</span>
              <span className={styles.channelLive}>Watch Live →</span>
            </a>
          ))}
        </div>
      </section>

      {/* FSSP */}
      <section className={styles.directory}>
        <h2 className={styles.categoryTitle}>Fraternity of Saint Peter (FSSP)</h2>
        <div className={styles.channelGrid}>
          {channels.fssp.map((ch, i) => (
            <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" className={styles.channelCard}>
              <span className={styles.channelIcon}>⛪</span>
              <span className={styles.channelName}>{ch.name}</span>
              <span className={styles.channelLive}>Watch Live →</span>
            </a>
          ))}
        </div>
      </section>

      {/* ICRSS */}
      <section className={styles.directory}>
        <h2 className={styles.categoryTitle}>Institute of Christ the King (ICRSS)</h2>
        <div className={styles.channelGrid}>
          {channels.icrss.map((ch, i) => (
            <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" className={styles.channelCard}>
              <span className={styles.channelIcon}>⛪</span>
              <span className={styles.channelName}>{ch.name}</span>
              <span className={styles.channelLive}>Watch Live →</span>
            </a>
          ))}
        </div>
      </section>

      {/* SSPX */}
      <section className={styles.directory}>
        <h2 className={styles.categoryTitle}>Society of Saint Pius X (SSPX)</h2>
        <div className={styles.channelGrid}>
          {channels.sspx.map((ch, i) => (
            <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" className={styles.channelCard}>
              <span className={styles.channelIcon}>⛪</span>
              <span className={styles.channelName}>{ch.name}</span>
              <span className={styles.channelLive}>Watch Live →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Diocesan */}
      <section className={styles.directory}>
        <h2 className={styles.categoryTitle}>Diocesan &amp; Other Parishes</h2>
        <div className={styles.channelGrid}>
          {channels.diocesan.map((ch, i) => (
            <a key={i} href={ch.url} target="_blank" rel="noopener noreferrer" className={styles.channelCard}>
              <span className={styles.channelIcon}>⛪</span>
              <span className={styles.channelName}>{ch.name}</span>
              <span className={styles.channelLive}>Watch Live →</span>
            </a>
          ))}
        </div>
      </section>

      {/* Back link */}
      <section className={styles.backSection}>
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
