import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App.jsx'
import CertificationsPage from './pages/CertificationsPage.jsx'
import BlogPostPage from './pages/BlogPostPage.jsx'
import BlogPage from './pages/BlogPage.jsx'
import CurriculumPage from './pages/CurriculumPage.jsx'
import { SpeedInsights } from '@vercel/speed-insights/react'
import { Analytics } from '@vercel/analytics/react'
import './index.css'
import './i18n' // Importa a configuração de tradução

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/certificacoes" element={<CertificationsPage />} />
        <Route path="/curriculum" element={<CurriculumPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
      </Routes>

      <SpeedInsights />
      <Analytics />
    </BrowserRouter>
  </StrictMode>,
)
