import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { FiExternalLink, FiImage, FiFilter, FiCalendar } from 'react-icons/fi'
import GrainOverlay from '../components/GrainOverlay'
import BackHeader from '../components/BackHeader'
import { ORGS } from '../data/orgs'
import { certifications } from '../data/certifications'

function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const { t } = useTranslation()
  const org = ORGS[cert.org]

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setIsExpanded(!isExpanded)}
      className="group rounded-2xl overflow-hidden flex flex-col cursor-pointer"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? org.color + '50' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 0 28px ${org.color}20` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >

      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16/10', background: 'rgba(255,255,255,0.02)' }}
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (

          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: `${org.color}18`, border: `1.5px dashed ${org.color}50` }}
            >
              <FiImage size={22} style={{ color: org.color }} />
            </div>
            <p className="text-[10px] font-mono text-center px-4 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              {t('certpage.add_image')}<br />
              <span style={{ color: org.color + 'aa' }}>src/images/certs/{cert.id}.jpg</span>
            </p>
          </div>
        )}

        {cert.status === 'preparation' && (
          <div
            className="absolute top-2 right-2 px-2 py-0.5 rounded-md text-[9px] font-mono uppercase tracking-wider"
            style={{
              background: 'rgba(245,158,11,0.15)',
              border: '1px solid rgba(245,158,11,0.35)',
              color: '#f59e0b',
              backdropFilter: 'blur(6px)',
            }}
          >
            {t('certs.status_prep')}
          </div>
        )}

        {/* hover overlay instrução de clique */}
        <AnimatePresence>
          {hovered && !isExpanded && cert.validateUrl && cert.status !== 'preparation' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center text-white text-xs font-semibold"
              style={{ background: `${org.color}30`, backdropFilter: 'blur(4px)' }}
            >
              {t('certpage.expand')}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── info ── */}
      <div className="p-4 flex flex-col justify-between flex-1">
        <div className="flex items-start gap-2 mb-3">
          <p className="text-white font-display font-semibold text-sm leading-snug group-hover:transition-colors line-clamp-2"
            style={{ transition: 'color 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.color = org.color}
            onMouseLeave={e => e.currentTarget.style.color = '#fff'}
            title={`${cert.code} – ${cert.name}`}
          >
            {cert.code} – {cert.name}
          </p>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className="text-[11px] font-mono truncate mr-2" style={{ color: org.color + 'cc' }}>
            {org.label}
          </span>
          {cert.date && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-gray-600 flex-shrink-0">
              <FiCalendar size={10} />
              {cert.date}
            </span>
          )}
        </div>
      </div>

      {/* ── área expandida (acordeão) ── */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4">
              {cert.validateUrl && cert.status !== 'preparation' && (
                <a
                  href={cert.validateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300"
                  style={{
                    background: `linear-gradient(135deg, ${org.color}40, rgba(255,255,255,0.05))`,
                    border: `1px solid ${org.color}60`,
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = org.color;
                    e.currentTarget.style.boxShadow = `0 0 20px ${org.color}50`;
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = `linear-gradient(135deg, ${org.color}40, rgba(255,255,255,0.05))`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  <FiExternalLink size={16} />
                  {t('certpage.validate')}
                </a>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function CertificationsPage() {
  const { t } = useTranslation()
  const [orgFilter, setOrgFilter] = useState('ALL')
  const [sortBy, setSortBy]       = useState('org')

  const filtered = useMemo(() => {
    let list = [...certifications]
    if (orgFilter !== 'ALL') list = list.filter(c => c.org === orgFilter)
    if (sortBy === 'date') {
      list.sort((a, b) => {
        if (!a.date && !b.date) return 0
        if (!a.date) return 1
        if (!b.date) return -1
        return new Date(b.date) - new Date(a.date)
      })
    } else if (sortBy === 'org') {
      list.sort((a, b) => a.org.localeCompare(b.org))
    } else if (sortBy === 'name') {
      list.sort((a, b) => a.name.localeCompare(b.name))
    }
    return list
  }, [orgFilter, sortBy])

  return (
    <div style={{ minHeight: '100vh', background: '#030014', color: '#fff' }}>
      <GrainOverlay />

      <BackHeader maxWidth={1280} title={t('certpage.title')} emoji="🎓" />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '28px 32px 0' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          padding: '14px 20px', borderRadius: 14, flexWrap: 'wrap',
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.07)',
        }}>
          <FiFilter size={14} style={{ color: 'rgba(255,255,255,0.3)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {t('certpage.filter_org')}
            </span>
            <select
              value={orgFilter}
              onChange={e => setOrgFilter(e.target.value)}
              style={{
                background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.3)',
                color: '#00d4ff', borderRadius: 8, padding: '4px 10px',
                fontSize: 11, fontFamily: 'monospace', cursor: 'pointer', outline: 'none',
              }}
            >
              <option value="ALL">{t('certpage.all')}</option>
              {Object.entries(ORGS).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>

          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              {t('certpage.sort_by')}
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              style={{
                background: 'rgba(0,212,255,0.08)', border: '1px solid rgba(0,212,255,0.3)',
                color: '#00d4ff', borderRadius: 8, padding: '4px 10px',
                fontSize: 11, fontFamily: 'monospace', cursor: 'pointer', outline: 'none',
              }}
            >
              <option value="org">{t('certpage.sort_org')}</option>
              <option value="date">{t('certpage.sort_date')}</option>
              <option value="name">{t('certpage.sort_name')}</option>
            </select>
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)' }}>
              {t('certpage.count', { count: filtered.length })}
            </span>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 80px' }}>
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 20,
            alignItems: 'start',
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((cert, i) => (
              <CertCard key={cert.id} cert={cert} index={i} />
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}
