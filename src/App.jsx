import { Routes, Route, Link, useLocation } from 'react-router-dom'
import DocViewer from './DocViewer'

const docs = [
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
  },
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
  },
  {
    title: 'Keys to Content Marketing',
    route: '/content-marketing',
    file: 'Wonderly_Keys_to_Content_Marketing.html',
    tag: 'Content',
    tagColor: '#e8d5a0',
    tagBg: '#281e0a',
    emoji: '🔑',
    desc: 'Four content pillars, funnel logic, channel strategy (owned first), service experience moments, culture content for hiring, and operating cadence.',
    audience: 'Tori · Allie · Adam · Maria',
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
  },
  {
    title: 'Leadership Brief',
    route: '/leadership-brief',
    file: 'Wonderly_Leadership_Brief.html',
    tag: 'Leadership',
    tagColor: '#a8b8d0',
    tagBg: '#0c1420',
    emoji: '🏛',
    desc: 'Working guide to leadership principles, communication standards, and how the leadership team operates together — for discipline and account leads.',
    audience: 'Discipline Leads · Account Leads',
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
  },
  {
    title: 'Talent & Trade — Internal Memo',
    route: '/talent-trade',
    file: 'Wonderly_Talent_Trade_Memo.html',
    tag: 'Team Memo',
    tagColor: '#90c870',
    tagBg: '#0c1c06',
    emoji: '↔️',
    desc: 'Internal framework for understanding Wonderly’s two client types: Talent and Trade. Clarifies how we think, route work, and structure responsibilities.',
    audience: 'Full Team',
  },
]

function Nav() {
  const location = useLocation()

  const navStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(14, 12, 8, 0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(240, 234, 216, 0.08)',
    padding: '0 32px',
    display: 'flex',
    alignItems: 'center',
    gap: '0',
    overflowX: 'auto',
    scrollbarWidth: 'none',
  }

  const logoStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '18px',
    fontWeight: 600,
    color: '#d4a84a',
    textDecoration: 'none',
    marginRight: '32px',
    flexShrink: 0,
    padding: '14px 0',
  }

  return (
    <nav style={navStyle}>
      <Link to="/" style={logoStyle}>TWJ</Link>
      {docs.map((doc) => {
        const isActive = location.pathname === doc.route
        return (
          <Link
            key={doc.route}
            to={doc.route}
            style={{
              color: isActive ? '#d4a84a' : 'rgba(240, 234, 216, 0.45)',
              textDecoration: 'none',
              fontSize: '11px',
              letterSpacing: '0.06em',
              padding: '16px 14px',
              borderBottom: isActive ? '2px solid #d4a84a' : '2px solid transparent',
              whiteSpace: 'nowrap',
              transition: 'color 0.15s, border-color 0.15s',
              flexShrink: 0,
            }}
          >
            {doc.title.length > 22 ? doc.title.slice(0, 22) + '…' : doc.title}
          </Link>
        )
      })}
    </nav>
  )
}

function Home() {
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #131008 0%, #1a1610 40%, #131008 100%)',
    color: '#f0ead8',
  }

  const heroStyle = {
    textAlign: 'center',
    padding: '100px 32px 60px',
  }

  const emojiStyle = {
    fontSize: '56px',
    display: 'block',
    marginBottom: '24px',
    filter: 'drop-shadow(0 0 20px rgba(212, 168, 74, 0.3))',
  }

  const h1Style = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '52px',
    fontWeight: 300,
    lineHeight: 1.1,
    color: '#f0ead8',
    marginBottom: '12px',
  }

  const subtitleStyle = {
    fontSize: '13px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: 'rgba(240, 234, 216, 0.4)',
    marginBottom: '8px',
  }

  const descStyle = {
    fontSize: '15px',
    color: 'rgba(240, 234, 216, 0.5)',
    maxWidth: '520px',
    margin: '0 auto',
    lineHeight: 1.7,
    fontWeight: 300,
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
    gap: '3px',
    padding: '0 48px 100px',
    maxWidth: '1100px',
    margin: '0 auto',
  }

  return (
    <div style={containerStyle}>
      <div style={heroStyle}>
        <span style={emojiStyle}>✦</span>
        <h1 style={h1Style}>Wonderly <em style={{ color: '#d4a84a' }}>Operating</em><br />Document Hub</h1>
        <p style={subtitleStyle}>2026 Strategic Documents</p>
        <p style={descStyle}>
          Strategic documents, operating briefs, brand frameworks, and alignment reviews for the Wonderly leadership team.
        </p>
      </div>
      <div style={gridStyle}>
        {docs.map((doc) => (
          <Link
            key={doc.route}
            to={doc.route}
            style={{
              background: '#1c1a16',
              border: '1px solid rgba(240, 234, 216, 0.06)',
              borderRadius: '4px',
              padding: '28px 28px 24px',
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              flexDirection: 'column',
              gap: '0',
              transition: 'background 0.15s, border-color 0.15s, transform 0.1s',
              position: 'relative',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#2a2620'
              e.currentTarget.style.borderColor = '#d4a84a'
              e.currentTarget.style.transform = 'translateY(-2px)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#1c1a16'
              e.currentTarget.style.borderColor = 'rgba(240, 234, 216, 0.06)'
              e.currentTarget.style.transform = 'translateY(0)'
            }}
          >
            <span style={{
              fontSize: '9px',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              fontWeight: 600,
              padding: '3px 8px',
              borderRadius: '2px',
              display: 'inline-block',
              marginBottom: '14px',
              alignSelf: 'flex-start',
              background: doc.tagBg,
              color: doc.tagColor,
            }}>
              {doc.tag}
            </span>
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
              color: 'rgba(240, 234, 216, 0.45)',
              lineHeight: 1.65,
              fontWeight: 300,
              marginBottom: '16px',
              flex: 1,
            }}>
              {doc.desc}
            </p>
            <div style={{
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(240, 234, 216, 0.25)',
              borderTop: '1px solid rgba(240, 234, 216, 0.06)',
              paddingTop: '10px',
              marginTop: 'auto',
            }}>
              {doc.audience}
            </div>
          </Link>
        ))}
      </div>
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
          <Route
            key={doc.route}
            path={doc.route}
            element={<DocViewer title={doc.title} file={doc.file} />}
          />
        ))}
      </Routes>
    </div>
  )
}
