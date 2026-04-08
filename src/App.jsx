import { Routes, Route, Link, useLocation } from 'react-router-dom'
import DocViewer from './DocViewer'

const docs = [
  {
    title: 'Operating Framework',
    route: '/operating-framework',
    file: 'Wonderly_Operating_Framework.html',
    tag: 'Operations',
    tagColor: '#d4a84a',
    tagBg: '#281e0a',
    emoji: '⚙️',
    desc: 'The full operating framework — roles, responsibilities, team structure, delivery model, and how the org runs day to day.',
    audience: 'Full Leadership Team',
    category: 'core_operating_docs',
    status: 'active',
    sensitivity: 'internal',
    owner: 'Leadership Team',
    reviewed: 'March 2026',
  },
  {
    title: 'Strategic Operating Brief',
    route: '/strategic-brief',
    file: 'Wonderly_Strategic_Operating_Brief.html',
    tag: 'Strategy',
    tagColor: '#70a8d8',
    tagBg: '#081828',
    emoji: '🧭',
    desc: 'Full operating model — org structure, two delivery tracks, discipline leads, scorecards, financial targets from $1.1M to $3M, hiring roadmap.',
    audience: 'Full Leadership Team',
    category: 'core_operating_docs',
    status: 'active',
    sensitivity: 'internal',
    owner: 'Leadership Team',
    reviewed: 'March 2026',
  },
  {
    title: 'A Natural Growth Guide',
    route: '/growth-guide',
    file: 'Wonderly_Natural_Growth_Guide.html',
    tag: 'Philosophy',
    tagColor: '#90c870',
    tagBg: '#0c1c06',
    emoji: '🍄',
    desc: 'What slime molds, mycelial networks, and natural systems teach us about building Wonderly. Every fungi principle mapped to org structure and growth.',
    audience: 'Full Leadership Team',
    category: 'core_operating_docs',
    status: 'reference',
    sensitivity: 'internal',
    owner: 'Leadership Team',
    reviewed: 'March 2026',
  },
  {
    title: 'Brand Intensity Audit',
    route: '/brand-audit',
    file: 'Wonderly_Brand_Intensity_Audit.html',
    tag: 'Brand',
    tagColor: '#c0a0e8',
    tagBg: '#180c30',
    emoji: '🔥',
    desc: 'The five-step Brand Intensity Process — what to cut, what to keep, how to intensify the owned-platform conviction, and voice rules for both tracks.',
    audience: 'Allie · Taylor · Tori · Maria',
    category: 'core_operating_docs',
    status: 'reference',
    sensitivity: 'internal',
    owner: 'Brand Leadership',
    reviewed: 'March 2026',
  },
  {
    title: 'Keys to Content Marketing',
    route: '/content-marketing',
    file: 'Wonderly_Keys_to_Content_Marketing.html',
    tag: 'Content',
    tagColor: '#e8d5a0',
    tagBg: '#281e0a',
    emoji: '🔑',
    desc: 'Four content pillars, funnel logic, channel strategy, service experience moments, culture content for hiring, and operating cadence.',
    audience: 'Tori · Allie · Adam · Maria',
    category: 'core_operating_docs',
    status: 'reference',
    sensitivity: 'internal',
    owner: 'Marketing Leadership',
    reviewed: 'March 2026',
  },
  {
    title: 'Leadership Brief',
    route: '/leadership-brief',
    file: 'Wonderly_Leadership_Brief.html',
    tag: 'Leadership',
    tagColor: '#a8b8d0',
    tagBg: '#0c1420',
    emoji: '🏛',
    desc: 'Working guide to leadership principles, communication standards, and how the leadership team operates together.',
    audience: 'Discipline Leads · Account Leads',
    category: 'core_operating_docs',
    status: 'active',
    sensitivity: 'internal',
    owner: 'Leadership Team',
    reviewed: 'March 2026',
  },
  {
    title: 'Q2 2026 Quarterly Review',
    route: '/quarterly-review',
    file: 'Wonderly_Q2_Quarterly_Review.html',
    tag: 'Q2 2026',
    tagColor: '#3d9098',
    tagBg: '#0a2628',
    emoji: '📋',
    desc: 'Meeting synthesis + document audit from April 3. Decisions made, action items, concepts agreed, alignment confirmed, and gaps identified across the full doc suite.',
    audience: 'Adam · Allie · Camila',
    category: 'reviews_and_audits',
    status: 'point_in_time',
    sensitivity: 'restricted',
    owner: 'Leadership Team',
    reviewed: 'April 2026',
  },
  {
    title: "Camila's Findings vs The Artifacts",
    route: '/camila-review',
    file: 'Camila_vs_Artifacts_Review.html',
    tag: 'Review',
    tagColor: '#e88860',
    tagBg: '#200c06',
    emoji: '★',
    desc: 'Where Camila\'s first-week diagnosis aligns with the strategy documents, where the gaps are, and what the artifacts know that needs to be received.',
    audience: 'Adam · Allie · Camila',
    category: 'reviews_and_audits',
    status: 'point_in_time',
    sensitivity: 'restricted',
    owner: 'Leadership Team',
    reviewed: 'March 2026',
  },
  {
    title: "A Note on Where We're Headed",
    route: '/founder-brief',
    file: 'Wonderly_Founder_Brief_For_Team.html',
    tag: 'Team Brief',
    tagColor: '#90c870',
    tagBg: '#0c1c06',
    emoji: '💌',
    desc: 'From Adam and Allie — what founder specialization means, what to expect from each founder, what we ask from each role, and what we commit in return.',
    audience: 'Full Team',
    category: 'team_communications',
    status: 'internal_memo',
    sensitivity: 'internal',
    owner: 'Adam + Allie',
    reviewed: 'March 2026',
  },
  {
    title: 'Adam — The Role Only You Can Play',
    route: '/adam-brief',
    file: 'Adam_Personal_Operating_Brief.html',
    tag: 'Personal',
    tagColor: '#e88860',
    tagBg: '#200c06',
    emoji: '🧿',
    desc: 'What to protect, what to stop, what to do excellently, and what to let go of. The operating quadrant, weekly rhythm, and drift signals to catch early.',
    audience: 'Adam · Confidential',
    category: 'founder_and_personal_briefs',
    status: 'personal',
    sensitivity: 'confidential',
    owner: 'Adam',
    reviewed: 'March 2026',
  },
]

const categoryOrder = [
  'core_operating_docs',
  'reviews_and_audits',
  'team_communications',
  'founder_and_personal_briefs',
]

const categoryLabels = {
  core_operating_docs: 'Core Operating Docs',
  reviews_and_audits: 'Reviews & Audits',
  team_communications: 'Team Communications',
  founder_and_personal_briefs: 'Founder / Personal Briefs',
}

const statusLabels = {
  active: 'Active',
  reference: 'Reference',
  point_in_time: 'Point-in-time',
  internal_memo: 'Internal memo',
  personal: 'Personal',
}

const sensitivityLabels = {
  internal: 'Internal',
  restricted: 'Restricted',
  confidential: 'Confidential',
}

const statusStyles = {
  active: { color: '#8fd19e', bg: '#0d2012' },
  reference: { color: '#9ab8d6', bg: '#0b1828' },
  point_in_time: { color: '#d7b27a', bg: '#24170b' },
  internal_memo: { color: '#b7c98c', bg: '#16210d' },
  personal: { color: '#e88860', bg: '#200c06' },
}

const sensitivityStyles = {
  internal: { color: '#d4a84a', bg: '#281e0a' },
  restricted: { color: '#e8c170', bg: '#2a1808' },
  confidential: { color: '#f09a8c', bg: '#2a0d0a' },
}

const statusPriority = {
  active: 1,
  reference: 2,
  point_in_time: 3,
  internal_memo: 4,
  personal: 5,
}

function Pill({ label, styles }) {
  return (
    <span style={{
      fontSize: '9px',
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      fontWeight: 600,
      padding: '4px 8px',
      borderRadius: '999px',
      display: 'inline-block',
      background: styles.bg,
      color: styles.color,
      whiteSpace: 'nowrap',
    }}>
      {label}
    </span>
  )
}

function Nav() {
  const location = useLocation()

  return (
    <nav style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(14, 12, 8, 0.94)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(240, 234, 216, 0.08)',
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      overflowX: 'auto',
      scrollbarWidth: 'none',
    }}>
      <Link to="/" style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: '18px',
        fontWeight: 600,
        color: '#d4a84a',
        textDecoration: 'none',
        marginRight: '28px',
        flexShrink: 0,
        padding: '14px 0',
      }}>
        TWJ
      </Link>
      {docs.map((doc) => {
        const isActive = location.pathname === doc.route
        return (
          <Link key={doc.route} to={doc.route} style={{
            color: isActive ? '#d4a84a' : 'rgba(240, 234, 216, 0.45)',
            textDecoration: 'none',
            fontSize: '11px',
            letterSpacing: '0.06em',
            padding: '16px 12px',
            borderBottom: isActive ? '2px solid #d4a84a' : '2px solid transparent',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}>
            {doc.title.length > 22 ? doc.title.slice(0, 22) + '…' : doc.title}
          </Link>
        )
      })}
    </nav>
  )
}

function Section({ title, children }) {
  return (
    <section style={{ maxWidth: '1100px', margin: '0 auto 28px', padding: '0 48px' }}>
      <div style={{
        fontSize: '11px',
        letterSpacing: '0.18em',
        textTransform: 'uppercase',
        color: 'rgba(240, 234, 216, 0.38)',
        marginBottom: '14px',
      }}>
        {title}
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
        gap: '12px',
      }}>
        {children}
      </div>
    </section>
  )
}

function Home() {
  const grouped = categoryOrder.map((category) => {
    const items = docs
      .filter((doc) => doc.category === category)
      .sort((a, b) => statusPriority[a.status] - statusPriority[b.status])
    return [category, items]
  })

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #131008 0%, #1a1610 40%, #131008 100%)',
      color: '#f0ead8',
    }}>
      <div style={{ textAlign: 'center', padding: '84px 32px 28px' }}>
        <span style={{
          fontSize: '56px',
          display: 'block',
          marginBottom: '24px',
          filter: 'drop-shadow(0 0 20px rgba(212, 168, 74, 0.3))',
        }}>
          ✦
        </span>
        <h1 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: '52px',
          fontWeight: 300,
          lineHeight: 1.1,
          color: '#f0ead8',
          marginBottom: '12px',
        }}>
          Wonderly <em style={{ color: '#d4a84a' }}>Operating</em><br />Document Hub
        </h1>
        <p style={{
          fontSize: '13px',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'rgba(240, 234, 216, 0.4)',
          marginBottom: '8px',
        }}>
          Documents with context, ownership, and intent
        </p>
        <p style={{
          fontSize: '15px',
          color: 'rgba(240, 234, 216, 0.58)',
          maxWidth: '640px',
          margin: '0 auto',
          lineHeight: 1.7,
          fontWeight: 300,
        }}>
          This hub distinguishes between current operating guidance, point-in-time reviews, internal team communications, and founder-specific materials.
        </p>
      </div>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 48px 28px' }}>
        <div style={{
          background: 'rgba(240, 234, 216, 0.04)',
          border: '1px solid rgba(240, 234, 216, 0.08)',
          borderRadius: '8px',
          padding: '18px 20px',
          display: 'grid',
          gap: '8px',
          marginBottom: '28px',
        }}>
          <div style={{
            fontSize: '11px',
            letterSpacing: '0.16em',
            textTransform: 'uppercase',
            color: '#d4a84a',
          }}>
            Reading guide
          </div>
          <div style={{ fontSize: '14px', color: 'rgba(240, 234, 216, 0.72)', lineHeight: 1.7 }}>
            <strong>Active</strong> documents should be treated as current operating guidance. <strong>Point-in-time</strong> reviews capture a specific meeting or audit and should not be treated as evergreen source of truth. <strong>Confidential</strong> documents are flagged for restricted audience and higher sensitivity.
          </div>
        </div>
      </div>

      {grouped.map(([category, items]) => (
        <Section key={category} title={categoryLabels[category]}>
          {items.map((doc) => {
            const isActive = doc.status === 'active'
            const cardBorder = isActive ? '1px solid rgba(143, 209, 158, 0.34)' : '1px solid rgba(240, 234, 216, 0.08)'
            const cardShadow = isActive ? '0 0 0 1px rgba(143, 209, 158, 0.08) inset' : 'none'
            const cardOpacity = doc.status === 'point_in_time' ? 0.9 : 1

            return (
              <Link
                key={doc.route}
                to={doc.route}
                style={{
                  background: '#1c1a16',
                  border: cardBorder,
                  boxShadow: cardShadow,
                  borderRadius: '8px',
                  padding: '24px 24px 20px',
                  textDecoration: 'none',
                  color: 'inherit',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'background 0.15s, border-color 0.15s, transform 0.1s',
                  opacity: cardOpacity,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#24201a'
                  e.currentTarget.style.borderColor = '#d4a84a'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#1c1a16'
                  e.currentTarget.style.borderColor = isActive ? 'rgba(143, 209, 158, 0.34)' : 'rgba(240, 234, 216, 0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
                  <Pill label={doc.tag} styles={{ color: doc.tagColor, bg: doc.tagBg }} />
                  <Pill label={statusLabels[doc.status]} styles={statusStyles[doc.status]} />
                  <Pill label={sensitivityLabels[doc.sensitivity]} styles={sensitivityStyles[doc.sensitivity]} />
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '22px', flexShrink: 0 }}>{doc.emoji}</span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '22px',
                    fontWeight: 400,
                    color: '#f0ead8',
                    lineHeight: 1.2,
                  }}>
                    {doc.title}
                  </span>
                </div>
                <p style={{
                  fontSize: '13px',
                  color: 'rgba(240, 234, 216, 0.5)',
                  lineHeight: 1.65,
                  fontWeight: 300,
                  marginBottom: '16px',
                  flex: 1,
                }}>
                  {doc.desc}
                </p>
                <div style={{
                  display: 'grid',
                  gap: '6px',
                  borderTop: '1px solid rgba(240, 234, 216, 0.06)',
                  paddingTop: '10px',
                  marginTop: 'auto',
                }}>
                  <div style={{
                    fontSize: '10px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'rgba(240, 234, 216, 0.26)',
                  }}>
                    {doc.audience}
                  </div>
                  <div style={{ fontSize: '11px', color: 'rgba(240, 234, 216, 0.42)' }}>
                    Owner: {doc.owner} · Reviewed: {doc.reviewed}
                  </div>
                </div>
              </Link>
            )
          })}
        </Section>
      ))}
      <div style={{ height: '40px' }} />
    </div>
  )
}

export default function App() {
  return (
    <div style={{ background: '#0e0c08', minHeight: '100vh' }}>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        {docs.map((doc) => (
          <Route key={doc.route} path={doc.route} element={<DocViewer doc={doc} />} />
        ))}
      </Routes>
    </div>
  )
}
