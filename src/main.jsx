import { StrictMode, Suspense, lazy } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import './i18n' // Importa a configuração de tradução

const CertificationsPage = lazy(() => import('./pages/CertificationsPage.jsx'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage.jsx'))
const BlogPage = lazy(() => import('./pages/BlogPage.jsx'))
const CurriculumPage = lazy(() => import('./pages/CurriculumPage.jsx'))

function RouteFallback() {
  return (
    <div style={{ minHeight: '100vh', background: '#030014', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{
        width: 32, height: 32,
        border: '2px solid #00d4ff',
        borderTopColor: 'transparent',
        borderRadius: '50%',
        animation: 'spin 0.7s linear infinite',
      }} />
    </div>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/certificacoes" element={<CertificationsPage />} />
          <Route path="/curriculum" element={<CurriculumPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
        </Routes>
      </Suspense>

      <SpeedInsights />
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)
