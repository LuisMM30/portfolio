import { useEffect, useState } from 'react'
import { scrollToSection } from '../../utils/scrollToSection'

export default function SectionIndicator({ sections }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  // Sección activa calculada por posición de scroll (determinista en ambas direcciones).
  // Triple red de seguridad: evento scroll (instantáneo), ResizeObserver (cambios de layout)
  // y un intervalo ligero de respaldo (entornos donde scroll/rAF van throttled).
  // update() sale inmediatamente si la posición no ha cambiado, así que el coste es mínimo.
  useEffect(() => {
    let raf = 0
    let lastKey = ''

    const update = () => {
      raf = 0
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const vh = window.innerHeight
      const key = `${scrollY}|${docHeight}|${vh}`
      if (key === lastKey) return
      lastKey = key

      const line = scrollY + vh * 0.4
      let current = sections[0]?.id ?? ''

      sections.forEach(({ id }) => {
        const el = document.getElementById(id)
        // Medimos la sección completa (no el título sticky, que flota al fijarse)
        const section = el?.closest('section') ?? el
        if (!section) return
        // Offset absoluto en el documento: inmune a sticky/transforms durante el scroll
        const top = section.getBoundingClientRect().top + window.scrollY
        if (top <= line) current = id
      })

      // Al final de la página, fuerza la última sección
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      if (atBottom) current = sections[sections.length - 1]?.id ?? current

      setActive(current)
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update)
      // Fallback inmediato si rAF está throttled
      update()
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    window.addEventListener('load', onScroll)
    const ro = new ResizeObserver(onScroll)
    ro.observe(document.body)
    const interval = window.setInterval(update, 200)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      window.removeEventListener('load', onScroll)
      ro.disconnect()
      window.clearInterval(interval)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [sections])

  return (
    <nav
      aria-label="Índice de secciones"
      className={`fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2 transition-opacity duration-500 xl:flex ${
        // Oculto mientras se ve la hero (inicio); aparece a partir de Experiencia
        active === sections[0]?.id ? 'pointer-events-none opacity-0' : 'opacity-100'
      }`}
    >
      {sections.map(({ id, label }, i) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => {
              e.preventDefault()
              scrollToSection(id)
            }}
            className="group relative flex items-center gap-3 py-1 pl-3"
            aria-current={isActive ? 'true' : undefined}
          >
            <span
              className={`u-label min-w-24 text-right transition-all duration-300 ${
                isActive
                  ? 'text-accent opacity-100'
                  : 'text-text-muted opacity-0 group-hover:opacity-100'
              }`}
            >
              {label}
            </span>
            <span
              className={`u-label tabular-nums transition-colors duration-300 ${
                isActive ? 'text-accent' : 'text-text-muted group-hover:text-text-secondary'
              }`}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <span
              className={`h-px bg-current transition-all duration-300 ${
                isActive ? 'w-8 text-accent' : 'w-4 text-text-muted group-hover:w-6'
              }`}
              aria-hidden="true"
            />
          </a>
        )
      })}
    </nav>
  )
}
