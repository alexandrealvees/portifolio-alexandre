import { useNavigate } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'

// Cabeçalho sticky reutilizável com botão "Voltar" e título central opcional,
// usado pelas páginas internas (certificações, blog, post).
export default function BackHeader({ backTo = '/', maxWidth = 1200, title, emoji }) {
  const navigate = useNavigate()
  const { t } = useTranslation()

  return (
    <div style={{
      position: 'sticky', top: 0, zIndex: 50,
      background: 'rgba(3,0,20,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{ maxWidth, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', gap: 20 }}>
        <button
          onClick={() => navigate(backTo)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'rgba(255,255,255,0.5)', background: 'none',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: 10, padding: '8px 14px',
            fontSize: 12, fontFamily: 'monospace', cursor: 'pointer',
            transition: 'all 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)' }}
          onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)' }}
        >
          <FiArrowLeft size={14} />
          {t('common.back')}
        </button>

        {title && (
          <>
            <div style={{ flex: 1, textAlign: 'center' }}>
              <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: 0 }}>
                {emoji && <span style={{ fontSize: 22 }}>{emoji}</span>}
                <span style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700, fontSize: 22,
                  background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                }}>
                  {title}
                </span>
              </h1>
            </div>
            <div style={{ width: 80 }} />
          </>
        )}
      </div>
    </div>
  )
}
