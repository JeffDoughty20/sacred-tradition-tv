import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.main}>
      {/* Decorative top border */}
      <div className={styles.topBorder} />

      {/* Hero section */}
      <section className={styles.hero}>
        <img
          src="/logo.png"
          alt="Sacred Tradition Television"
          className={styles.logo}
        />
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

      {/* Donation section */}
      <section className={styles.donation}>
        <div className={styles.donationCard}>
          <span className={styles.donationIcon}>✠</span>
          <h2 className={styles.donationTitle}>Support Our Mission</h2>
          <p className={styles.donationText}>
            Sacred Tradition TV is sustained entirely by the generosity of the faithful. 
            Your gift helps bring the Traditional Latin Mass and Catholic devotions to the 
            homebound, the isolated, and all who hunger for Tradition.
          </p>
          <p className={styles.donationText}>
            No amount is too small. Every dollar goes directly toward broadcasting the Faith.
          </p>
          <div className={styles.donationButtons}>
            <a
              href="https://buy.stripe.com/test_bJe5kD3Kt94v5SOfGA08g00"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.donateButton}
            >
              Make a Donation
            </a>
          </div>
          <p className={styles.donationNote}>
            Sacred Tradition Media, Inc. is a nonprofit organization dedicated to 
            bringing the Traditional Latin Mass to the faithful.
          </p>
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
