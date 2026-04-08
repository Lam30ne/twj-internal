export default function DocViewer({ doc }) {
  const statusGuidance = {
    active: 'This document is current operating guidance and should be treated as a source of truth unless superseded.',
    reference: 'This document is reference material and supports operating decisions, but may not reflect the latest decisions on its own.',
    point_in_time: 'This document captures a specific moment (meeting, audit, or review) and should not be treated as evergreen guidance.',
    internal_memo: 'This document is an internal communication and reflects intent or alignment at a moment in time.',
    personal: 'This document is personal and highly sensitive. It is not intended for broad distribution.',
  }

  const authorityLabel = {
    source_of_truth: 'Source of truth',
    supporting: 'Supporting',
    historical_record: 'Historical record',
    personal_guidance: 'Personal guidance',
  }

  const authorityGuidance = {
    source_of_truth: 'Use this as canonical guidance for current decisions and operating behavior.',
    supporting: 'Use this as supporting context or framework, alongside active operating documents.',
    historical_record: 'Use this to understand what happened or what was believed at a specific point in time, not as current policy.',
    personal_guidance: 'Use this only for the named individual or tightly restricted audience.',
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
        <div style={{ fontSize: '14px', color: 'rgba(240, 234, 216, 0.78)', marginBottom: '10px' }}>
          <strong>{doc.title}</strong>
        </div>
        <div style={{ display: 'grid', gap: '8px' }}>
          <div style={{ fontSize: '13px', color: 'rgba(240, 234, 216, 0.62)', lineHeight: 1.6 }}>
            <strong>Status:</strong> {statusGuidance[doc.status]}
          </div>
          <div style={{ fontSize: '13px', color: 'rgba(240, 234, 216, 0.62)', lineHeight: 1.6 }}>
            <strong>Authority:</strong> {authorityLabel[doc.authority]} — {authorityGuidance[doc.authority]}
          </div>
        </div>
        <div style={{
          marginTop: '10px',
          fontSize: '11px',
          color: 'rgba(240, 234, 216, 0.42)',
          lineHeight: 1.6,
        }}>
          Owner: {doc.owner} · Last reviewed: {doc.reviewed} · Next review: {doc.nextReview} · Sensitivity: {doc.sensitivity}
        </div>
      </div>

      <iframe
        src={`/docs/${doc.file}`}
        title={doc.title}
        style={{
          width: '100%',
          flex: 1,
          border: 'none',
          minHeight: 'calc(100vh - 152px)',
        }}
      />
    </div>
  )
}
