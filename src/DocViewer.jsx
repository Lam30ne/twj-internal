import { useEffect, useRef } from 'react'

export default function DocViewer({ title, file }) {
  const iframeRef = useRef(null)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [file])

  return (
    <div style={{
      background: '#0e0c08',
      minHeight: 'calc(100vh - 48px)',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <iframe
        ref={iframeRef}
        src={`/docs/${file}`}
        title={title}
        style={{
          width: '100%',
          flex: 1,
          border: 'none',
          minHeight: 'calc(100vh - 48px)',
        }}
      />
    </div>
  )
}
