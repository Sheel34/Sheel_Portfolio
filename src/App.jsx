import Nav from './components/Nav'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Direction from './components/Direction'
import Footer from './components/Footer'

// Page flow (scannable order): Hero → Projects → Direction → Footer.
export default function App() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Projects />
        <Direction />
      </main>
      <Footer />
    </>
  )
}
