import styles from './page.module.css'

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

      {/* Coming Soon banner */}
      <section className={styles.banner}>
        <div className={styles.bannerBorder}>
          <span className={styles.bannerCross}>✠</span>
          <h2 className={styles.bannerTitle}>Coming Soon</h2>
          <p className={styles.bannerText}>
            Sacred Tradition TV is preparing to bring the beauty and reverence of the
            Traditional Latin Mass and timeless Catholic devotions directly into your home.
          </p>
        </div>
      </section>

      {/* Mass Schedule */}
      <section className={styles.schedule}>
        <div className={styles.sectionHeader}>
          <span className={styles.headerOrnament}>❧</span>
          <h2 className={styles.sectionTitle}>Daily Holy Mass</h2>
          <span className={styles.headerOrnamentFlip}>❧</span>
        </div>
        <p className={styles.sectionSubtitle}>
          The Traditional Latin Mass, offered reverently and without interruption
        </p>
        <div className={styles.massGrid}>
          <div className={styles.massCard}>
            <div className={styles.massCardAccent} />
            <div className={styles.massIcon}>☩</div>
            <h3 className={styles.massTime}>7:00 AM</h3>
            <div className={styles.massDivider} />
            <p className={styles.massType}>Low Mass</p>
            <p className={styles.massDesc}>
              A quiet, contemplative offering of the Holy Sacrifice to begin the day in prayer
            </p>
          </div>
          <div className={styles.massCard}>
            <div className={styles.massCardAccent} />
            <div className={styles.massIcon}>☩</div>
            <h3 className={styles.massTime}>9:00 AM</h3>
            <div className={styles.massDivider} />
            <p className={styles.massType}>Sung Mass</p>
            <p className={styles.massDesc}>
              The Missa Cantata with Gregorian propers and sacred polyphony
            </p>
          </div>
          <div className={styles.massCardFeatured}>
            <div className={styles.massCardAccentGold} />
            <div className={styles.massIconFeatured}>☩</div>
            <h3 className={styles.massTime}>12:00 PM</h3>
            <div className={styles.massDivider} />
            <p className={styles.massType}>Solemn High Mass</p>
            <p className={styles.massDesc}>
              The full solemnity of the Traditional Rite with deacon, subdeacon, and sacred ministers
            </p>
          </div>
        </div>
        <p className={styles.scheduleNote}>
          All times Eastern &middot; Schedule subject to change on Holy Days of Obligation
        </p>
      </section>

      {/* Today's Schedule */}
      <section className={styles.todaySchedule}>
        <div className={styles.sectionHeader}>
          <span className={styles.headerOrnament}>❧</span>
          <h2 className={styles.sectionTitle}>Today&apos;s Schedule</h2>
          <span className={styles.headerOrnamentFlip}>❧</span>
        </div>
        <p className={styles.sectionSubtitle}>
          Select a Mass or devotion to watch
        </p>
        <div className={styles.scheduleGrid}>
          <a href="https://www.youtube.com/channel/UC1nuBPRlL4Y-e6dsN_HQbOA/live" target="_blank" rel="noopener noreferrer" className={styles.scheduleCard}>
            <div className={styles.scheduleThumb}>
              <img src="https://i.ytimg.com/vi/9sdEb-5laaw/hqdefault.jpg" alt="Low Mass" className={styles.thumbImg} />
              <span className={styles.scheduleTime}>7:00 AM</span>
            </div>
            <div className={styles.scheduleInfo}>
              <h3 className={styles.scheduleName}>Low Mass</h3>
              <p className={styles.scheduleParish}>FSSP Phoenix, AZ</p>
            </div>
          </a>
          <a href="https://www.youtube.com/channel/UC-HuFJsZMy5CdwfXp9j-J0Q/live" target="_blank" rel="noopener noreferrer" className={styles.scheduleCard}>
            <div className={styles.scheduleThumb}>
              <img src="https://i.ytimg.com/vi/I3u0hzjGQMA/hqdefault.jpg" alt="Sung Mass" className={styles.thumbImg} />
              <span className={styles.scheduleTime}>9:00 AM</span>
            </div>
            <div className={styles.scheduleInfo}>
              <h3 className={styles.scheduleName}>Sung Mass</h3>
              <p className={styles.scheduleParish}>Shrine of St. Elizabeth, Cleveland</p>
            </div>
          </a>
          <a href="https://www.youtube.com/channel/UCBb7H5dkIrNjCmwBSwUX9Zw/live" target="_blank" rel="noopener noreferrer" className={styles.scheduleCard}>
            <div className={styles.scheduleThumb}>
              <img src="https://i.ytimg.com/vi/9sdEb-5laaw/hqdefault.jpg" alt="Solemn High Mass" className={styles.thumbImg} />
              <span className={styles.scheduleTime}>12:00 PM</span>
              <span className={styles.scheduleFeatured}>Featured</span>
            </div>
            <div className={styles.scheduleInfo}>
              <h3 className={styles.scheduleName}>Solemn High Mass</h3>
              <p className={styles.scheduleParish}>ICRSS Chicago, IL</p>
            </div>
          </a>
          <a href="https://www.youtube.com/channel/UCp3fLkScbe6hjEBncVk-EoA/live" target="_blank" rel="noopener noreferrer" className={styles.scheduleCard}>
            <div className={styles.scheduleThumb}>
              <img src="https://i.ytimg.com/vi/9sdEb-5laaw/hqdefault.jpg" alt="Rosary" className={styles.thumbImg} />
              <span className={styles.scheduleTime}>3:00 PM</span>
            </div>
            <div className={styles.scheduleInfo}>
              <h3 className={styles.scheduleName}>Holy Rosary</h3>
              <p className={styles.scheduleParish}>FSSP Sacramento, CA</p>
            </div>
          </a>
          <a href="https://www.youtube.com/channel/UCDiftFDDgXrRDSIeffAtY4A/live" target="_blank" rel="noopener noreferrer" className={styles.scheduleCard}>
            <div className={styles.scheduleThumb}>
              <img src="https://i.ytimg.com/vi/9sdEb-5laaw/hqdefault.jpg" alt="Evening Mass" className={styles.thumbImg} />
              <span className={styles.scheduleTime}>6:00 PM</span>
            </div>
            <div className={styles.scheduleInfo}>
              <h3 className={styles.scheduleName}>Evening Mass</h3>
              <p className={styles.scheduleParish}>FSSP Kansas City</p>
            </div>
          </a>
          <a href="/masses" className={styles.scheduleCardMore}>
            <div className={styles.moreIcon}>✠</div>
            <h3 className={styles.moreName}>Browse All</h3>
            <p className={styles.moreDesc}>43+ Live Mass Channels</p>
          </a>
        </div>
      </section>

      {/* Featured Stream */}
      <section className={styles.livestream}>
        <div className={styles.sectionHeader}>
          <span className={styles.headerOrnament}>❧</span>
          <h2 className={styles.sectionTitle}>Now Streaming</h2>
          <span className={styles.headerOrnamentFlip}>❧</span>
        </div>
        <p className={styles.sectionSubtitle}>
          Solemn High Mass &middot; 12:00 PM Eastern
        </p>
        <div className={styles.videoWrapper}>
          <iframe
            src="https://www.youtube.com/embed/9sdEb-5laaw"
            title="Solemn High Mass - Sacred Tradition TV"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className={styles.videoFrame}
          />
        </div>
        <p className={styles.streamNote}>
          Live from the altar &middot; Join us daily for the Holy Sacrifice of the Mass
        </p>
      </section>

      {/* Daily Devotions */}
      <section className={styles.devotions}>
        <div className={styles.devotionsInner}>
          <div className={styles.sectionHeader}>
            <span className={styles.headerOrnamentLight}>❧</span>
            <h2 className={styles.sectionTitleLight}>Sacred Devotions</h2>
            <span className={styles.headerOrnamentLightFlip}>❧</span>
          </div>
          <div className={styles.devotionGrid}>
            <div className={styles.devotionCard}>
              <div className={styles.devotionIcon}>📿</div>
              <h3 className={styles.devotionTitle}>Daily Holy Rosary</h3>
              <p className={styles.devotionTime}>3:00 PM Eastern</p>
              <div className={styles.devotionDivider} />
              <p className={styles.devotionDesc}>
                Join the faithful in praying the Most Holy Rosary of the Blessed Virgin Mary.
                The appropriate mysteries for each day with meditations and sacred music between decades.
              </p>
            </div>
            <div className={styles.devotionCard}>
              <div className={styles.devotionIcon}>♱</div>
              <h3 className={styles.devotionTitle}>Benediction &amp; Litanies</h3>
              <p className={styles.devotionTime}>Following Evening Mass</p>
              <div className={styles.devotionDivider} />
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
          <span className={styles.headerOrnament}>❧</span>
          <h2 className={styles.sectionTitle}>Gregorian Chant</h2>
          <span className={styles.headerOrnamentFlip}>❧</span>
        </div>
        <p className={styles.sectionSubtitle}>
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
            ✦ Streaming 24/7 ✦
          </div>
        </div>
      </section>

      {/* Donation section */}
      <section className={styles.donation}>
        <div className={styles.donationCard}>
          <span className={styles.donationIcon}>✠</span>
          <h2 className={styles.donationTitle}>Support Our Mission</h2>
          <div className={styles.donationDividerLine} />
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
        <div className={styles.footerDivider}>
          <span className={styles.footerLine} />
          <span className={styles.footerCrossIcon}>✠</span>
          <span className={styles.footerLine} />
        </div>
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
