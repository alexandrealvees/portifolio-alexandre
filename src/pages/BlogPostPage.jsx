import { useParams, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCalendar, FiTag } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import GrainOverlay from '../components/ui/GrainOverlay';
import BackHeader from '../components/layout/BackHeader';
import { getPostBySlug, formatPostDate } from '../utils/mdxUtils';

export default function BlogPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const locale = i18n.language.startsWith('pt') ? 'pt-BR' : 'en-US';
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

      <BackHeader backTo="/blog" maxWidth={800} />

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
              <FiCalendar size={13} /> {formatPostDate(post.date, locale)}
            </span>
          </div>

          {post.tags.length > 0 && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 24 }}>
              {post.tags.map(tag => (
                <span key={tag} style={{
                  fontSize: 11, fontFamily: 'monospace', color: 'rgba(255,255,255,0.55)',
                  background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
                  padding: '3px 9px', borderRadius: 999,
                }}>#{tag}</span>
              ))}
            </div>
          )}

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
              code({ inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '')
                return !inline && match ? (
                  <SyntaxHighlighter
                    {...props}
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    customStyle={{ borderRadius: 8, margin: '1.5em 0' }}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
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
