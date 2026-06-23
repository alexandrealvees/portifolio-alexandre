import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionWrapper({ children, id, className = '' }) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  return (
    <motion.section
      id={id}
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`relative py-8 md:py-10 section-padding ${className}`}
    >
      {children}
    </motion.section>
  )
}
