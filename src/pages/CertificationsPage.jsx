import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiArrowLeft, FiExternalLink, FiImage, FiFilter, FiCalendar } from 'react-icons/fi'
import GrainOverlay from '../components/GrainOverlay'

import imgAdrts from '../images/certs/cwl/adrts.png'
import imgApi from '../images/certs/cwl/api.png'
import imgCrt from '../images/certs/cwl/crt.png'
import imgCrta from '../images/certs/cwl/crta.png'
import imgCoi from '../images/certs/cwl/coi.png'
import imgWebrta from '../images/certs/cwl/webrta.png'
import imgCapt from '../images/certs/hackviser/capt.jpg'
import imgCwse from '../images/certs/hackviser/cwse.png'
import imgEjpt from '../images/certs/ine/ejpt.png'
import imgCapen from '../images/certs/thesecgroup/capen.jpg'
import imgCnpen from '../images/certs/thesecgroup/cnpen.jpg'
import imgAz900 from '../images/certs/microsoft/az900.jpg'
import imgSc900 from '../images/certs/microsoft/sc900.png'
import imgAws from '../images/certs/aws/aws.jpg'


const ORGS = {
  CWL:    { label: 'Cyber Warfare Labs', color: '#8b5cf6' },
  SECOPS: { label: 'SecOps Group',       color: '#ec4899' },
  SOLYD:  { label: 'Solyd Offensive Sec',color: '#00d4ff' },
  INE:    { label: 'INE Security',       color: '#10b981' },
  DESEC:  { label: 'Desec Security',     color: '#f59e0b' },
  HACKVISER: { label: 'Hackviser',       color: '#f43f5e' },
  MICROSOFT: { label: 'Microsoft',       color: '#1621b8' },
  AWS:      { label: 'Aws',              color: '#678685' }
}

const certifications = [
  {
    id: 'cnpen',
    code: 'CNPen',
    name: 'Certified Network Pentester',
    org: 'SECOPS',
    date: '2025-03-05',
    image: imgCnpen,
    validateUrl: 'https://candidate.speedexam.net/certificate.aspx?SSTATE=am4131EniU8ntjp4bO5mXc4xvvlQZkbUYKRKB7R16s42gxdt/zxQw5JcbyfsxpBhERxqoBjp/ss/H4gh51Ly7vKr27bes4cQs3oyhQQ/hZU=',
    status: 'active',
  },
  {
    id: 'capen',
    code: 'CAPen',
    name: 'Certified AppSec Pentester',
    org: 'SECOPS',
    date: '2026-03-18',
    image: imgCapen,
    validateUrl: 'https://candidate.speedexam.net/certificate.aspx?SSTATE=am4131EniU8ntjp4bO5mXRP/f0873MHBb6afedIUIwGJdvvMiU6efJYWPxjGVVtoKYMxD/g1cxPe8LQgfYijkC/XHv3nR/OgRDXEYHhBQ6k=',
    status: 'active',
  },
  {
    id: 'crta',
    code: 'CRTA',
    name: 'Certified Red Team Analyst',
    org: 'CWL',
    date: '2025-08-25',
    image: imgCrta,
    validateUrl: 'https://labs.cyberwarfare.live/credential/achievement/68acee4a686776e85bfe058d',
    status: 'active',
  },
  {
    id: 'crt-id',
    code: 'CRT-ID',
    name: 'Certified Red Team - Infra Dev',
    org: 'CWL',
    date: '2025-08-30',
    image: imgCrt,
    validateUrl: 'https://labs.cyberwarfare.live/credential/achievement/68b388166ca4d8b67760f4a8',
    status: 'active',
  },
  {
    id: 'crt-coi',
    code: 'CRT-COI',
    name: 'Certified Red Team - CredOps Infiltrator',
    org: 'CWL',
    date: null,
    image: imgCoi,
    validateUrl: 'https://labs.cyberwarfare.live/credential/achievement/6938c9cd4ae64839616f523d',
    status: 'active',
  },
  {
    id: 'adrts',
    code: 'AD-RTS',
    name: 'Active Directory Red Team Specialist',
    org: 'CWL',
    date: '2025-12-21',
    image: imgAdrts,
    validateUrl: 'https://labs.cyberwarfare.live/credential/achievement/69207bd84ae648396166b9e5',
    status: 'active',
  },
  {
    id: 'cwl-api',
    code: 'API-RTA',
    name: 'API Red Team Analyst',
    org: 'CWL',
    date: '2025-12-24',
    image: imgApi,
    validateUrl: 'https://labs.cyberwarfare.live/credential/achievement/694b3a5f03711ca7db93f222',
    status: 'active',
  },
  {
    id: 'webrta',
    code: 'WEB-RTA',
    name: 'Web Red Team Analyst',
    org: 'CWL',
    date: '2025-11-19',
    image: imgWebrta,
    validateUrl: 'https://labs.cyberwarfare.live/credential/achievement/691e169f9f54e3df3caf5242',
    status: 'active',
  },
  {
    id: 'capt',
    code: 'CAPT',
    name: 'Certified AppSec Pentester',
    org: 'HACKVISER',
    date: '2025-10-20',
    image: imgCapt,
    validateUrl: 'https://hackviser.com/verify?id=HV-CAPT-W733I3ME',
    status: 'active',
  },
  {
    id: 'cwse',
    code: 'CWSE',
    name: 'Certified Web Security Expert',
    org: 'HACKVISER',
    date: '2025-11-14',
    image: imgCwse,
    validateUrl: 'https://hackviser.com/verify?id=HV-CWSE-UGF3NQEP',
    status: 'active',
  },
  {
    id: 'ejpt',
    code: 'eJPTv2',
    name: 'Junior Penetration Tester v2',
    org: 'INE',
    date: '2025-11-14',
    image: imgEjpt,
    validateUrl: 'https://certs.ine.com/9a290727-5619-4573-86cd-fae2899002ed#acc.8BEeH64b',
    status: 'active',
  },
  {
    id: 'az900',
    code: 'AZ-900',
    name: 'Conceitos básicos do Azure',
    org: 'MICROSOFT',
    date: null,
    image: imgAz900,
    validateUrl: 'https://learn.microsoft.com/api/credentials/share/pt-br/AlexandreAlves-3748/908D6850A5ECEE84?sharingId=2D21C3AF90AFED56',
    status: 'active',
  },
    {
    id: 'sc900',
    code: 'SC-900',
    name: 'Fundamentos de segurança, conformidade e identidade da Microsoft',
    org: 'MICROSOFT',
    date: null,
    image: imgSc900,
    validateUrl: 'https://learn.microsoft.com/api/credentials/share/pt-br/AlexandreAlves-3748/4F0A7519010D1782?sharingId=2D21C3AF90AFED56',
    status: 'active',
  },
   {
    id: 'aws',
    code: 'AWS',
    name: 'Certified Cloud Practitioner',
    org: 'AWS',
    date: null,
    image: imgAws,
    validateUrl: 'https://www.credly.com/badges/49047fd6-47a3-4d4a-9809-03ae0ec8a919/linked_in_profile',
    status: 'active',
  },
]

/* ── sub-componentes ───────────────────────────────────────────── */

function CertCard({ cert, index }) {
  const [hovered, setHovered] = useState(false)
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
      className="group rounded-2xl overflow-hidden flex flex-col"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: `1px solid ${hovered ? org.color + '50' : 'rgba(255,255,255,0.07)'}`,
        boxShadow: hovered ? `0 0 28px ${org.color}20` : 'none',
        transition: 'border-color 0.3s, box-shadow 0.3s',
      }}
    >
      {/* ── thumbnail ── */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16/10', background: 'rgba(255,255,255,0.02)' }}
      >
        {cert.image ? (
          <img
            src={cert.image}
            alt={cert.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          /* placeholder */
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center"
              style={{ background: `${org.color}18`, border: `1.5px dashed ${org.color}50` }}
            >
              <FiImage size={22} style={{ color: org.color }} />
            </div>
            <p className="text-[10px] font-mono text-center px-4 leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.2)' }}>
              Adicione a imagem em<br />
              <span style={{ color: org.color + 'aa' }}>src/images/certs/{cert.id}.jpg</span>
            </p>
          </div>
        )}

        {/* status em preparação */}
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
            Em prep.
          </div>
        )}

        {/* hover overlay com link */}
        <AnimatePresence>
          {hovered && cert.validateUrl && cert.status !== 'preparation' && (
            <motion.a
              href={cert.validateUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center gap-2 text-white text-xs font-semibold"
              style={{ background: `${org.color}30`, backdropFilter: 'blur(4px)' }}
            >
              <FiExternalLink size={16} />
              Validar credencial
            </motion.a>
          )}
        </AnimatePresence>
      </div>

      {/* ── info ── */}
      <div className="p-4 flex flex-col gap-1 flex-1">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-white font-display font-semibold text-sm leading-snug group-hover:transition-colors"
              style={{ transition: 'color 0.2s' }}
              onMouseEnter={e => e.currentTarget.style.color = org.color}
              onMouseLeave={e => e.currentTarget.style.color = '#fff'}
            >
              {cert.code} – {cert.name}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="text-[11px] font-mono" style={{ color: org.color + 'cc' }}>
            {org.label}
          </span>
          {cert.date && (
            <span className="flex items-center gap-1 text-[10px] font-mono text-gray-600">
              <FiCalendar size={10} />
              {cert.date}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  )
}

/* ── página principal ──────────────────────────────────────────── */

export default function CertificationsPage() {
  const navigate = useNavigate()
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

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(3,0,20,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '14px 32px', display: 'flex', alignItems: 'center', gap: 20 }}>
          <button
            onClick={() => navigate('/')}
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
            Voltar
          </button>

          <div style={{ flex: 1, textAlign: 'center' }}>
            <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, margin: 0 }}>
              <span style={{ fontSize: 22 }}>🎓</span>
              <span style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700, fontSize: 22,
                background: 'linear-gradient(135deg,#00d4ff,#8b5cf6)',
                WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
              }}>
                Certificações
              </span>
            </h1>
          </div>

          <div style={{ width: 80 }} />
        </div>
      </div>

      {/* ── FILTROS ────────────────────────────────────────────── */}
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
              Organização:
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
              <option value="ALL">All</option>
              {Object.entries(ORGS).map(([key, val]) => (
                <option key={key} value={key}>{val.label}</option>
              ))}
            </select>
          </div>

          <div style={{ width: 1, height: 18, background: 'rgba(255,255,255,0.1)' }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              Ordenar por:
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
              <option value="org">Organização</option>
              <option value="date">Data</option>
              <option value="name">Nome</option>
            </select>
          </div>

          <div style={{ marginLeft: 'auto' }}>
            <span style={{ fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.25)' }}>
              {filtered.length} certificação{filtered.length !== 1 ? 'ões' : ''}
            </span>
          </div>
        </div>
      </div>

      {/* ── GRID ───────────────────────────────────────────────── */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '24px 32px 80px' }}>
        <motion.div
          layout
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 20,
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
