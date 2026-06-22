import { lazy, Suspense } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import GrainOverlay from './components/GrainOverlay'
import Hero from './components/Hero'
import Footer from './components/Footer'

const About = lazy(() => import('./components/About'))
const Certifications = lazy(() => import('./components/Certifications'))
const Achievements = lazy(() => import('./components/Achievements'))
const Interests = lazy(() => import('./components/Interests'))
const TechSkills = lazy(() => import('./components/TechSkills'))
const Education = lazy(() => import('./components/Education'))
const Blog = lazy(() => import('./components/Blog'))
const Experience = lazy(() => import('./components/Experience'))

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
