import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper from './SectionWrapper'

const experiences = [
  {
    role: 'Engenheiro de Segurança (Offensive-Focused)',
    company: 'Loqed Systems',
    period: '2024 — Presente',
    description: 'Conduzir avaliações de segurança em novos produtos e nas mudanças de requisitos de negócios em toda a organização. Correlacionar achados de segurança de múltiplas fontes com as necessidades do negócio, transformando avaliações de risco e insights de prevenção de fraude em correções que realmente fazem a diferença. Criar padrões de segurança e guias de implementação para o rollout da plataforma interna da Cielo.',
    techs: ['Security Assessment', 'Risk Analysis', 'Fraud Prevention'],
    type: 'full-time',
  },
  {
    role: 'Analista de Segurança II',
    company: 'Loqed Systems',
    period: '2023 — 2024',
    description: 'Pentests e análises de segurança em Web, API e mobile (Android/iOS). Elaboração de relatórios técnicos e executivos. Participação em sprints com squads de desenvolvimento (DevSecOps).',
    techs: ['Pentesting', 'Web Security', 'API Security', 'Mobile Security', 'DevSecOps'],
    type: 'full-time',
  },
  {
    role: 'Engenheiro de Software',
    company: 'Loqed Systems',
    period: '2024 — Presente',
    description: 'Engenheiro de Software especializado em Java e Spring Framework, atuando no desenvolvimento de APIs RESTful e microserviços com foco em performance, escalabilidade e segurança. Experiência em integração de sistemas (REST/SOAP), mensageria (JMS) e bancos relacionais (Oracle, PostgreSQL, MySQL), aplicando boas práticas de arquitetura e engenharia em ambientes críticos.',
    techs: ['Java', 'SpringBoot', 'Postgres', 'Hibernate', 'SpringSecurity'],
    type: 'full-time',
  },
  {
    role: 'BugHunter',
    company: 'HuntersPay',
    period: '2024 — Presente',
    description: 'Bug bounty hunter focado na identificação e exploração de vulnerabilidades em aplicações Web, APIs e plataformas mobile. Atuação em programas públicos e privados, com descoberta de falhas críticas como IDOR, SSRF, XSS e falhas de autenticação.',
    techs: ['Bug Bounty', 'IDOR', 'SSRF', 'XSS', 'Authentication','Vulnerabilidades'],
    type: 'full-time',
  },
  {
    role: 'Desenvolvedor de Software',
    company: 'Caixa Econômica Federal, Banco do Brasil, Sicoob, Tribunal Superior Eleitoral e Exército Brasileiro',
    period: '2019 — 2024',
    description: 'Liderança técnica em projetos de microservices com Java e SpringBoot. Responsável pela arquitetura de sistemas distribuídos processando +10M requests/dia. Redução de 40% no tempo de deploy com otimização do pipeline CI/CD.',
    techs: ['Java', 'Angular', 'AWS', 'Kubernetes', 'PostgreSQL', 'AWS'],
    type: 'full-time',
  },
]

function TimelineItem({ experience, index }) {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.3 })
  const isLeft = index % 2 === 0

  return (
    <div className="relative grid md:grid-cols-[1fr_auto_1fr] gap-4 md:gap-8">
      <div className={`${isLeft ? '' : 'md:order-3'} ${isLeft ? 'md:text-right' : ''}`}>
        <motion.div
          ref={ref}
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="glass-card rounded-2xl p-6 group"
        >
          <div className={`flex items-center gap-2 mb-3 ${isLeft ? 'md:justify-end' : ''}`}>
            <span className="text-xs font-mono text-neon-cyan">{experience.period}</span>
          </div>
          <h3 className="text-xl font-display font-bold text-white mb-1 group-hover:text-neon-cyan transition-colors">
            {experience.role}
          </h3>
          <p className="text-neon-purple text-sm font-medium mb-3">{experience.company}</p>
          <p className="text-gray-400 text-sm leading-relaxed mb-4">
            {experience.description}
          </p>
          <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : ''}`}>
            {experience.techs.map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-[10px] font-mono rounded-md glass-light text-gray-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="hidden md:flex flex-col items-center md:order-2">
        <motion.div
          initial={{ scale: 0 }}
          animate={inView ? { scale: 1 } : {}}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
          className="w-4 h-4 rounded-full bg-gradient-to-br from-neon-cyan to-neon-purple shadow-[0_0_15px_rgba(0,212,255,0.5)] z-10 relative"
        />
        {index < experiences.length - 1 && (
          <div className="w-px flex-1 bg-gradient-to-b from-neon-purple/30 to-transparent" />
        )}
      </div>

      <div className={`hidden md:block ${isLeft ? 'md:order-3' : 'md:order-1'}`} />
    </div>
  )
}

export default function Experience() {
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
            Carreira
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white"
          >
            Experiência{' '}
            <span className="gradient-text">Profissional</span>
          </motion.h2>
        </div>

        <div className="space-y-8 md:space-y-0">
          {experiences.map((exp, i) => (
            <TimelineItem key={exp.company} experience={exp} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
