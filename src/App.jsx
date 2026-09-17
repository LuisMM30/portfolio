import { lazy, Suspense, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SectionIndicator from './components/ui/SectionIndicator'
import { sectionIndex } from './data/navigation'
import { scrollToSection } from './utils/scrollToSection'
import Hero from './components/sections/Hero'
import Experience from './components/sections/Experience'
import Capabilities from './components/sections/Capabilities'
import TechStack from './components/sections/TechStack'
import Tools from './components/sections/Tools'
import About from './components/sections/About'
import ContactSkeleton from './components/sections/ContactSkeleton'

const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.default })))

function App() {
  const location = useLocation()

  // Scroll a la sección cuando se llega a / con un hash (p. ej. /#sobre-mi).
  // Se reintenta un tiempo porque alguna sección (Contacto) se carga con lazy
  // y puede no existir aún en el DOM al aterrizar.
  useEffect(() => {
    if (!location.hash) return undefined
    const id = location.hash.slice(1)
    let raf = 0
    let tries = 0
    const attempt = () => {
      if (document.getElementById(id)) {
        scrollToSection(id)
        return
      }
      if (tries >= 30) return // ~500ms: desistimos
      tries += 1
      raf = requestAnimationFrame(attempt)
    }
    raf = requestAnimationFrame(attempt)
    return () => cancelAnimationFrame(raf)
  }, [location])

  // La sección Proyectos vive ahora en /proyectos: la quitamos del índice lateral
  const homeSections = sectionIndex.filter((s) => s.id !== 'proyectos')

  return (
    <>
      <Navbar />
      <SectionIndicator sections={homeSections} />
      <main>
        <Hero />
        <Experience />
        <Capabilities />
        <TechStack />
        <Tools />
        <About />
        <Suspense fallback={<ContactSkeleton />}>
          <Contact />
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
