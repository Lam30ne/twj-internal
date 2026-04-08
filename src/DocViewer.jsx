export default function DocViewer({ doc }) {
  const guidance = {
    active: 'This document is current operating guidance and should be treated as a source of truth.',
    reference: 'This document is reference material and supports operating decisions, but may not reflect current decisions.',
    point_in_time: 'This document captures a specific moment (meeting, audit, or review) and should not be treated as evergreen.',
    internal_memo: 'This document is an internal communication and reflects intent or alignment at a moment in time.',
    personal: 'This document is personal and highly sensitive. It is not intended for broad distribution.',
  }

  return (
    <div style={{
      background: '#0e0c08',
      minHeight: 'calc(100vh - 48px)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{
        padding: '18px 24px',
        borderBottom: '1px solid rgba(240, 234, 216, 0.08)',
        background: 'rgba(240, 234, 216, 0.02)',
      }}>
        <div style={{
          fontSize: '11px',
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          color: '#d4a84a',
          marginBottom: '6px',
        }}>
          Document context
        </div>
        <div style={{ fontSize: '14px', color: 'rgba(240, 234, 216, 0.78)', marginBottom: '6px' }}>
          <strong>{doc.title}</strong>
        </div>
        <div style={{ fontSize: '13px', color: 'rgba(240, 234, 216, 0.58)', lineHeight: 1.6 }}>
          {guidance[doc.status]}
        </div>
        <div style={{
          marginTop: '8px',
          fontSize: '11px',
          color: 'rgba(240, 234, 216, 0.42)',
        }}>
          Owner: {doc.owner} · Last reviewed: {doc.reviewed} · Sensitivity: {doc.sensitivity}
        </div>
      </div>

      <iframe
        src={`/docs/${doc.file}`}
        title={doc.title}
        style={{
          width: '100%',
          flex: 1,
          border: 'none',
          minHeight: 'calc(100vh - 120px)',
        }}
      />
    </div>
  )
}
