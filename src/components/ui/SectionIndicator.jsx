import { useEffect, useState } from 'react'

export default function SectionIndicator({ sections }) {
  const [active, setActive] = useState(sections[0]?.id ?? '')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-40% 0px -55% 0px' },
    )
    sections.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [sections])

  return (
    <nav
      aria-label="Índice de secciones"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-end gap-2 xl:flex"
    >
      {sections.map(({ id, label }, i) => {
        const isActive = active === id
        return (
          <a
            key={id}
            href={`#${id}`}
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
