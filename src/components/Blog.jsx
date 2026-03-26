import { useState, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { FiArrowUpRight } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import SectionWrapper from './SectionWrapper'
import { getAllPosts } from '../utils/mdxUtils'

const posts = getAllPosts()

/* ── Card com cursor "Read" magnético ─────────────────────────── */
function BlogCard({ post, index }) {
  const cardRef = useRef(null)
  const { t } = useTranslation()
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect()
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    })
  }, [])

  const handleMouseLeave = useCallback(() => {
    setCursor(prev => ({ ...prev, visible: false }))
  }, [])

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
      {/* thumbnail */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="relative overflow-hidden rounded-xl mb-4"
        style={{ aspectRatio: '4/3', cursor: 'none' }}
      >
        <img
          src={post.image}
          alt={post.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          style={{ filter: 'brightness(0.75)' }}
        />

        {/* overlay escuro no hover */}
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background: 'rgba(3,0,20,0.45)',
            opacity: cursor.visible ? 1 : 0,
          }}
        />

        {/* badge categoria */}
        <div
          className="absolute top-3 left-3 px-2 py-1 rounded-md text-[10px] font-mono font-bold uppercase tracking-wider"
          style={{
            background: 'rgba(3,0,20,0.7)',
            border: '1px solid rgba(0,212,255,0.25)',
            color: '#00d4ff',
            backdropFilter: 'blur(6px)',
          }}
        >
          {post.category}
        </div>

        {/* "READ" que segue o cursor */}
        <motion.div
          animate={{
            x: cursor.x - 28,
            y: cursor.y - 28,
            opacity: cursor.visible ? 1 : 0,
            scale: cursor.visible ? 1 : 0.5,
          }}
          transition={{
            x: { type: 'spring', stiffness: 350, damping: 28, mass: 0.5 },
            y: { type: 'spring', stiffness: 350, damping: 28, mass: 0.5 },
            opacity: { duration: 0.15 },
            scale: { duration: 0.2 },
          }}
          className="absolute pointer-events-none z-20"
          style={{ top: 0, left: 0, width: 56, height: 56 }}
        >
          <div
            className="w-full h-full rounded-full flex items-center justify-center"
            style={{
              background: 'rgba(255,255,255,0.95)',
              boxShadow: '0 4px 24px rgba(0,0,0,0.4)',
            }}
          >
            <span
              style={{
                fontSize: 9,
                fontWeight: 800,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#030014',
                fontFamily: 'monospace',
              }}
            >
              {t('blog.read_short')}
            </span>
          </div>
        </motion.div>

        {/* ícone seta — canto inferior direito */}
        <div
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: cursor.visible ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.08)',
            border: '1px solid rgba(255,255,255,0.2)',
            backdropFilter: 'blur(4px)',
          }}
        >
          <FiArrowUpRight
            size={15}
            className="text-white transition-transform duration-300 group-hover:rotate-45"
          />
        </div>
      </div>

      {/* info */}
      <Link
        to={`/blog/${post.slug}`}
        className="block group/link"
        style={{ textDecoration: 'none' }}
      >
        <div className="flex items-start justify-between gap-3">
          <h3
            className="font-display font-bold text-white leading-snug transition-colors duration-300 group-hover/link:text-neon-cyan"
            style={{ fontSize: 'clamp(0.85rem,1.4vw,1rem)' }}
          >
            {post.title}
          </h3>
          <FiArrowUpRight
            size={18}
            className="flex-shrink-0 text-gray-600 transition-all duration-300 group-hover/link:text-neon-cyan group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 mt-0.5"
          />
        </div>
        <p className="text-gray-600 text-xs font-mono mt-2">{post.date}</p>
      </Link>
    </motion.article>
  )
}

/* ── seção ────────────────────────────────────────────────────── */
export default function Blog() {
  const { t } = useTranslation()

  return (
    <SectionWrapper id="blog">
      <div className="max-w-7xl mx-auto">

        {/* header inline estilo referência */}
        <div className="flex items-end justify-between mb-10">
          <motion.span
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-xs font-mono text-gray-500 uppercase tracking-[0.3em]"
          >
            {t('blog.title_label')}
          </motion.span>

          <motion.div
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Link
              to="/blog"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors duration-300 group"
              style={{ textDecoration: 'none' }}
            >
              {t('blog.view_all')}
              <FiArrowUpRight
                size={13}
                className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </motion.div>
        </div>

        {/* divisor */}
        <div className="w-full h-px mb-10" style={{ background: 'linear-gradient(90deg, rgba(255,255,255,0.06), rgba(139,92,246,0.3), rgba(255,255,255,0.06))' }} />

        {/* grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {posts.map((post, i) => (
            <BlogCard key={post.slug} post={post} index={i} />
          ))}
        </div>

        {/* footer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-end mt-12"
        >
          <Link
            to="/blog"
            className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-gray-500 hover:text-white transition-colors duration-300 group"
            style={{ textDecoration: 'none' }}
          >
            {t('blog.view_all')}
            <FiArrowUpRight
              size={13}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </motion.div>
      </div>
    </SectionWrapper>
  )
}
