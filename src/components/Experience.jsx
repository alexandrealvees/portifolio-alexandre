import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBriefcase, FiCalendar } from 'react-icons/fi'
import SectionWrapper from './SectionWrapper'
import { useTranslation } from 'react-i18next'

export default function Experience() {
  const { t } = useTranslation();

  const experiences = [
    {
      role: t('exp.job1_role'),
      company: 'LOQED SYSTEMS',
      period: `JAN 2024 - ${t('exp.present')}`,
      description: t('exp.job1_desc'),
      techs: ['Threat Modeling', 'AppSec', 'Risk Assessment'],
      color: '#00d4ff'
    },
    {
      role: t('exp.job2_role'),
      company: 'LOQED SYSTEMS',
      period: 'JAN 2023 - JAN 2024',
      description: t('exp.job2_desc'),
      techs: ['Web Pentest', 'API Security', 'Mobile', 'DevSecOps'],
      color: '#8b5cf6'
    },
    {
      role: t('exp.job3_role'),
      company: 'LOQED SYSTEMS',
      period: `AGO 2024 - ${t('exp.present')}`,
      description: t('exp.job3_desc'),
      techs: ['Software Architecture', 'Secure Coding', 'SDLC'],
      color: '#ec4899'
    },
    {
      role: t('exp.job4_role'),
      company: 'HUNTERSPAY',
      period: `JAN 2024 - ${t('exp.present')}`,
      description: t('exp.job4_desc'),
      techs: ['Bug Bounty', 'Web', 'API', 'Mobile', 'Exploit Dev'],
      color: '#10b981'
    },
    {
      role: t('exp.job5_role'),
      company: 'CAIXA ECONÔMICA FEDERAL, BANCO DO BRASIL, SICOOB, TRIBUNAL SUPERIOR ELEITORAL E EXÉRCITO BRASILEIRO',
      period: '2019 — 2024',
      description: t('exp.job5_desc'),
      techs: ['Java', 'Angular', 'AWS', 'Kubernetes', 'PostgreSQL'],
      color: '#f59e0b'
    }
  ]

  return (
    <SectionWrapper id="experience">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4 block"
          >
            {t('exp.title_label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            {t('exp.title_main')}{' '}
            <span className="gradient-text">{t('exp.title_highlight')}</span>
          </motion.h2>
        </div>

        <div className="relative">
          {/* Linha do tempo central */}
          <div className="absolute left-[20px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent transform md:-translate-x-1/2" />

          <div className="space-y-12 relative">
            {experiences.map((exp, i) => (
              <TimelineItem key={i} exp={exp} index={i} />
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}

function TimelineItem({ exp, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const isEven = index % 2 === 0

  return (
    <div ref={ref} className={`relative flex flex-col md:flex-row gap-8 md:gap-0 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      
      {/* Marcador Central */}
      <div className="absolute left-[20px] md:left-1/2 top-0 transform -translate-x-1/2 flex items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center z-10"
          style={{ border: `1px solid ${exp.color}40`, boxShadow: `0 0 20px ${exp.color}20` }}
        >
          <div className="w-3 h-3 rounded-full" style={{ background: exp.color }} />
        </motion.div>
      </div>

      {/* Conteúdo */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? 30 : -30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
        className={`w-full md:w-1/2 pl-16 md:pl-0 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}
      >
        <div className="glass-card rounded-2xl p-6 group hover:border-white/10 transition-colors">
          <div className="flex flex-wrap items-center gap-3 mb-3 text-xs font-mono">
            <span className="flex items-center gap-1.5" style={{ color: exp.color }}>
              <FiBriefcase size={12} />
              {exp.company}
            </span>
            <span className="text-gray-600">•</span>
            <span className="flex items-center gap-1.5 text-gray-400">
              <FiCalendar size={12} />
              {exp.period}
            </span>
          </div>

          <h3 className="text-xl font-bold text-white mb-4">{exp.role}</h3>
          <p className="text-gray-400 text-sm leading-relaxed mb-6">
            {exp.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {exp.techs.map(tech => (
              <span key={tech} className="px-3 py-1 rounded-lg text-[10px] font-mono"
                style={{ 
                  background: 'rgba(255,255,255,0.03)', 
                  border: '1px solid rgba(255,255,255,0.05)',
                  color: 'rgba(255,255,255,0.6)'
                }}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
