import { lazy, Suspense, useEffect } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import VenomStory from './components/VenomStory'
import Bhuvan from './components/Bhuvan'
import Direction from './components/Direction'
import Footer from './components/Footer'
import { initScroll } from './state/scroll'

// The 3D scene (three.js + postprocessing) is the heaviest dependency, so it's
// code-split: text paints immediately while the canvas chunk loads in the
// background. Fallback is a matching dark void.
const BackgroundCanvas = lazy(() => import('./components/BackgroundCanvas'))

export default function App() {
  useEffect(() => {
    initScroll()
  }, [])

  return (
    <>
      <Suspense fallback={<div className="fixed inset-0 z-0 bg-space-900" />}>
        <BackgroundCanvas />
      </Suspense>

      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <VenomStory />
          <Bhuvan />
          <Direction />
        </main>
        <Footer />
      </div>
    </>
  )
}
