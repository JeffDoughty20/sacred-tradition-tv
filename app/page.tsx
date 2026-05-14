import styles from './page.module.css'
import MassSchedule from './MassSchedule'

export default function Home() {
  return (
    <main className={styles.page}>
      {/* Watermark background */}
      <div className={styles.watermark} />

      {/* Logo Banner */}
      <section className={styles.logoBanner}>
        <div className={styles.logoBannerInner}>
          <img
            src="/logo.png"
            alt="Sacred Tradition Television"
            className={styles.logo}
          />
        </div>
      </section>

      {/* Mass Hero Image */}
      <section className={styles.massHero}>
        <div className={styles.massOverlay} />
        <div className={styles.massContent}>
          <p className={styles.tagline}>A Digital Chapel for the Faithful</p>
        </div>
      </section>

      {/* Mass Schedule */}
      <section className={styles.schedule}>
        <div className={styles.sectionHeader}>
          <span className={styles.headerOrnament}>❧</span>
          <h2 className={styles.sectionTitle}>Daily Mass &amp; Devotions</h2>
          <span className={styles.headerOrnamentFlip}>❧</span>
        </div>
        <p className={styles.sectionSubtitle}>
          The Traditional Latin Mass &middot; Click any Mass to watch live
        </p>
        <MassSchedule />
      </section>

      {/* Donation section */}
      <section className={styles.donation}>
        <div className={styles.donationCard}>
          <span className={styles.donationIcon}>✠</span>
          <h2 className={styles.donationTitle}>Support Our Mission</h2>
          <div className={styles.donationDividerLine} />
          <p className={styles.donationText}>
            Sacred Tradition TV is sustained by the generosity of the faithful.
            Your support helps bring the Traditional Latin Mass and Catholic devotions to the
            homebound, the isolated, and all who hunger for Tradition.
          </p>
          <p className={styles.donationText}>
            No amount is too small. Every dollar goes directly toward broadcasting the Faith.
          </p>
          <div className={styles.donationButtons}>
            <a
              href="https://donate.stripe.com/28EeVdfphanxfDzdyPdjO00"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.donateButton}
            >
              Make a Donation
            </a>
          </div>
          <p className={styles.donationNote}>
            Sacred Tradition TV is dedicated to bringing the Traditional Latin Mass
            to the faithful. Your support helps keep Traditional Latin Mass streams
            accessible to faithful Catholics worldwide. Contributions are not
            tax-deductible at this time.
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
        <div className={styles.footerDivider}>
          <span className={styles.footerLine} />
          <span className={styles.footerCrossIcon}>✠</span>
          <span className={styles.footerLine} />
        </div>
        <p className={styles.footerMotto}>
          <em>Ad Majorem Dei Gloriam</em>
        </p>
        <p className={styles.footerCopy}>
          &copy; 2026 Sacred Tradition TV &middot; A project of G3AI Platform LLC
        </p>
      </footer>
    </main>
  )
}
