import styles from './page.module.css'
import MassSchedule from './MassSchedule'
import { getSchedule } from './lib/schedule'

// Re-render on the server at most every 15 minutes, so Google (and the first
// paint for visitors) always gets a real schedule in the HTML.
export const revalidate = 900

// ---------------------------------------------------------------------------
// MISSION PROGRESS — update these by hand as gifts come in, then push.
// ---------------------------------------------------------------------------
const GOAL = 5000          // Roku channel build + publish
const RAISED = 25          // total received so far (one-time + monthly to date)
const MEMBERS = 1          // active Founding Members

const MONTHLY_LINK = 'https://buy.stripe.com/14A6oH3Gz2V53UR66ndjO01'
const ONE_TIME_LINK = 'https://donate.stripe.com/28EeVdfphanxfDzdyPdjO00'

export default async function Home() {
  const schedule = await getSchedule()
  const pct = Math.min(100, Math.round((RAISED / GOAL) * 100))

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
          <p className={styles.taglineSecondary}>
            Watch live Traditional Latin Masses, Gregorian chant adoration, and
            Catholic devotions streamed daily from faithful parishes worldwide.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className={styles.mission}>
        <div className={styles.missionCard}>
          <span className={styles.missionIcon}>✠</span>
          <h2 className={styles.missionTitle}>Our Mission: Bring the Latin Mass to the Television</h2>
          <div className={styles.missionDivider} />

          <p className={styles.missionText}>
            For many of the homebound, the elderly, and the sick, opening a website
            on a phone is hard. Turning on the TV is not. Sacred Tradition TV exists
            to put the Traditional Latin Mass on the living-room screen &mdash; a
            Roku channel first, then Apple TV and Fire TV.
          </p>

          <p className={styles.missionText}>
            <strong>Where we stand.</strong> Live since May 2026. Over 500 of the
            faithful found us through Google last quarter. {MEMBERS === 1 ? 'One has' : `${MEMBERS} have`} given.
            The Roku channel will cost about ${GOAL.toLocaleString()} to build and
            publish. Forty people giving $10 a month would fund it inside a year.
          </p>

          <div className={styles.progress} role="progressbar" aria-valuemin={0} aria-valuemax={GOAL} aria-valuenow={RAISED}>
            <div className={styles.progressTrack}>
              <div className={styles.progressFill} style={{ width: `${Math.max(pct, 1)}%` }} />
            </div>
            <div className={styles.progressLabels}>
              <span>${RAISED.toLocaleString()} of ${GOAL.toLocaleString()} raised</span>
              <span>{MEMBERS} Founding {MEMBERS === 1 ? 'Member' : 'Members'}</span>
            </div>
          </div>

          <div className={styles.missionButtons}>
            <a href={MONTHLY_LINK} target="_blank" rel="noopener noreferrer" className={styles.missionPrimary}>
              Become a Founding Member &middot; $10/month
            </a>
            <a href={ONE_TIME_LINK} target="_blank" rel="noopener noreferrer" className={styles.missionSecondary}>
              Give once
            </a>
          </div>

          <p className={styles.missionNote}>
            Sacred Tradition TV is a project of G3AI Platform LLC. Contributions are
            not tax-deductible at this time. Monthly gifts can be cancelled any time.
          </p>
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
        <p className={styles.sectionIntro}>
          Sacred Tradition TV aggregates live and recorded Traditional Latin Mass
          streams from over forty faithful Catholic parishes, religious orders,
          and seminaries around the world &mdash; including the{' '}
          <a href="/masses/sspx">SSPX</a>, <a href="/masses/fssp">FSSP</a>,{' '}
          <a href="/masses/icrss">ICRSS</a>, Canons Regular, Transalpine
          Redemptorists, and diocesan communities. Watch the Sunday Latin Mass,
          daily Mass, sung Vespers, the Holy Rosary, Eucharistic Adoration, and
          traditional devotions whenever you cannot be physically present at your
          parish.
        </p>
        <MassSchedule initialData={schedule} />
      </section>

      {/* Donation section */}
      <section className={styles.donation}>
        <div className={styles.donationCard}>
          <span className={styles.donationIcon}>✠</span>
          <h2 className={styles.donationTitle}>Support Our Mission</h2>
          <div className={styles.donationDividerLine} />
          <p className={styles.donationText}>
            Sacred Tradition TV is sustained by the generosity of the faithful. Every
            dollar goes toward broadcasting the Faith &mdash; and toward the Roku
            channel that will bring the Latin Mass to the living-room television.
          </p>
          <div className={styles.donationButtons}>
            <a
              href={MONTHLY_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.donateButton}
            >
              Give $10 a Month
            </a>
            <a
              href={ONE_TIME_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.donateButtonOutline}
            >
              Give Once
            </a>
          </div>
          <p className={styles.donationNote}>
            Contributions are not tax-deductible at this time.
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
          &copy; 2026 Sacred Tradition TV
        </p>
      </footer>
    </main>
  )
}
