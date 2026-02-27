import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Decorative top border */}
      <div className={styles.topBorder} />

      {/* Hero section */}
      <section className={styles.hero}>
        <div className={styles.cross}>✠</div>
        <h1 className={styles.title}>
          <span className={styles.titleSacred}>Sacred</span>
          <span className={styles.titleTradition}>Tradition</span>
          <span className={styles.titleTV}>.TV</span>
        </h1>
        <div className={styles.divider}>
          <span className={styles.dividerLine} />
          <span className={styles.dividerCross}>✦</span>
          <span className={styles.dividerLine} />
        </div>
        <p className={styles.tagline}>A Digital Chapel for the Faithful</p>
      </section>

      {/* Coming soon */}
      <section className={styles.content}>
        <div className={styles.card}>
          <h2 className={styles.cardTitle}>Coming Soon</h2>
          <p className={styles.cardText}>
            Sacred Tradition TV is preparing to bring the beauty and reverence of the 
            Traditional Latin Mass and timeless Catholic devotions directly into your home.
          </p>
          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>☩</span>
              <h3>Daily Holy Mass</h3>
              <p>The Traditional Latin Mass, offered reverently and without interruption</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>♱</span>
              <h3>Sacred Devotions</h3>
              <p>The Holy Rosary, Litanies, Benediction, and traditional prayers</p>
            </div>
            <div className={styles.feature}>
              <span className={styles.featureIcon}>♫</span>
              <h3>Gregorian Chant</h3>
              <p>Sacred music to lift the mind and heart to God</p>
            </div>
          </div>
        </div>
      </section>

      {/* Email signup */}
      <section className={styles.signup}>
        <p className={styles.signupText}>
          For the homebound, the isolated, and all the faithful who hunger for Tradition.
        </p>
        <p className={styles.signupCta}>
          Stay informed as we prepare to launch.
        </p>
        <a href="mailto:info@sacredtradition.tv" className={styles.emailLink}>
          info@sacredtradition.tv
        </a>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.footerCross}>✠</div>
        <p className={styles.footerText}>
          <em>Ad Majorem Dei Gloriam</em>
        </p>
        <p className={styles.footerOrg}>
          © {new Date().getFullYear()} Sacred Tradition Media, Inc.
        </p>
      </footer>

      {/* Decorative bottom border */}
      <div className={styles.bottomBorder} />
    </main>
  )
}
