import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiArrowLeft, FiCalendar, FiTag } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import GrainOverlay from '../components/GrainOverlay';
import { getPostBySlug } from '../utils/mdxUtils';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const post = getPostBySlug(slug);

  if (!post) {
    return (
      <div style={{ minHeight: '100vh', background: '#030014', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: 16 }}>{t('blogpost.not_found')}</h1>
        <button 
          onClick={() => navigate('/blog')}
          style={{ padding: '10px 20px', background: 'rgba(255,255,255,0.1)', borderRadius: 8, color: '#fff', border: 'none', cursor: 'pointer' }}
        >
          {t('common.back_home')}
        </button>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#030014', color: '#e2e8f0', paddingBottom: 80 }}>
      <GrainOverlay />
      
      {/* HEADER NAVBAR */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 50,
        background: 'rgba(3,0,20,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}>
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center' }}>
          <button
            onClick={() => navigate('/blog')}
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
            {t('common.back')}
          </button>
        </div>
      </div>

      <article style={{ maxWidth: 768, margin: '0 auto', padding: '40px 24px' }}>
        
        {/* CABEÇALHO DO POST */}
        <header style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 24, flexWrap: 'wrap' }}>
            <span style={{ 
              display: 'flex', alignItems: 'center', gap: 6, 
              background: 'rgba(0,212,255,0.1)', color: '#00d4ff', 
              padding: '6px 12px', borderRadius: 6, fontSize: 12, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' 
            }}>
              <FiTag size={12} /> {post.category}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6, color: 'rgba(255,255,255,0.4)', fontSize: 13, fontFamily: 'monospace' }}>
              <FiCalendar size={13} /> {post.date}
            </span>
          </div>

          <h1 style={{ 
            fontSize: 'clamp(2rem, 5vw, 3.5rem)', 
            fontWeight: 800, 
            lineHeight: 1.2, 
            color: '#fff',
            marginBottom: 32,
            fontFamily: "'Space Grotesk', sans-serif" 
          }}>
            {post.title}
          </h1>

          {post.image && (
            <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src={post.image} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          )}
        </header>

        {/* CORPO DO POST (MARKDOWN) */}
        <div className="prose prose-invert prose-lg max-w-none" style={{
            '--tw-prose-headings': '#fff',
            '--tw-prose-links': '#00d4ff',
            '--tw-prose-code': '#8b5cf6'
        }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={{
              code({node, inline, className, children, ...props}) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    children={String(children).replace(/\n$/, '')}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ borderRadius: 8, margin: '1.5em 0' }}
                  />
                ) : (
                  <code {...props} className={className} style={{ background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: 4, color: '#8b5cf6', fontSize: '0.9em' }}>
                    {children}
                  </code>
                )
              }
            }}
          >
            {post.body}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
