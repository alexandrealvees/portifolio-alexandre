import { motion } from 'framer-motion'
import { FiExternalLink, FiGithub, FiArrowUpRight } from 'react-icons/fi'
import SectionWrapper from '../ui/SectionWrapper'

const projects = [
  {
    title: 'CloudShield',
    subtitle: 'Plataforma de Segurança Cloud',
    description: 'Dashboard de monitoramento de segurança em tempo real com detecção de ameaças baseada em IA, análise de vulnerabilidades e compliance automatizado.',
    techs: ['React', 'TypeScript', 'Python', 'AWS', 'TensorFlow'],
    gradient: 'from-neon-cyan via-neon-blue to-neon-purple',
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&q=80',
    github: '#',
    live: '#',
  },
  {
    title: 'NexPay',
    subtitle: 'Fintech Payment Gateway',
    description: 'Gateway de pagamento de alta performance processando milhões de transações com latência sub-100ms, compliance PCI-DSS e fraud detection.',
    techs: ['Node.js', 'Go', 'PostgreSQL', 'Redis', 'Kubernetes'],
    gradient: 'from-neon-purple via-neon-pink to-neon-cyan',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=600&q=80',
    github: '#',
    live: '#',
  },
  {
    title: 'DevFlow',
    subtitle: 'CI/CD Orchestration Platform',
    description: 'Plataforma de orquestração de pipelines CI/CD com visualização em tempo real, rollback automático e integração com multi-cloud.',
    techs: ['Angular', 'Go', 'Docker', 'Terraform', 'gRPC'],
    gradient: 'from-neon-blue via-neon-cyan to-neon-green',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    github: '#',
    live: '#',
  },
  {
    title: 'DataVerse',
    subtitle: 'Real-time Analytics Dashboard',
    description: 'Dashboard de analytics com visualização de dados em tempo real, processamento de streaming com Apache Kafka e Machine Learning insights.',
    techs: ['Next.js', 'Python', 'Kafka', 'ClickHouse', 'D3.js'],
    gradient: 'from-neon-pink via-neon-purple to-neon-blue',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&q=80',
    github: '#',
    live: '#',
  },
]

function ProjectCard({ project, index }) {
  const isEven = index % 2 === 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.7 }}
      className="group"
    >
      <div className={`grid lg:grid-cols-2 gap-8 items-center ${!isEven ? 'lg:direction-rtl' : ''}`}>
        <div className={`relative overflow-hidden rounded-2xl ${!isEven ? 'lg:order-2' : ''}`}>
          <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-20 group-hover:opacity-30 transition-opacity duration-500 z-10`} />
          <div className="aspect-video bg-dark-700 overflow-hidden rounded-2xl">
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </div>
          <div className="absolute inset-0 bg-dark-900/40 group-hover:bg-dark-900/20 transition-colors duration-500 z-10 rounded-2xl" />
        </div>

        <div className={`${!isEven ? 'lg:order-1 lg:text-right' : ''}`}>
          <span className="text-xs font-mono text-neon-cyan uppercase tracking-wider mb-2 block">
            {project.subtitle}
          </span>
          <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4 group-hover:text-neon-cyan transition-colors duration-300">
            {project.title}
          </h3>

          <div className="glass-card rounded-xl p-5 mb-4">
            <p className="text-gray-400 text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className={`flex flex-wrap gap-2 mb-6 ${!isEven ? 'lg:justify-end' : ''}`}>
            {project.techs.map((tech) => (
              <span
                key={tech}
                className="text-xs font-mono text-neon-purple px-2 py-1"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className={`flex items-center gap-4 ${!isEven ? 'lg:justify-end' : ''}`}>
            <a
              href={project.github}
              className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              aria-label="GitHub"
            >
              <FiGithub size={18} />
            </a>
            <a
              href={project.live}
              className="w-10 h-10 rounded-lg glass-light flex items-center justify-center text-gray-400 hover:text-neon-cyan transition-all duration-300 hover:shadow-[0_0_15px_rgba(0,212,255,0.3)]"
              aria-label="Ver projeto"
            >
              <FiExternalLink size={18} />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-neon-cyan uppercase tracking-[0.3em] mb-4 block"
          >
            Portfolio
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white"
          >
            Projetos{' '}
            <span className="gradient-text">Selecionados</span>
          </motion.h2>
        </div>

        <div className="space-y-24">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://github.com/alexandrealves"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-neon-cyan transition-colors duration-300 font-medium"
          >
            Ver todos no GitHub
            <FiArrowUpRight size={18} />
          </a>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
