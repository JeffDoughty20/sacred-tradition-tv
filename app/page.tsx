import styles from './page.module.css'

export default function Home() {
  return (
    <main className={styles.page}>
      {/* Watermark background */}
      <div className={styles.watermark} />

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

      {/* Coming Soon banner */}
      <section className={styles.banner}>
        <span className={styles.bannerCross}>✠</span>
        <h2 className={styles.bannerTitle}>Coming Soon</h2>
        <p className={styles.bannerText}>
          Sacred Tradition TV is preparing to bring the beauty and reverence of the
          Traditional Latin Mass and timeless Catholic devotions directly into your home.
        </p>
      </section>

      {/* Mass Schedule */}
      <section className={styles.schedule}>
        <div className={styles.sectionHeader}>
          <span className={styles.headerLine} />
          <h2 className={styles.sectionTitle}>Daily Holy Mass</h2>
          <span className={styles.headerLine} />
        </div>
        <p className={styles.sectionSubtitle}>
          The Traditional Latin Mass, offered reverently and without interruption
        </p>
        <div className={styles.massGrid}>
          <div className={styles.massCard}>
            <div className={styles.massIcon}>☩</div>
            <h3 className={styles.massTime}>7:00 AM</h3>
            <p className={styles.massType}>Low Mass</p>
            <p className={styles.massDesc}>
              A quiet, contemplative offering of the Holy Sacrifice to begin the day in prayer
            </p>
          </div>
          <div className={styles.massCard}>
            <div className={styles.massIconHighlight}>☩</div>
            <h3 className={styles.massTime}>12:00 PM</h3>
            <p className={styles.massType}>Sung Mass</p>
            <p className={styles.massDesc}>
              The midday Missa Cantata with Gregorian propers and sacred polyphony
            </p>
          </div>
          <div className={styles.massCard}>
            <div className={styles.massIcon}>☩</div>
            <h3 className={styles.massTime}>6:00 PM</h3>
            <p className={styles.massType}>Solemn High Mass</p>
            <p className={styles.massDesc}>
              The full solemnity of the Traditional Rite with deacon, subdeacon, and sacred ministers
            </p>
          </div>
        </div>
        <p className={styles.scheduleNote}>
          All times Eastern · Schedule subject to change on Holy Days of Obligation
        </p>
      </section>

      {/* Daily Devotions */}
      <section className={styles.devotions}>
        <div className={styles.devotionsInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.headerLineLight} />
            <h2 className={styles.sectionTitleLight}>Sacred Devotions</h2>
            <span className={styles.headerLineLight} />
          </div>
          <div className={styles.devotionGrid}>
            <div className={styles.devotionCard}>
              <div className={styles.devotionIcon}>📿</div>
              <h3 className={styles.devotionTitle}>Daily Holy Rosary</h3>
              <p className={styles.devotionTime}>3:00 PM Eastern</p>
              <p className={styles.devotionDesc}>
                Join the faithful in praying the Most Holy Rosary of the Blessed Virgin Mary.
                The appropriate mysteries for each day with meditations and sacred music between decades.
              </p>
            </div>
            <div className={styles.devotionCard}>
              <div className={styles.devotionIcon}>♱</div>
              <h3 className={styles.devotionTitle}>Benediction &amp; Litanies</h3>
              <p className={styles.devotionTime}>Following Evening Mass</p>
              <p className={styles.devotionDesc}>
                Benediction of the Most Blessed Sacrament, Litany of the Saints,
                and traditional evening prayers of the Church.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gregorian Chant */}
      <section className={styles.chant}>
        <div className={styles.sectionHeader}>
          <span className={styles.headerLine} />
          <h2 className={styles.sectionTitle}>Gregorian Chant</h2>
          <span className={styles.headerLine} />
        </div>
        <p className={styles.chantSubtitle}>
          Sacred music to lift the mind and heart to God
        </p>
        <div className={styles.chantCard}>
          <div className={styles.chantNeumes}>♪ ♫ ♪ ♫ ♪</div>
          <p className={styles.chantText}>
            Between scheduled programming, Sacred Tradition TV streams the timeless beauty
            of Gregorian Chant — the proper liturgical music of the Roman Rite.
            Hymns, antiphons, and propers from the Church&apos;s treasury of sacred music,
            available around the clock for prayer, meditation, and spiritual reading.
          </p>
          <div className={styles.chantBadge}>
            Streaming 24/7
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
        <p className={styles.footerMotto}>
          <em>Ad Majorem Dei Gloriam</em>
        </p>
        <p className={styles.footerCopy}>
          &copy; 2026 Sacred Tradition Media, Inc.
        </p>
      </footer>
    </main>
  )
}
