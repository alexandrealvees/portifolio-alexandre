import { lazy, Suspense } from 'react'
import ErrorBoundary from './components/ui/ErrorBoundary'
import GrainOverlay from './components/ui/GrainOverlay'
import Hero from './components/sections/Hero'
import Footer from './components/layout/Footer'

const About = lazy(() => import('./components/sections/About'))
const Certifications = lazy(() => import('./components/sections/Certifications'))
const Achievements = lazy(() => import('./components/sections/Achievements'))
const Interests = lazy(() => import('./components/sections/Interests'))
const TechSkills = lazy(() => import('./components/sections/TechSkills'))
const Education = lazy(() => import('./components/sections/Education'))
const Blog = lazy(() => import('./components/sections/Blog'))
const Experience = lazy(() => import('./components/sections/Experience'))

function LoadingFallback() {
  return (
    <div style={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
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

export default function App() {
  return (
    <ErrorBoundary>
      <GrainOverlay />
      <main>
        <ErrorBoundary><Hero /></ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <ErrorBoundary><About /></ErrorBoundary>
          <ErrorBoundary><Certifications /></ErrorBoundary>
          <ErrorBoundary><Achievements /></ErrorBoundary>
          <ErrorBoundary><Interests /></ErrorBoundary>
          <ErrorBoundary><TechSkills /></ErrorBoundary>
          <ErrorBoundary><Education /></ErrorBoundary>
          <ErrorBoundary><Blog /></ErrorBoundary>
          <ErrorBoundary><Experience /></ErrorBoundary>
        </Suspense>
      </main>
      <Footer />
    </ErrorBoundary>
  )
}
