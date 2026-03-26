import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  SiPython, SiJavascript, SiGo, SiRust, SiPhp, SiHtml5, SiPostgresql,
  SiBurpsuite, SiMetasploit, SiWireshark, SiKalilinux, SiGnubash, SiOwasp,
} from 'react-icons/si'
import { FiCode, FiTool, FiBookOpen, FiStar, FiCpu, FiTerminal, FiZap } from 'react-icons/fi'
import { DiJava } from 'react-icons/di'
import SectionWrapper from './SectionWrapper'
import { useTranslation } from 'react-i18next'

/* ─── dados ─────────────────────────────────────────────────── */

const tools = [
  { name: 'Burp Suite',   icon: SiBurpsuite },
  { name: 'Metasploit',   icon: SiMetasploit },
  { name: 'Wireshark',    icon: SiWireshark },
  { name: 'Nmap',         icon: FiTerminal },
  { name: 'Kali Linux',   icon: SiKalilinux },
  { name: 'Gobuster',     icon: FiTool },
  { name: 'BloodHound',   icon: FiTool },
  { name: 'Mimikatz',     icon: FiTool },
  { name: 'Rubeus',       icon: FiTool },
]

const languages = [
  { name: 'Python',      icon: SiPython,     color: '#3b82f6' },
  { name: 'Java',        icon: DiJava,       color: '#f59e0b' },
  { name: 'JavaScript',  icon: SiJavascript, color: '#facc15' },
  { name: 'Go',          icon: SiGo,         color: '#00d4ff' },
  { name: 'Rust',        icon: SiRust,       color: '#f97316' },
  { name: 'PHP',         icon: SiPhp,        color: '#8b5cf6' },
  { name: 'Bash',        icon: SiGnubash,    color: '#10b981' },
  { name: 'PowerShell',  icon: FiZap,        color: '#3b82f6' },
  { name: 'HTML / CSS',  icon: SiHtml5,      color: '#f97316' },
  { name: 'SQL',         icon: SiPostgresql, color: '#00d4ff' },
]

const methodologies = [
  { name: 'OWASP Top 10',        icon: SiOwasp,    descKey: 'skills.meth1_desc' },
  { name: 'PTES',                icon: FiBookOpen, descKey: 'skills.meth2_desc' },
  { name: 'MITRE ATT&CK',        icon: FiCpu,      descKey: 'skills.meth3_desc' },
  { name: 'Red Team Kill Chain', icon: FiStar,     descKey: 'skills.meth4_desc' },
]

const specialties = [
  { labelKey: 'skills.spec1',                 gradient: 'linear-gradient(135deg,#00d4ff,#3b82f6)' },
  { labelKey: 'skills.spec2',                     gradient: 'linear-gradient(135deg,#3b82f6,#8b5cf6)' },
  { labelKey: 'skills.spec3',                gradient: 'linear-gradient(135deg,#8b5cf6,#ec4899)' },
  { labelKey: 'skills.spec4',               gradient: 'linear-gradient(135deg,#ec4899,#f97316)' },
  { labelKey: 'skills.spec5',                        gradient: 'linear-gradient(135deg,#f97316,#f59e0b)' },
  { labelKey: 'skills.spec6',                  gradient: 'linear-gradient(135deg,#f59e0b,#10b981)' },
  { labelKey: 'skills.spec7',         gradient: 'linear-gradient(135deg,#10b981,#00d4ff)' },
  { labelKey: 'skills.spec8', gradient: 'linear-gradient(135deg,#00d4ff,#8b5cf6)' },
]

/* ─── sub-componentes ───────────────────────────────────────── */

function BlockHeader({ icon: Icon, label, color }) {
  return (
    <div className="flex items-center gap-2 mb-5">
      <div
        className="w-7 h-7 rounded-lg flex items-center justify-center"
        style={{ background: `${color}18`, border: `1px solid ${color}33` }}
      >
        <Icon size={14} style={{ color }} />
      </div>
      <span className="text-xs font-mono uppercase tracking-[0.22em]" style={{ color }}>
        {label}
      </span>
    </div>
  )
}

function ToolPill({ name, Icon, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.05, duration: 0.35 }}
      className="flex items-center gap-2 px-3 py-2 rounded-xl transition-all duration-300 cursor-default group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.07)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = 'rgba(0,212,255,0.06)'
        e.currentTarget.style.borderColor = 'rgba(0,212,255,0.25)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
      }}
    >
      <Icon size={14} className="text-gray-500 group-hover:text-neon-cyan transition-colors" />
      <span className="text-xs font-mono text-gray-400 group-hover:text-white transition-colors whitespace-nowrap">
        {name}
      </span>
    </motion.div>
  )
}

function LangChip({ lang, index, inView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      className="flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300 cursor-default group"
      style={{
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.06)',
        minWidth: 68,
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background = `${lang.color}10`
        e.currentTarget.style.borderColor = `${lang.color}40`
        e.currentTarget.style.boxShadow = `0 0 18px ${lang.color}18`
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background = 'rgba(255,255,255,0.03)'
        e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
        e.currentTarget.style.boxShadow = 'none'
      }}
    >
      <lang.icon size={22} style={{ color: lang.color, transition: 'all 0.3s' }} />
      <span className="text-[10px] font-mono text-gray-500 group-hover:text-white transition-colors text-center leading-tight">
        {lang.name}
      </span>
    </motion.div>
  )
}

/* ─── componente principal ──────────────────────────────────── */

export default function TechSkills() {
  const { t } = useTranslation()
  const [toolsRef, toolsInView]   = useInView({ triggerOnce: true, threshold: 0.1 })
  const [langsRef, langsInView]   = useInView({ triggerOnce: true, threshold: 0.1 })
  const [methRef,  methInView]    = useInView({ triggerOnce: true, threshold: 0.1 })
  const [specRef,  specInView]    = useInView({ triggerOnce: true, threshold: 0.1 })

  return (
    <SectionWrapper id="habilidades">
      <div className="max-w-7xl mx-auto space-y-8">

        {/* ── HEADER ─────────────────────────────────────────── */}
        <div className="text-center mb-8">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4 block"
          >
            {t('skills.title_label')}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="font-display font-bold text-white"
            style={{ fontSize: 'clamp(1.8rem,4vw,3rem)' }}
          >
            {t('skills.title_main')}{' '}
            <span className="gradient-text">{t('skills.title_highlight')}</span>
          </motion.h2>
        </div>

        {/* ── LINHA 1: Ferramentas + Linguagens ──────────────── */}
        <div className="grid lg:grid-cols-[1fr_1.1fr] gap-6">

          {/* Ferramentas */}
          <motion.div
            ref={toolsRef}
            initial={{ opacity: 0, y: 24 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="glass-card rounded-2xl p-6"
          >
            <BlockHeader icon={FiTool} label={t('skills.tools')} color="#00d4ff" />
            <div className="flex flex-wrap gap-2">
              {tools.map((t, i) => (
                <ToolPill key={t.name} name={t.name} Icon={t.icon} index={i} inView={toolsInView} />
              ))}
            </div>
          </motion.div>

          {/* Linguagens */}
          <motion.div
            ref={langsRef}
            initial={{ opacity: 0, y: 24 }}
            animate={langsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="glass-card rounded-2xl p-6"
          >
            <BlockHeader icon={FiCode} label={t('skills.languages')} color="#8b5cf6" />
            <div className="flex flex-wrap gap-2">
              {languages.map((l, i) => (
                <LangChip key={l.name} lang={l} index={i} inView={langsInView} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── LINHA 2: Metodologias ───────────────────────────── */}
        <motion.div
          ref={methRef}
          initial={{ opacity: 0, y: 24 }}
          animate={methInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <BlockHeader icon={FiBookOpen} label={t('skills.methodologies')} color="#10b981" />
          <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {methodologies.map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, x: -16 }}
                animate={methInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.08 }}
                className="group flex flex-col gap-2 p-4 rounded-xl transition-all duration-300"
                style={{
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(16,185,129,0.05)'
                  e.currentTarget.style.borderColor = 'rgba(16,185,129,0.2)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.02)'
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'
                }}
              >
                <div className="flex items-center gap-2">
                  <m.icon size={14} className="text-green-400 flex-shrink-0" />
                  <span className="text-white text-sm font-semibold font-display group-hover:text-green-400 transition-colors">
                    {m.name}
                  </span>
                </div>
                <p className="text-gray-600 text-[11px] leading-relaxed">
                  {t(m.descKey)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* ── LINHA 3: Especialidades ─────────────────────────── */}
        <motion.div
          ref={specRef}
          initial={{ opacity: 0, y: 24 }}
          animate={specInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="glass-card rounded-2xl p-6"
        >
          <BlockHeader icon={FiStar} label={t('skills.specialties')} color="#ec4899" />
          <div className="flex flex-wrap gap-3">
            {specialties.map((s, i) => (
              <motion.div
                key={s.labelKey}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={specInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: i * 0.07 }}
                className="relative px-4 py-2 rounded-xl text-sm font-medium text-white cursor-default transition-all duration-300 overflow-hidden group"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0,0,0,0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* barra de gradiente no topo */}
                <div
                  className="absolute top-0 left-0 right-0 h-[2px] opacity-70"
                  style={{ background: s.gradient }}
                />
                <span className="relative z-10 text-xs font-mono text-gray-300 group-hover:text-white transition-colors">
                  {t(s.labelKey)}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </SectionWrapper>
  )
}
