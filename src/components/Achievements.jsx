import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FiAward, FiX, FiZoomIn } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import SectionWrapper from './SectionWrapper'
import { achievements } from '../data/achievements'

function AchievementCard({ item, index, onOpen }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const [hovered, setHovered] = useState(false)
  const { t } = useTranslation()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? item.color + '55' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 0 30px ${item.glow}` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* imagem */}
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative overflow-hidden block w-full"
        style={{ aspectRatio: '16/10', background: 'rgba(255,255,255,0.02)', cursor: 'zoom-in' }}
        aria-label={t(item.titleKey)}
      >
        <img
          src={item.image}
          alt={t(item.titleKey)}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500"
          style={{ transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
        />

        {/* badge de posição */}
        <div
          className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold text-white"
          style={{ background: item.gradient, boxShadow: `0 0 18px ${item.glow}` }}
        >
          <span style={{ fontSize: 14 }}>{item.medal}</span>
          {t(item.rankKey)}
        </div>

        {/* overlay zoom */}
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-white text-xs font-semibold"
              style={{ background: `${item.color}26`, backdropFilter: 'blur(3px)' }}
            >
              <FiZoomIn size={16} />
              {t('ach.view_image')}
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: item.color + 'cc' }}>
          {t(item.platformKey)}
        </span>

        <h3 className="text-white font-display font-semibold text-base leading-snug">
          {t(item.titleKey)}
        </h3>

        <p className="text-gray-500 text-sm leading-relaxed flex-1">
          {t(item.descKey)}
        </p>

        <div className="relative h-px overflow-hidden rounded-full" style={{ background: 'rgba(255,255,255,0.05)' }}>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ delay: index * 0.1 + 0.3, duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0 origin-left rounded-full"
            style={{ background: item.gradient }}
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {item.tags.map(tag => (
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
      </div>
    </motion.div>
  )
}

function Lightbox({ item, onClose }) {
  const { t } = useTranslation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      className="fixed inset-0 z-[120] flex items-center justify-center p-4"
      style={{ background: 'rgba(3,0,20,0.9)', backdropFilter: 'blur(10px)' }}
    >
      <motion.div
        initial={{ scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.92, opacity: 0 }}
        transition={{ duration: 0.25 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-5xl w-full rounded-2xl overflow-hidden"
        style={{ border: `1px solid ${item.color}40`, boxShadow: `0 0 60px ${item.glow}` }}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar"
          className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full flex items-center justify-center text-white"
          style={{ background: 'rgba(3,0,20,0.7)', border: '1px solid rgba(255,255,255,0.15)' }}
        >
          <FiX size={18} />
        </button>
        <img src={item.image} alt={t(item.titleKey)} className="w-full h-auto block" />
        <div className="p-4" style={{ background: 'rgba(3,0,20,0.85)' }}>
          <span className="text-[11px] font-mono uppercase tracking-wider" style={{ color: item.color + 'cc' }}>
            {t(item.platformKey)}
          </span>
          <p className="text-white text-sm mt-1">{t(item.titleKey)}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Achievements() {
  const { t } = useTranslation()
  const [active, setActive] = useState(null)

  return (
    <SectionWrapper id="conquistas">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4 inline-flex items-center gap-2"
          >
            <FiAward size={13} />
            {t('ach.title_label')}
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            {t('ach.title_main')}{' '}
            <span className="gradient-text">{t('ach.title_highlight')}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm mt-3 max-w-xl mx-auto leading-relaxed"
          >
            {t('ach.description')}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {achievements.map((item, i) => (
            <AchievementCard key={item.id} item={item} index={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active && <Lightbox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </SectionWrapper>
  )
}
