import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiTarget, FiCode, FiCpu, FiSearch, FiCloud, FiLayers } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import SectionWrapper from '../ui/SectionWrapper'

const areas = [
  {
    icon: FiTarget,
    titleKey: 'interests.i1_title',
    descKey: 'interests.i1_desc',
    gradient: 'linear-gradient(135deg,#00d4ff,#3b82f6)',
    glow: 'rgba(0,212,255,0.2)',
    tags: ['APT Emulation', 'MITRE ATT&CK', 'Purple Team', 'C2 Frameworks'],
  },
  {
    icon: FiCode,
    titleKey: 'interests.i2_title',
    descKey: 'interests.i2_desc',
    gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)',
    glow: 'rgba(139,92,246,0.2)',
    tags: ['OWASP API Top 10', 'REST / GraphQL', 'SAST / DAST', 'Secure SDLC'],
  },
  {
    icon: FiCpu,
    titleKey: 'interests.i3_title',
    descKey: 'interests.i3_desc',
    gradient: 'linear-gradient(135deg,#ec4899,#8b5cf6)',
    glow: 'rgba(236,72,153,0.2)',
    tags: ['LLMs em CyberSec', 'ML para Detecção', 'IA Ofensiva', 'Automação'],
  },
  {
    icon: FiSearch,
    titleKey: 'interests.i4_title',
    descKey: 'interests.i4_desc',
    gradient: 'linear-gradient(135deg,#10b981,#00d4ff)',
    glow: 'rgba(16,185,129,0.2)',
    tags: ['IOC / TTP', 'CTEM', 'OSINT', 'Threat Intel Platforms'],
  },
  {
    icon: FiCloud,
    titleKey: 'interests.i5_title',
    descKey: 'interests.i5_desc',
    gradient: 'linear-gradient(135deg,#3b82f6,#8b5cf6)',
    glow: 'rgba(59,130,246,0.2)',
    tags: ['Cloud Pentest', 'Android / iOS', 'Smart Contracts', 'Web3 Security'],
  },
  {
    icon: FiLayers,
    titleKey: 'interests.i6_title',
    descKey: 'interests.i6_desc',
    gradient: 'linear-gradient(135deg,#f59e0b,#ec4899)',
    glow: 'rgba(245,158,11,0.2)',
    tags: ['Threat Modeling', 'DevSecOps', 'Security by Design', 'CI/CD Security'],
  },
]

function AreaCard({ area, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const { t } = useTranslation()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="glass-card rounded-2xl p-6 group flex flex-col gap-4"
      style={{ '--glow': area.glow }}
    >
      {/* topo: ícone + número */}
      <div className="flex items-start justify-between">
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-shadow duration-300 group-hover:shadow-[0_0_24px_var(--glow)]"
          style={{ background: area.gradient, padding: 1 }}
        >
          <div
            className="w-full h-full rounded-xl flex items-center justify-center"
            style={{ background: 'rgba(10,10,26,0.85)' }}
          >
            <area.icon className="text-white" size={19} />
          </div>
        </div>
        <span
          className="text-[11px] font-mono font-bold tabular-nums"
          style={{ color: 'rgba(255,255,255,0.12)' }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      {/* título */}
      <h3
        className="text-white font-display font-semibold text-base leading-snug transition-colors duration-300 group-hover:text-neon-cyan"
      >
        {t(area.titleKey)}
      </h3>

      {/* descrição */}
      <p className="text-gray-500 text-sm leading-relaxed flex-1">
        {t(area.descKey)}
      </p>

      {/* linha divisória animada */}
      <div className="relative h-px overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
        <motion.div
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ delay: index * 0.08 + 0.3, duration: 0.8, ease: 'easeOut' }}
          className="absolute inset-0 origin-left rounded-full"
          style={{ background: area.gradient }}
        />
      </div>

      {/* tags */}
      <div className="flex flex-wrap gap-1.5">
        {area.tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] font-mono px-2 py-1 rounded-md"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              color: 'rgba(255,255,255,0.4)',
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function Interests() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="areas">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4 block"
          >
            {t('interests.title_label')}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            {t('interests.title_main')}{' '}
            <span className="gradient-text">{t('interests.title_highlight')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed"
          >
            {t('interests.description')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {areas.map((area, i) => (
            <AreaCard key={area.titleKey} area={area} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
