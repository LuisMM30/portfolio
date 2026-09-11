import { useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'
import { site } from '../../data/site'
import Button from '../ui/Button'
import DownloadCVButton from '../ui/DownloadCVButton'
import HeroInfoVariants from '../ui/HeroInfoVariants'
import { useEnvironment } from '../../hooks/useEnvironment'

const specRows = [
  { label: 'Rol', value: 'Desarrollador Web Full Stack Junior' },
  { label: 'Base', value: site.location },
  { label: 'Formación', value: 'Téc. Sup. Desarrollo de Aplicaciones Web' },
  { label: 'Estado', value: 'Disponible para nuevas oportunidades', live: true }
]

const nameLines = [
  { text: 'LUIS', scroll: 0.18 },
  { text: 'MONTES', scroll: 0.3 },
  { text: 'DE OCA', scroll: 0.1 },
]

export default function Hero() {
  const { motionEnabled } = useEnvironment()
  const layersRef = useRef([])

  // Scroll-driven parallax: each name layer + marquee drifts at its own speed.
  useEffect(() => {
    if (!motionEnabled) return undefined
    let raf = 0

    const update = () => {
      raf = 0
      const y = window.scrollY
      const vh = window.innerHeight
      const t = Math.min(y / vh, 1) // 0 → 1 across the first viewport

      layersRef.current.forEach((el, i) => {
        if (!el) return
        const conf = nameLines[i]
        if (!conf) return
        el.style.transform = `translate3d(0, ${(-t * conf.scroll * 100).toFixed(2)}px, 0)`
        el.style.opacity = String(Math.max(1 - t * 0.85, 0.15))
      })
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [motionEnabled])

  return (
    <section
      id="inicio"
      className="hero-section relative flex min-h-screen flex-col overflow-hidden pt-20 md:pt-24"
    >
      {/* Subtle background field */}
      <div className="hero-aurora" aria-hidden="true" />

      <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 sm:px-6 lg:px-8">
        {/* Editorial masthead */}
        <div className="flex items-center justify-between gap-6 border-b border-border py-3">
          <p className="u-label flex items-center gap-3 text-text-muted">
            <span className="inline-block h-1.5 w-1.5 bg-accent" aria-hidden="true" />
            Portfolio — {site.role}
          </p>
          <p className="u-label hidden text-text-muted md:block">Disponible para proyectos</p>
        </div>

        {/* Monumental name */}
        <div className="hero-content flex flex-1 flex-col justify-center py-8 md:py-10">
          <h1 className="sr-only">
            {site.name} — {site.role} en {site.location}
          </h1>
          <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-16">
            <div aria-hidden="true" className="select-none lg:col-span-7">
              {nameLines.map((line, i) => (
                <div
                  key={line.text}
                  ref={(el) => {
                    layersRef.current[i] = el
                  }}
                  className={`hero-name display will-change-transform ${
                    i === 1
                      ? 'text-[clamp(3.4rem,13vw,11rem)] text-text-primary'
                      : 'text-[clamp(3.4rem,13vw,11rem)] text-text-secondary'
                  } ${i === 2 ? 'pl-[8vw]' : ''} leading-[0.92]`}
                  style={{ transition: 'opacity 120ms linear' }}
                >
                  {line.text}
                </div>
              ))}
            </div>

            <aside className="hero-specs lg:col-span-5 self-start">
              <HeroInfoVariants rows={specRows} />
            </aside>
          </div>

          {/* Value line and actions */}
          <div className="mt-10">
            <p className="max-w-4xl text-lg leading-relaxed text-text-secondary md:text-xl">
              {site.headline} {site.subheadline}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button href="#proyectos" variant="primary" size="lg" data-cursor="view">
                Ver proyectos
                <ArrowRight size={18} aria-hidden="true" />
              </Button>
              <Button href="#contacto" variant="secondary" size="lg" data-cursor="talk">
                Contactar
              </Button>
              <DownloadCVButton variant="ghost" size="lg" label="Descargar CV" />
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
