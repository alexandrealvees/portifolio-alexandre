import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiBookOpen, FiCalendar, FiAward } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import SectionWrapper from '../ui/SectionWrapper'

const degrees = [
  {
    type: 'Pós-graduação',
    courseKey: 'edu.course1_name',
    instKey: 'edu.course1_inst',
    period: '2026',
    current: true,
    gradient: 'linear-gradient(135deg,#00d4ff,#3b82f6)',
    glow: 'rgba(0,212,255,0.25)',
    dot: '#00d4ff',
  },
  {
    type: 'Pós-graduação',
    courseKey: 'edu.course2_name',
    instKey: 'edu.course2_inst',
    period: '2022 – 2023',
    current: false,
    gradient: 'linear-gradient(135deg,#8b5cf6,#3b82f6)',
    glow: 'rgba(139,92,246,0.25)',
    dot: '#8b5cf6',
  },
  {
    type: 'Pós-graduação',
    courseKey: 'edu.course3_name',
    instKey: 'edu.course3_inst',
    period: '2020 – 2021',
    current: false,
    gradient: 'linear-gradient(135deg,#ec4899,#8b5cf6)',
    glow: 'rgba(236,72,153,0.25)',
    dot: '#ec4899',
  },
  {
    type: 'Pós-graduação',
    courseKey: 'edu.course4_name',
    instKey: 'edu.course4_inst',
    period: '2019 – 2021',
    current: false,
    gradient: 'linear-gradient(135deg,#f59e0b,#ec4899)',
    glow: 'rgba(245,158,11,0.25)',
    dot: '#f59e0b',
  },
  {
    type: 'Graduação',
    courseKey: 'edu.course5_name',
    instKey: 'edu.course5_inst',
    period: '2014 – 2018',
    current: false,
    gradient: 'linear-gradient(135deg,#10b981,#00d4ff)',
    glow: 'rgba(16,185,129,0.25)',
    dot: '#10b981',
  },
]

function TimelineItem({ degree, index, total }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.2 })
  const { t } = useTranslation()
  const isLast = index === total - 1

  return (
    <div ref={ref} className="relative flex gap-6">

      {/* coluna da linha + dot */}
      <div className="flex flex-col items-center flex-shrink-0" style={{ width: 40 }}>
        {/* dot */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={inView ? { scale: 1, opacity: 1 } : {}}
          transition={{ delay: index * 0.1 + 0.1, type: 'spring', stiffness: 260 }}
          className="relative z-10 flex items-center justify-center rounded-full flex-shrink-0"
          style={{
            width: 40, height: 40,
            background: degree.gradient,
            boxShadow: inView ? `0 0 18px ${degree.glow}` : 'none',
            transition: 'box-shadow 0.4s',
          }}
        >
          <FiBookOpen size={16} color="#fff" />

          {/* pulso animado no item atual */}
          {degree.current && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{ background: degree.dot, opacity: 0.2 }}
            />
          )}
        </motion.div>

        {/* linha vertical */}
        {!isLast && (
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.6, ease: 'easeOut' }}
            className="flex-1 w-px origin-top mt-1"
            style={{ background: `linear-gradient(to bottom, ${degree.dot}40, transparent)` }}
          />
        )}
      </div>

      {/* card */}
      <motion.div
        initial={{ opacity: 0, x: 24 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.1, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="flex-1 glass-card rounded-2xl p-5 mb-6 group"
        style={{ '--glow': degree.glow }}
      >
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">

          {/* info principal */}
          <div className="flex-1 min-w-0">
            {/* tipo + badge atual */}
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <span
                className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
                style={{
                  background: `${degree.dot}15`,
                  border: `1px solid ${degree.dot}35`,
                  color: degree.dot,
                }}
              >
                {degree.type === 'Pós-graduação' ? t('edu.type_postgrad') : t('edu.type_grad')}
              </span>

              {degree.current && (
                <span
                  className="text-[10px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1"
                  style={{
                    background: 'rgba(0,212,255,0.08)',
                    border: '1px solid rgba(0,212,255,0.25)',
                    color: '#00d4ff',
                  }}
                >
                  <span
                    className="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={{ background: '#00d4ff' }}
                  />
                  {t('edu.status_progress')}
                </span>
              )}
            </div>

            {/* curso */}
            <h3
              className="font-display font-bold text-white mb-1 leading-snug transition-colors duration-300 group-hover:text-neon-cyan"
              style={{ fontSize: 'clamp(0.95rem,2vw,1.1rem)' }}
            >
              {t(degree.courseKey)}
            </h3>

            {/* instituição */}
            <div className="flex items-center gap-1.5">
              <FiAward size={12} style={{ color: degree.dot }} />
              <span className="text-sm font-semibold" style={{ color: degree.dot }}>
                {t(degree.instKey)}
              </span>
            </div>
          </div>

          {/* período */}
          <div
            className="flex items-center gap-1.5 flex-shrink-0 self-start sm:self-auto px-3 py-1.5 rounded-lg"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
            }}
          >
            <FiCalendar size={12} className="text-gray-500" />
            <span className="text-xs font-mono text-gray-400 whitespace-nowrap">
              {degree.period}
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default function Education() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="formacao">
      <div className="max-w-4xl mx-auto">

        {/* header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4 block"
          >
            {t('edu.title_label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            {t('edu.title_main')}{' '}
            <span className="gradient-text">{t('edu.title_highlight')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm mt-3 max-w-md mx-auto"
          >
            {t('edu.description')}
          </motion.p>
        </div>

        {/* stat strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          {[
            { value: t('edu.stat1_value'), label: t('edu.stat1_label') },
            { value: t('edu.stat2_value'), label: t('edu.stat2_label') },
            { value: t('edu.stat3_value'), label: t('edu.stat3_label') },
          ].map((s, i) => (
            <div
              key={s.label}
              className="glass-card rounded-2xl p-4 text-center"
            >
              <p
                className="font-display font-bold gradient-text mb-1"
                style={{ fontSize: 'clamp(1.4rem,3vw,1.9rem)' }}
              >
                {s.value}
              </p>
              <p className="text-gray-500 text-[11px] uppercase tracking-wider leading-tight">
                {s.label}
              </p>
            </div>
          ))}
        </motion.div>

        {/* timeline */}
        <div>
          {degrees.map((degree, i) => (
            <TimelineItem
              key={degree.institution + degree.period}
              degree={degree}
              index={i}
              total={degrees.length}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
