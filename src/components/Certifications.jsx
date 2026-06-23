import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FiAward, FiCheckCircle, FiClock, FiArrowRight } from 'react-icons/fi'
import { useTranslation } from 'react-i18next'
import SectionWrapper from './SectionWrapper'
import { certifications as allCerts } from '../data/certifications'
import { ORGS } from '../data/orgs'

// View-model derivado da fonte única: a home usa o badge (sem imagem),
// com label/cor/gradiente vindos da org.
const certifications = allCerts.map(cert => {
  const org = ORGS[cert.org]
  return {
    code: cert.code,
    name: cert.name,
    issuer: org.label,
    status: cert.status,
    color: org.color,
    gradient: org.gradient,
  }
})

// Lista de emissores gerada dinamicamente a partir das certificações.
const issuersMap = certifications.reduce((acc, cert) => {
  if (!acc[cert.issuer]) {
    acc[cert.issuer] = { name: cert.issuer, count: 0, gradient: cert.gradient }
  }
  acc[cert.issuer].count += 1
  return acc
}, {})

const issuers = Object.values(issuersMap).sort((a, b) => b.count - a.count)

function CertCard({ cert, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.15 })
  const { t } = useTranslation()

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.07, duration: 0.55 }}
      className="glass-card rounded-2xl p-5 group flex items-start gap-4"
    >
      {/* código badge ou imagem */}
      {cert.image ? (
        <div
          className="flex-shrink-0 w-14 h-14 rounded-xl overflow-hidden border border-white/10"
          style={{ boxShadow: `0 0 18px ${cert.color}33` }}
        >
          <img src={cert.image} alt={cert.code} className="w-full h-full object-cover" />
        </div>
      ) : (
        <div
          className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-[10px] font-mono font-bold text-white text-center leading-tight"
          style={{ background: cert.gradient, boxShadow: `0 0 18px ${cert.color}33` }}
        >
          {cert.code.split('-').map((p, i) => <span key={i} className="block">{p}</span>)}
        </div>
      )}

      {/* info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-white font-semibold text-sm leading-snug group-hover:text-neon-cyan transition-colors duration-300">
            {cert.name}
          </h3>

          {cert.status === 'preparation' ? (
            <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(245,158,11,0.12)', border: '1px solid rgba(245,158,11,0.3)', color: '#f59e0b' }}>
              <FiClock size={10} />
              {t('certs.status_prep')}
            </span>
          ) : (
            <span className="flex-shrink-0 flex items-center gap-1 text-[10px] font-mono px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.25)', color: '#10b981' }}>
              <FiCheckCircle size={10} />
              {t('certs.status_active')}
            </span>
          )}
        </div>

        <p className="text-gray-500 text-xs mt-1">{cert.issuer}</p>
      </div>
    </motion.div>
  )
}

export default function Certifications() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="certificacoes">
      <div className="max-w-7xl mx-auto">

        {/* header */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4 block"
          >
            {t('certs.title_label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            {t('certs.title_main')}{' '}
            <span className="gradient-text">{t('certs.title_highlight')}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-500 text-sm mt-3 max-w-lg mx-auto"
          >
            {t('certs.description')}
          </motion.p>
        </div>

        <div className="grid lg:grid-cols-[1fr_280px] gap-10">

          {/* lista de certs */}
          <div className="grid sm:grid-cols-2 gap-4">
            {certifications.map((cert, i) => (
              <CertCard key={cert.code} cert={cert} index={i} />
            ))}
          </div>

          {/* sidebar direita */}
          <div className="space-y-6">

            {/* issuers */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6"
            >
              <h3 className="text-xs font-mono text-gray-500 uppercase tracking-wider mb-5 flex items-center gap-2">
                <FiAward size={13} className="text-neon-cyan" />
                {t('certs.issuers_title')}
              </h3>
              <div className="space-y-3">
                {issuers.map((issuer) => (
                  <div key={issuer.name} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <div
                        className="w-2 h-2 rounded-full flex-shrink-0"
                        style={{ background: issuer.gradient }}
                      />
                      <span className="text-gray-300 text-xs truncate">{issuer.name}</span>
                    </div>
                    <span
                      className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                      style={{ background: 'rgba(255,255,255,0.05)', color: 'rgba(255,255,255,0.4)' }}
                    >
                      {issuer.count}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-3"
            >
              <Link
                to="/certificacoes"
                className="flex items-center justify-between gap-2 px-5 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 group"
                style={{
                  background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)',
                  boxShadow: '0 0 20px rgba(0,212,255,0.25)',
                  textDecoration: 'none',
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = '0 0 35px rgba(0,212,255,0.5)'}
                onMouseLeave={e => e.currentTarget.style.boxShadow = '0 0 20px rgba(0,212,255,0.25)'}
              >
                <span>{t('certs.view_all_btn')}</span>
                <FiArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
