import { useState, useRef, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { FiArrowUpRight, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import GrainOverlay from '../components/ui/GrainOverlay';
import BackHeader from '../components/layout/BackHeader';
import { getAllPosts, getAllCategories, getAllTags, formatPostDate } from '../utils/mdxUtils';

const posts = getAllPosts();
const categories = getAllCategories();
const tags = getAllTags();

/* ── Componente do Card (Reaproveitado do Blog.jsx) ─────────────────────────── */
function BlogCard({ post, index }) {
  const cardRef = useRef(null);
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith('pt') ? 'pt-BR' : 'en-US';
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current.getBoundingClientRect();
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      visible: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setCursor(prev => ({ ...prev, visible: false }));
  }, []);

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.55, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group"
    >
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
        <div
          className="absolute inset-0 transition-opacity duration-400"
          style={{
            background: 'rgba(3,0,20,0.45)',
            opacity: cursor.visible ? 1 : 0,
          }}
        />
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
        <p className="text-gray-600 text-xs font-mono mt-2">{formatPostDate(post.date, locale)}</p>
      </Link>
    </motion.article>
  );
}

/* ── Página Principal do Blog ─────────────────────────────────────────────────── */
export default function BlogPage() {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('ALL');
  const [activeTags, setActiveTags] = useState([]);

  const toggleTag = (tag) => {
    setActiveTags(prev => prev.includes(tag) ? prev.filter(x => x !== tag) : [...prev, tag]);
  };

  // Filtra por busca + categoria + tags (tags em modo OU).
  const filteredPosts = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return posts.filter(post => {
      const matchesSearch =
        post.title.toLowerCase().includes(term) ||
        post.category.toLowerCase().includes(term) ||
        post.tags.some(tag => tag.toLowerCase().includes(term));
      const matchesCategory = activeCategory === 'ALL' || post.category === activeCategory;
      const matchesTags = activeTags.length === 0 || activeTags.some(tag => post.tags.includes(tag));
      return matchesSearch && matchesCategory && matchesTags;
    });
  }, [searchTerm, activeCategory, activeTags]);

  const chipBase = {
    fontSize: 12, fontFamily: 'monospace', cursor: 'pointer',
    padding: '6px 14px', borderRadius: 999, transition: 'all 0.2s',
    background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
    color: 'rgba(255,255,255,0.6)',
  };
  const chipActive = {
    background: 'rgba(0,212,255,0.12)', border: '1px solid rgba(0,212,255,0.5)', color: '#00d4ff',
  };

  return (
    <div style={{ minHeight: '100vh', background: '#030014', color: '#e2e8f0', paddingBottom: 80 }}>
      <GrainOverlay />

      <BackHeader maxWidth={1200} />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '60px 24px' }}>
        {/* TÍTULO E BUSCA */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 60, alignItems: 'center', textAlign: 'center' }}>
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', fontWeight: 800, color: '#fff', fontFamily: "'Space Grotesk', sans-serif" }}
          >
            {t('blogpage.title_main')} <span style={{ color: '#00d4ff' }}>{t('blogpage.title_highlight')}</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            style={{ color: 'rgba(255,255,255,0.5)', maxWidth: 600, fontSize: '1.1rem' }}
          >
            {t('blogpage.description')}
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            style={{ position: 'relative', width: '100%', maxWidth: 500, marginTop: 24 }}
          >
            <FiSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)' }} size={18} />
            <input 
              type="text"
              placeholder={t('blogpage.search_placeholder')}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%', padding: '14px 16px 14px 44px',
                background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 12, color: '#fff', fontSize: '0.95rem',
                outline: 'none', transition: 'border-color 0.3s'
              }}
              onFocus={e => e.target.style.borderColor = 'rgba(0,212,255,0.5)'}
              onBlur={e => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
            />
          </motion.div>
        </div>

        {/* FILTROS: CATEGORIAS + TAGS */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              onClick={() => setActiveCategory('ALL')}
              style={activeCategory === 'ALL' ? { ...chipBase, ...chipActive } : chipBase}
            >
              {t('certpage.all')}
            </button>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={activeCategory === cat ? { ...chipBase, ...chipActive } : chipBase}
              >
                {cat}
              </button>
            ))}
          </div>

          {tags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
              {tags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  style={activeTags.includes(tag)
                    ? { ...chipBase, ...chipActive, fontSize: 11, padding: '4px 11px' }
                    : { ...chipBase, fontSize: 11, padding: '4px 11px' }}
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* GRID DE POSTS */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {filteredPosts.map((post, i) => (
              <BlogCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '60px 0', color: 'rgba(255,255,255,0.4)' }}>
            <p>{t('blogpage.empty', { term: searchTerm })}</p>
          </div>
        )}
      </div>
    </div>
  );
}
