import { Link } from 'react-router-dom'
import { FiGithub, FiLinkedin, FiMail, FiGlobe } from 'react-icons/fi'
import { GiRobotGolem } from 'react-icons/gi'
import { useTranslation } from 'react-i18next'

const SOCIALS = [
  { icon: FiGithub, href: 'https://github.com/alexandrealvees', label: 'GitHub' },
  { icon: FiLinkedin, href: 'https://linkedin.com/in/alexandre-alvees', label: 'LinkedIn' },
  { icon: FiMail, href: 'mailto:contato@alexandrealves.dev', label: 'Email' },
]

const linkStyle = {
  color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
  fontSize: 11, fontWeight: 600, letterSpacing: '0.18em',
  textTransform: 'uppercase', transition: 'color 0.2s',
}

export default function Navbar() {
  const { t, i18n } = useTranslation()

  const navLinks = [
    { label: t('nav.home'), id: 'home' },
    { label: t('nav.about'), id: 'sobre' },
    { label: t('nav.skills'), id: 'habilidades' },
    { label: t('nav.experience'), id: 'experience' },
    { label: t('nav.certifications'), id: 'certificacoes' },
    { label: t('nav.achievements'), id: 'conquistas' },
  ]

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('pt') ? 'en' : 'pt')
  }

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '20px 56px',
      background: 'rgba(3,0,20,0.85)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255,255,255,0.05)',
    }}>
      <div></div>

      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {navLinks.map(link => (
          <a key={link.id} href={`#${link.id}`} style={linkStyle}
            onMouseEnter={e => e.target.style.color = '#fff'}
            onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
          >{link.label}</a>
        ))}
        <Link to="/blog" style={linkStyle}
          onMouseEnter={e => e.target.style.color = '#fff'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
        >{t('nav.blog')}</Link>
        <Link to="/curriculum" style={linkStyle}
          onMouseEnter={e => e.target.style.color = '#fff'}
          onMouseLeave={e => e.target.style.color = 'rgba(255,255,255,0.6)'}
        >{t('nav.curriculum')}</Link>
      </div>

      <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
        <GiRobotGolem className="text-neon-purple" size={20} />
        {SOCIALS.map(({ icon: Icon, href, label }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label}
            style={{ color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
          ><Icon size={18} /></a>
        ))}

        <button
          onClick={toggleLanguage}
          title={i18n.language.startsWith('pt') ? 'Translate to English' : 'Traduzir para Português'}
          style={{
            background: 'none', border: 'none', padding: 0, cursor: 'pointer',
            color: 'rgba(255,255,255,0.5)', transition: 'color 0.2s',
            display: 'flex', alignItems: 'center', marginLeft: 4,
          }}
          onMouseEnter={e => e.currentTarget.style.color = '#00d4ff'}
          onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.5)'}
        >
          <FiGlobe size={18} />
          <span style={{ fontSize: 10, marginLeft: 4, fontWeight: 'bold', fontFamily: 'monospace' }}>
            {i18n.language.startsWith('pt') ? 'EN' : 'PT'}
          </span>
        </button>

        <GiRobotGolem className="text-neon-purple" size={20} />
      </div>
    </nav>
  )
}
