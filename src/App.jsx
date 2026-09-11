import { lazy, Suspense } from 'react'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import SectionIndicator from './components/ui/SectionIndicator'
import { sectionIndex } from './data/navigation'
import Hero from './components/sections/Hero'
import Projects from './components/sections/Projects'
import Experience from './components/sections/Experience'
import Capabilities from './components/sections/Capabilities'
import TechStack from './components/sections/TechStack'
import Tools from './components/sections/Tools'
import About from './components/sections/About'
import ContactSkeleton from './components/sections/ContactSkeleton'

const Contact = lazy(() => import('./components/sections/Contact').then(m => ({ default: m.default })))

function App() {
  return (
    <>
      <Navbar />
      <SectionIndicator sections={sectionIndex} />
      <main>
        <Hero />
        <Experience />
        <Capabilities />
        <TechStack />
        <Tools />
        <Projects />
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
