import { FiUser } from 'react-icons/fi'
import { useTranslation } from 'react-i18next';
import Navbar from './Navbar'
import bgImage from '../images/background.jpg'
import avatarImage from '../images/profile/profile.png'

const marqueeTextTop = Array(10).fill('RED TEAM • PENTESTING • CYBER THREAT • MALWARE ').join('')
const marqueeTextBot = Array(10).fill('CYBER THREAT • FORENSICS • ENGENHARIA DE SOFTWARE • ').join('')

export default function Hero() {
  const { t } = useTranslation();

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
        overflow: 'hidden',
        backgroundColor: '#030014',
      }}
    >
      <Navbar />

      {/* ── MARQUEE SUPERIOR ───────────────────────────────────── */}
      <div style={{
        marginTop: '65px', // compensa a altura da navbar fixa
        position: 'relative', zIndex: 20, overflow: 'hidden',
        padding: '7px 0',
        background: 'linear-gradient(90deg,#6d28d9,#0ea5e9,#6d28d9)',
        borderTop: '1px solid rgba(255,255,255,0.1)',
        borderBottom: '1px solid rgba(255,255,255,0.1)',
      }}>
        <div className="hero-marquee-top" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.95)', paddingRight: 0 }}>
            {marqueeTextTop}{marqueeTextTop}
          </span>
        </div>
      </div>

      {/* ── HERO PRINCIPAL ─────────────────────────────────────── */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', alignItems: 'center' }}>

        {/* background image */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 0 }}>
          <img
            src={bgImage}
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.3) saturate(1.5)' }}
          />
          {/* gradient overlay esquerda */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, rgba(3,0,20,0.9) 0%, rgba(3,0,20,0.6) 55%, rgba(3,0,20,0.25) 100%)',
          }} />
          {/* gradient bottom fade */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 160,
            background: 'linear-gradient(to top, #030014, transparent)',
          }} />
        </div>

        {/* conteúdo */}
        <div className="hero-content" style={{
          position: 'relative', zIndex: 10, width: '100%',
          padding: '64px 56px',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: 48, alignItems: 'center',
          maxWidth: 1280, margin: '0 auto',
        }}>

          {/* ── LADO ESQUERDO ── */}
          <div className="hero-left" style={{ animation: 'heroFadeLeft 0.9s ease forwards' }}>

            {/* badge */}
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px', borderRadius: 999, marginBottom: 24,
              background: 'rgba(0,212,255,0.07)', border: '1px solid rgba(0,212,255,0.25)',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.2em',
              color: '#00d4ff', textTransform: 'uppercase',
            }}>
              <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4ade80', animation: 'pulse 1.5s infinite' }} />
              {t('hero.badge')}
            </div>

            {/* nome */}
            <h1 style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              lineHeight: 1,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              marginBottom: 24,
              fontSize: 'clamp(2.8rem, 6.5vw, 5.2rem)',
            }}>
              <span style={{ display: 'block', color: '#ffffff' }}>Alexandre</span>
              <span style={{
                display: 'block',
                background: 'linear-gradient(135deg, #00d4ff 0%, #8b5cf6 60%, #ec4899 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}>Alves</span>
            </h1>

            {/* caixa descrição */}
            <div style={{
              padding: '18px 20px', borderRadius: 12, marginBottom: 20, maxWidth: 440,
              background: 'rgba(3,0,20,0.75)',
              border: '1px solid rgba(255,255,255,0.07)',
              backdropFilter: 'blur(12px)',
            }}>
              <p style={{ color: 'rgba(255,255,255,0.75)', lineHeight: 1.7, fontSize: 14, margin: 0 }}>
                {t('hero.title')}
              </p>
            </div>

            {/* subtítulo */}
            <p style={{
              fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#8b5cf6', marginBottom: 28,
            }}>
              {t('hero.subtitle')}
            </p>

            
          </div>

          {/* ── LADO DIREITO — QUADRADO FOTO ── */}
          <div className="hero-right" style={{ display: 'flex', justifyContent: 'flex-end', animation: 'heroFadeRight 0.9s ease 0.2s forwards', opacity: 0 }}>
            <div style={{ position: 'relative' }}>

              {/* glow externo */}
              <div style={{
                position: 'absolute', inset: -16, borderRadius: 36,
                background: 'linear-gradient(135deg,#8b5cf6,#00d4ff)',
                filter: 'blur(30px)', opacity: 0.35, pointerEvents: 'none',
              }} />

              {/* card foto */}
              <div style={{
                position: 'relative',
                width: 'clamp(250px, 28vw, 330px)',
                height: 'clamp(270px, 32vw, 360px)',
                borderRadius: 28,
                overflow: 'hidden',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '2px solid rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(16px)',
                boxShadow: 'inset 0 0 15px rgba(255,255,255,0.1)',
              }}>

                {/* foto ou placeholder */}
                {avatarImage ? (
                  <img src={avatarImage} alt="Alexandre Alves"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
                ) : (
                  <div style={{
                    position: 'absolute', inset: 0, bottom: 44,
                    display: 'flex', flexDirection: 'column',
                    alignItems: 'center', justifyContent: 'center', gap: 12,
                  }}>
                    <div style={{
                      width: 72, height: 72, borderRadius: '50%',
                      background: 'rgba(139,92,246,0.18)',
                      border: '2px dashed rgba(139,92,246,0.4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <FiUser size={30} color="rgba(139,92,246,0.8)" />
                    </div>
                    <p style={{ fontSize: 11, fontFamily: 'monospace', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', margin: 0 }}>
                      {t('hero.photo')}
                    </p>
                    <p style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.12)', margin: 0 }}>
                      src/images/avatar.jpg
                    </p>
                  </div>
                )}

                {/* barra barcode */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '8px 14px',
                  background: 'rgba(3,0,20,0.85)',
                  borderTop: '1px solid rgba(139,92,246,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                }}>
                  <span style={{ fontSize: 9, fontFamily: 'monospace', color: 'rgba(255,255,255,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                    Alexandre Alves
                  </span>
                  <div style={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    {Array.from({ length: 18 }).map((_, i) => (
                      <div key={i} style={{
                        width: 1.5, borderRadius: 1,
                        height: 6 + Math.abs(Math.sin(i * 1.4)) * 8,
                        background: i % 3 === 0 ? '#8b5cf6' : '#00d4ff',
                        opacity: 0.65,
                      }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MARQUEE INFERIOR ───────────────────────────────────── */}
      <div style={{
        position: 'relative', zIndex: 20, overflow: 'hidden',
        padding: '7px 0',
        background: 'rgba(3,0,20,0.95)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}>
        <div className="hero-marquee-bot" style={{ display: 'flex', whiteSpace: 'nowrap' }}>
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.2em', color: 'rgba(255,255,255,0.28)' }}>
            {marqueeTextBot}{marqueeTextBot}
          </span>
        </div>
      </div>

      <style>{`
        @keyframes heroFadeLeft {
          from { opacity: 0; transform: translateX(-40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroFadeRight {
          from { opacity: 0; transform: translateX(40px); }
          to   { opacity: 1; transform: translateX(0); }
        }
        @keyframes heroMarqueeTop {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes heroMarqueeBot {
          from { transform: translateX(-50%); }
          to   { transform: translateX(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        .hero-left { animation: heroFadeLeft 0.9s ease forwards; }
        .hero-right { animation: heroFadeRight 0.9s 0.2s ease forwards; opacity: 0; }
        .hero-marquee-top { animation: heroMarqueeTop 35s linear infinite; }
        .hero-marquee-bot { animation: heroMarqueeBot 40s linear infinite; }

        @media (max-width: 768px) {
          .hero-content {
            grid-template-columns: 1fr !important;
            padding: 48px 24px !important;
          }
          .hero-right {
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  )
}
