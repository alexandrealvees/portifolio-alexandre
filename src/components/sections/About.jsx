import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'
import SectionWrapper from '../ui/SectionWrapper'
import { useTranslation } from 'react-i18next'

export default function About() {
  const { t } = useTranslation();

  return (
    <SectionWrapper id="sobre">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Lado Esquerdo - Textos */}
          <div className="space-y-8">
            <div>
              <motion.span 
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xs font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4 block"
              >
                {t('about.title_label')}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="font-display font-bold text-white leading-tight"
                style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
              >
                {t('about.title_main')}<br/>
                <span className="gradient-text">{t('about.title_highlight')}</span>
              </motion.h2>
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="space-y-6 text-gray-400 text-lg leading-relaxed"
            >
              <p>{t('about.p1')}</p>
              <p>{t('about.p2')}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              {/* Se quiser que esse botão mande email, pode trocar o href */}
              <a href="mailto:contato@alexandrealves.dev" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all duration-300 group"
                style={{
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                onMouseLeave={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
              >
                {t('about.contact_btn')}
                <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>

          {/* Lado Direito - Stats */}
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: t('about.stat1_value'), label: t('about.stat1_label'), color: '#00d4ff' },
              { value: t('about.stat2_value'), label: t('about.stat2_label'), color: '#8b5cf6' },
              { value: t('about.stat3_value'), label: t('about.stat3_label'), color: '#ec4899', colSpan: true },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + (i * 0.1) }}
                className={`glass-card rounded-3xl p-8 flex flex-col justify-center ${stat.colSpan ? 'col-span-2' : ''}`}
                style={{ 
                  aspectRatio: stat.colSpan ? 'auto' : '1/1',
                  minHeight: stat.colSpan ? '160px' : 'auto'
                }}
              >
                <span className="font-display font-bold text-4xl lg:text-5xl mb-2" style={{ color: stat.color }}>
                  {stat.value}
                </span>
                <span className="text-gray-400 text-sm font-mono uppercase tracking-wider">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </SectionWrapper>
  )
}
