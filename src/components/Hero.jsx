import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail, FiUser } from 'react-icons/fi'
import bgImage from '../images/background.jpg'

/*
  ┌──────────────────────────────────────────────────────────┐
  │  Para adicionar sua foto:                                │
  │  1. Salve como  src/images/avatar.jpg                    │
  │  2. Descomente a linha abaixo                            │
  │  3. Apague a linha:  const avatarImage = null            │
  └──────────────────────────────────────────────────────────┘
*/
// import avatarImage from '../images/avatar.jpg'
import avatarImage from '../images/profile/profile.png'

const marqueeTextTop = Array(10).fill('RED TEAM • PENTESTING • CYBER THREAT • MALWARE ').join('')
const marqueeTextBot = Array(10).fill('CYBER THREAT • FORENSICS • ENGENHARIA DE SOFTWARE • ').join('')

const NAV_LINKS = [
  { label: 'Home', id: 'home' },
  { label: 'Sobre', id: 'sobre' },
  { label: 'Skills', id: 'habilidades' },
  { label: 'Experiência', id: 'experience' },
  { label: 'Certificações', id: 'certificacoes' }
]

export default function Hero() {
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
      {/* ── NAVBAR ─────────────────────────────────────────────── */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '20px 56px',
        background: 'rgba(3,0,20,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
      }}>
        {/* Espaçador invisível para manter os ícones sociais à direita e o menu no centro (se desejado), ou podemos deixar os links à esquerda */}
        <div></div>

        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
          {NAV_LINKS.map(link => (
            <a key={link.id} href={`#${link.id}`} style={{
              color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
              textTransform: 'uppercase', transition: 'color 0.2s',
            }}
              onMouseEnter={e => e.target.style.color = '#fff'}
              onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
            >{link.label}</a>
          ))}
          <Link to="/blog" style={{
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >Blog</Link>
          <Link to="/curriculum" style={{
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
            fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
            textTransform: 'uppercase', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >Curriculum</Link>
        </div>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
          {[
            { icon: FiGithub, href: 'https://github.com/alexandrealvees', label: 'GitHub' },
            { icon: FiLinkedin, href: 'https://linkedin.com/in/alexandre-alvees', label: 'LinkedIn' },
            { icon: FiMail, href: 'mailto:contato@alexandrealves.dev', label: 'Email' },
          ].map(({ icon: Icon, href, label }) => (
            <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
              style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
            ><Icon size={18} /></a>
          ))}
        </div>
      </nav>

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
              Disponível para projetos
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
                Sou especializado em identificar e explorar vulnerabilidades em aplicações, redes e infraestruturas. Utilizo técnicas avançadas de Red Team e Pentest para simular ataques reais e fortalecer a postura de segurança das organizações.
              </p>
            </div>

            {/* subtítulo */}
            <p style={{
              fontSize: 10, fontFamily: 'monospace', letterSpacing: '0.25em',
              textTransform: 'uppercase', color: '#8b5cf6', marginBottom: 28,
            }}>
              Software Engineer · Security · Cloud · AI
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
                      Sua foto aqui
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
