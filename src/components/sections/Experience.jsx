import { useEffect, useRef, useState } from 'react'
import { experiences } from '../../data/experience'
import SectionHeading from '../ui/SectionHeading'

function startYear(period) {
  return period.match(/\d{4}/)?.[0] ?? ''
}

export default function Experience() {
  const listRef = useRef(null)
  const lockActiveRef = useRef(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const [hoveredIndex, setHoveredIndex] = useState(null)

  useEffect(() => {
    const items = Array.from(listRef.current?.querySelectorAll('[data-entry]') ?? [])
    if (!items.length) return undefined

    let frame = 0
    const updateActiveEntry = () => {
      frame = 0
      if (lockActiveRef.current) return
      const target = window.innerHeight * 0.38
      let closestIndex = 0
      let closestDistance = Infinity

      items.forEach((item, index) => {
        const distance = Math.abs(item.getBoundingClientRect().top - target)
        if (distance < closestDistance) {
          closestDistance = distance
          closestIndex = index
        }
      })

      setActiveIndex((current) => (current === closestIndex ? current : closestIndex))
    }

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(updateActiveEntry)
    }

    updateActiveEntry()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  const displayIndex = hoveredIndex ?? activeIndex
  const year = startYear(experiences[displayIndex]?.period)

  const goToEntry = (index) => {
    const el = document.getElementById(`experiencia-${index + 1}`)
    if (!el) return

    lockActiveRef.current = true
    setActiveIndex(index)

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.32
    window.scrollTo({ top, behavior: reduceMotion ? 'auto' : 'smooth' })

    window.setTimeout(() => {
      lockActiveRef.current = false
    }, reduceMotion ? 50 : 420)
  }

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="02"
          title="Experiencia"
          subtitle="Colaboraciones, prácticas y proyectos desarrollados para empresas y clientes reales."
          id="experiencia"
        />

        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          {/* Year nav (big year + jump links): desktop-only, it relies on the
              scroll-synced hover/click behavior and clutters small screens. */}
          <div className="hidden lg:col-span-4 lg:block">
            <div
              className="lg:sticky lg:top-48"
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <p
                key={year}
                className="experience-year display text-text-primary"
                aria-live="polite"
              >
                {year}
              </p>

              <ol className="mt-8 lg:flex lg:flex-col lg:gap-y-3">
                {(() => {
                  const allYears = [...new Set(experiences.map(item => startYear(item.period)))]
                  const otherYears = allYears.filter(y => y !== year)
                  return otherYears.map((y) => (
                    <li key={y} className="w-full lg:w-auto">
                      <button
                        type="button"
                        onClick={() => {
                          const index = experiences.findIndex(item => startYear(item.period) === y)
                          if (index !== -1) goToEntry(index)
                        }}
                        onMouseEnter={() => {
                          const index = experiences.findIndex(item => startYear(item.period) === y)
                          if (index !== -1) setHoveredIndex(index)
                        }}
                        onFocus={() => {
                          const index = experiences.findIndex(item => startYear(item.period) === y)
                          if (index !== -1) setHoveredIndex(index)
                        }}
                        onBlur={() => setHoveredIndex(null)}
                        className={`u-label text-text-muted hover:text-text-primary transition-colors ${
                          displayIndex !== null && startYear(experiences[displayIndex].period) === y ? 'text-accent' : ''
                        }`}
                      >
                        {y}
                      </button>
                    </li>
                  ))
                })()}
              </ol>
            </div>
          </div>

          <ol ref={listRef} className="lg:col-span-8">
            {experiences.map((item, i) => (
              <li
                key={item.org + item.period}
                id={`experiencia-${i + 1}`}
                data-entry
                data-index={i}
                className={`border-b border-border py-10 first:pt-0 last:border-b-0 md:py-14 transition-opacity duration-[144ms] ${
                  i === activeIndex ? 'opacity-100' : 'opacity-60'
                }`}
                onMouseEnter={() => setHoveredIndex(i)}
              >
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                  <span className="u-label text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <h3 className="text-2xl font-semibold tracking-tight text-text-primary md:text-3xl">
                    {item.role}
                  </h3>
                  <span className="u-label text-text-secondary">{item.org}</span>
                </div>

                <p className="u-label mt-3 text-text-muted">{item.period}</p>

                <p className="mt-5 max-w-2xl text-text-secondary leading-relaxed">{item.summary}</p>

                <p className="mt-5 flex flex-wrap gap-x-2 gap-y-1 font-mono text-xs text-text-muted">
                  {item.technologies.map((tech, idx) => (
                    <span key={tech} className="inline-flex items-baseline gap-2">
                      {idx > 0 && <span aria-hidden="true">/</span>}
                      <span className="cursor-default transition-colors hover:text-accent">{tech}</span>
                    </span>
                  ))}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
