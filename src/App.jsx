import { useState, useMemo } from 'react'
import { Routes, Route, Link, useLocation } from 'react-router-dom'
import DocViewer from './DocViewer'

// Shared theme tokens. Muted text values are tuned to meet WCAG 2.1 AA
// contrast (>= 4.5:1 for body text) against the dark card/page backgrounds.
const TEXT = '#f0ead8'
const TEXT_MUTED = 'rgba(240, 234, 216, 0.74)' // primary descriptions
const TEXT_DIM = 'rgba(240, 234, 216, 0.62)'   // secondary labels
const TEXT_FAINT = 'rgba(240, 234, 216, 0.54)'  // smallest meta / footer
const GOLD = '#d4a84a'
const CARD_BG = '#1c1a16'

const docs = [
  {
    title: 'Q2 2026 Quarterly Review',
    route: '/quarterly-review',
    file: 'Wonderly_Q2_Quarterly_Review.html',
    tag: 'Q2 2026',
    tagColor: '#52aab2',
    tagBg: '#0a2628',
    emoji: '📋',
    desc: 'Meeting synthesis + document audit from April 3. Decisions made, action items, concepts agreed, alignment confirmed, and gaps identified across the full doc suite.',
    audience: 'Adam · Allie · Camila',
    added: '2026-04-03',
    updated: '2026-04-03',
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
    added: '2026-03-20',
    updated: '2026-04-03',
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
    added: '2026-03-15',
    updated: '2026-03-22',
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
    added: '2026-03-15',
    updated: '2026-03-15',
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
    added: '2026-03-18',
    updated: '2026-03-18',
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
    added: '2026-03-22',
    updated: '2026-03-22',
  },
  {
    title: 'Camila\'s Findings vs The Artifacts',
    route: '/camila-review',
    file: 'Camila_vs_Artifacts_Review.html',
    tag: 'Review',
    tagColor: '#e88860',
    tagBg: '#200c06',
    emoji: '★',
    desc: 'Where Camila\'s first-week diagnosis aligns with the strategy documents, where the gaps are, and what the artifacts know that needs to be received.',
    audience: 'Adam · Allie · Camila',
    added: '2026-04-01',
    updated: '2026-04-01',
  },
  {
    title: 'A Note on Where We\'re Headed',
    route: '/founder-brief',
    file: 'Wonderly_Founder_Brief_For_Team.html',
    tag: 'Team Brief',
    tagColor: '#90c870',
    tagBg: '#0c1c06',
    emoji: '💌',
    desc: 'From Adam and Allie — what founder specialization means, what to expect from each founder, what we ask from each role, and what we commit in return.',
    audience: 'Full Team',
    added: '2026-03-25',
    updated: '2026-03-25',
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
    added: '2026-03-16',
    updated: '2026-03-16',
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
    added: '2026-03-28',
    updated: '2026-03-28',
  },
]

// Parse an ISO date string as local midnight (avoids UTC off-by-one shifts).
function parseDate(iso) {
  return new Date(iso + 'T00:00:00')
}

function formatMonth(iso) {
  return parseDate(iso).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

// A doc is "New" if it was added within 7 days of the most recently added doc.
const NEWEST_ADDED = Math.max(...docs.map((d) => parseDate(d.added).getTime()))
function isNew(doc) {
  return NEWEST_ADDED - parseDate(doc.added).getTime() <= 7 * 24 * 60 * 60 * 1000
}

function Nav() {
  const location = useLocation()

  const navStyle = {
    position: 'sticky',
    top: 0,
    zIndex: 100,
    background: 'rgba(14, 12, 8, 0.92)',
    backdropFilter: 'blur(12px)',
    borderBottom: '1px solid rgba(240, 234, 216, 0.08)',
    padding: '0 clamp(16px, 4vw, 32px)',
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
    color: GOLD,
    textDecoration: 'none',
    marginRight: '32px',
    flexShrink: 0,
    padding: '14px 0',
  }

  return (
    <nav style={navStyle} aria-label="Documents">
      <Link to="/" style={logoStyle}>TWJ</Link>
      {docs.map((doc) => {
        const isActive = location.pathname === doc.route
        return (
          <Link
            key={doc.route}
            to={doc.route}
            aria-current={isActive ? 'page' : undefined}
            className="nav-link"
            style={{
              color: isActive ? GOLD : TEXT_DIM,
              textDecoration: 'none',
              fontSize: '11px',
              letterSpacing: '0.06em',
              padding: '16px 14px',
              minHeight: '44px',
              display: 'flex',
              alignItems: 'center',
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

function Controls({ query, setQuery, tags, activeTag, setActiveTag, sort, setSort }) {
  const wrapStyle = {
    maxWidth: '1100px',
    margin: '0 auto',
    padding: '0 clamp(16px, 5vw, 48px) 32px',
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  }

  return (
    <form
      role="search"
      aria-label="Filter documents"
      onSubmit={(e) => e.preventDefault()}
      style={wrapStyle}
    >
      <label htmlFor="doc-search" className="visually-hidden">
        Search documents
      </label>
      <input
        id="doc-search"
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search documents…"
        autoComplete="off"
        className="search-input"
        style={{
          width: '100%',
          background: CARD_BG,
          border: '1px solid rgba(240, 234, 216, 0.16)',
          borderRadius: '6px',
          padding: '12px 16px',
          color: TEXT,
          fontSize: '15px',
          fontFamily: 'inherit',
        }}
      />

      <div
        role="group"
        aria-label="Filter by tag"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}
      >
        {tags.map((tag) => {
          const active = tag === activeTag
          return (
            <button
              key={tag}
              type="button"
              aria-pressed={active}
              onClick={() => setActiveTag(tag)}
              className="chip"
              style={{
                fontSize: '11px',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                fontWeight: 600,
                padding: '8px 14px',
                minHeight: '36px',
                borderRadius: '999px',
                cursor: 'pointer',
                background: active ? GOLD : CARD_BG,
                color: active ? '#1a1408' : TEXT_DIM,
                border: active
                  ? '1px solid #d4a84a'
                  : '1px solid rgba(240, 234, 216, 0.16)',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              }}
            >
              {tag}
            </button>
          )
        })}
      </div>

      <div
        role="group"
        aria-label="Sort documents"
        style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}
      >
        <span style={{ fontSize: '11px', letterSpacing: '0.08em', textTransform: 'uppercase', color: TEXT_FAINT }}>
          Sort
        </span>
        {[
          { key: 'curated', label: 'Curated' },
          { key: 'recent', label: 'Recently updated' },
        ].map((opt) => {
          const active = sort === opt.key
          return (
            <button
              key={opt.key}
              type="button"
              aria-pressed={active}
              onClick={() => setSort(opt.key)}
              className="chip"
              style={{
                fontSize: '11px',
                letterSpacing: '0.06em',
                padding: '7px 12px',
                minHeight: '36px',
                borderRadius: '6px',
                cursor: 'pointer',
                background: active ? 'rgba(212, 168, 74, 0.14)' : 'transparent',
                color: active ? GOLD : TEXT_DIM,
                border: active
                  ? '1px solid rgba(212, 168, 74, 0.5)'
                  : '1px solid rgba(240, 234, 216, 0.16)',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
              }}
            >
              {opt.label}
            </button>
          )
        })}
      </div>
    </form>
  )
}

function Home() {
  const [query, setQuery] = useState('')
  const [activeTag, setActiveTag] = useState('All')
  const [sort, setSort] = useState('curated')

  const tags = useMemo(() => ['All', ...new Set(docs.map((d) => d.tag))], [])

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = docs.filter((doc) => {
      const tagMatch = activeTag === 'All' || doc.tag === activeTag
      const haystack = `${doc.title} ${doc.desc} ${doc.tag} ${doc.audience}`.toLowerCase()
      const textMatch = q === '' || haystack.includes(q)
      return tagMatch && textMatch
    })
    if (sort === 'recent') {
      list = [...list].sort(
        (a, b) => parseDate(b.updated).getTime() - parseDate(a.updated).getTime()
      )
    }
    return list
  }, [query, activeTag, sort])

  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(160deg, #131008 0%, #1a1610 40%, #131008 100%)',
    color: TEXT,
  }

  const heroStyle = {
    textAlign: 'center',
    padding: 'clamp(56px, 10vw, 100px) clamp(20px, 5vw, 32px) clamp(36px, 6vw, 60px)',
  }

  const h1Style = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: 'clamp(34px, 7vw, 52px)',
    fontWeight: 300,
    lineHeight: 1.1,
    color: TEXT,
    marginBottom: '12px',
  }

  const subtitleStyle = {
    fontSize: '13px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    color: TEXT_FAINT,
    marginBottom: '8px',
  }

  const descStyle = {
    fontSize: '15px',
    color: TEXT_MUTED,
    maxWidth: '520px',
    margin: '0 auto',
    lineHeight: 1.7,
    fontWeight: 300,
  }

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 260px), 1fr))',
    gap: '3px',
    padding: '0 clamp(16px, 5vw, 48px) 100px',
    maxWidth: '1100px',
    margin: '0 auto',
  }

  return (
    <div style={containerStyle}>
      <header style={heroStyle}>
        <span style={{ fontSize: '56px', display: 'block', marginBottom: '24px', filter: 'drop-shadow(0 0 20px rgba(212, 168, 74, 0.3))' }} aria-hidden="true">✦</span>
        <h1 style={h1Style}>Wonderly <em style={{ color: GOLD }}>Operating</em><br />Document Hub</h1>
        <p style={subtitleStyle}>2026 Strategic Documents</p>
        <p style={descStyle}>
          Strategic documents, operating briefs, brand frameworks, and alignment reviews for the Wonderly leadership team.
        </p>
      </header>

      <main id="main">
        <Controls
          query={query}
          setQuery={setQuery}
          tags={tags}
          activeTag={activeTag}
          setActiveTag={setActiveTag}
          sort={sort}
          setSort={setSort}
        />

        <p
          aria-live="polite"
          style={{
            maxWidth: '1100px',
            margin: '0 auto',
            padding: '0 clamp(16px, 5vw, 48px)',
            fontSize: '12px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: TEXT_FAINT,
            marginBottom: '16px',
          }}
        >
          {visible.length} {visible.length === 1 ? 'document' : 'documents'} shown
        </p>

        {visible.length === 0 ? (
          <p style={{ textAlign: 'center', color: TEXT_MUTED, padding: '40px 24px 120px', fontSize: '15px' }}>
            No documents match your search. Try a different term or clear the filters.
          </p>
        ) : (
          <div style={gridStyle}>
            {visible.map((doc) => (
              <Link
                key={doc.route}
                to={doc.route}
                className="doc-card"
                style={{
                  background: CARD_BG,
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
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '9px',
                    letterSpacing: '0.15em',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    padding: '3px 8px',
                    borderRadius: '2px',
                    background: doc.tagBg,
                    color: doc.tagColor,
                  }}>
                    {doc.tag}
                  </span>
                  {isNew(doc) && (
                    <span style={{
                      fontSize: '9px',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: '2px',
                      background: 'rgba(212, 168, 74, 0.16)',
                      color: GOLD,
                      border: '1px solid rgba(212, 168, 74, 0.4)',
                    }}>
                      New
                    </span>
                  )}
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '8px' }}>
                  <span style={{ fontSize: '22px', flexShrink: 0 }} aria-hidden="true">{doc.emoji}</span>
                  <span style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    fontSize: '22px',
                    fontWeight: 400,
                    color: TEXT,
                    lineHeight: 1.2,
                  }}>
                    {doc.title}
                  </span>
                </div>
                <p style={{
                  fontSize: '13px',
                  color: TEXT_MUTED,
                  lineHeight: 1.65,
                  fontWeight: 300,
                  marginBottom: '16px',
                  flex: 1,
                }}>
                  {doc.desc}
                </p>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '12px',
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: TEXT_FAINT,
                  borderTop: '1px solid rgba(240, 234, 216, 0.06)',
                  paddingTop: '10px',
                  marginTop: 'auto',
                }}>
                  <span>{doc.audience}</span>
                  <span style={{ flexShrink: 0, whiteSpace: 'nowrap' }}>Updated {formatMonth(doc.updated)}</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}

export default function App() {
  return (
    <div style={{ background: '#0e0c08', minHeight: '100vh' }}>
      <a href="#main" className="skip-link">Skip to content</a>
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
