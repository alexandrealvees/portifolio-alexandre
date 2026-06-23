import { useNavigate } from 'react-router-dom'
import GrainOverlay from '../components/ui/GrainOverlay'
const cvPtHref = new URL('../curriculum/cv-pt.pdf', import.meta.url).href
const cvEnHref = new URL('../curriculum/cv-en.pdf', import.meta.url).href
const documents = [
  { title: 'Currículo (Português)', href: cvPtHref },
  { title: 'Curriculum (English)', href: cvEnHref },
]

export default function CurriculumPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', background: '#030014', color: '#e2e8f0', paddingBottom: 80 }}>
      <GrainOverlay />

      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(3,0,20,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button
            onClick={() => navigate('/')}
            style={{
              display: 'flex', alignItems: 'center', gap: 8,
              color: 'rgba(255,255,255,0.5)', background: 'none',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: 10, padding: '8px 14px',
              fontSize: 12, fontFamily: 'monospace', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#fff'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(255,255,255,0.5)'
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'
            }}
          >
            ← Voltar
          </button>

          <h1 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: 'clamp(1.2rem,3vw,1.8rem)', color: '#fff' }}>
            Curriculum
          </h1>
          <div />
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 24 }}>
          {documents.map((doc) => (
            <div
              key={doc.title}
              style={{
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.08), rgba(0, 212, 255, 0.04))',
                overflow: 'hidden',
              }}
            >
              <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h2 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#fff' }}>{doc.title}</h2>
                <a
                  href={doc.href}
                  download
                  style={{
                    fontSize: 12, fontFamily: 'monospace',
                    color: '#00d4ff', textDecoration: 'none',
                    border: '1px solid rgba(0,212,255,0.35)',
                    borderRadius: 8, padding: '8px 12px',
                    background: 'rgba(0,212,255,0.06)',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.14)'
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.6)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
                    e.currentTarget.style.borderColor = 'rgba(0,212,255,0.35)'
                  }}
                >
                  Baixar PDF
                </a>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                <iframe
                  src={doc.href}
                  title={doc.title}
                  style={{ width: '100%', height: '75vh', border: 'none' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
