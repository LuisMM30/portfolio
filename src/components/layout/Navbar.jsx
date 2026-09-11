import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { site } from '../../data/site'
import { sectionIndex } from '../../data/navigation'
import ThemeToggle from '../ui/ThemeToggle'
import { cn } from '../../utils/cn'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [open, setOpen] = useState(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  useEffect(() => {
    let raf = 0
    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const y = window.scrollY
        setScrolled(y > 16)
        const max = document.documentElement.scrollHeight - window.innerHeight
        setProgress(max > 0 ? Math.min(y / max, 1) : 0)
      })
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [])

  // Lock scroll + full keyboard support while the index overlay is open.
  useEffect(() => {
    if (!open) return undefined

    document.body.style.overflow = 'hidden'
    const items = panelRef.current?.querySelectorAll('a, button')
    items?.[0]?.focus()

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        setOpen(false)
        toggleRef.current?.focus()
        return
      }
      if (e.key !== 'Tab') return
      const list = Array.from(items ?? [])
      if (list.length === 0) return
      const first = list[0]
      const last = list[list.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300',
          scrolled || open ? 'border-border bg-bg-primary/95 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label="Navegación principal"
          className="mx-auto flex h-16 items-center justify-between gap-4 px-5 sm:px-6 md:h-20 lg:px-8"
        >
          <a
            href="#inicio"
            className="group inline-flex shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight text-text-primary transition-colors hover:text-accent md:text-base"
            onClick={(e) => {
              e.preventDefault()
              close()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }}
          >
            <span className="inline-block h-2.5 w-2.5 bg-accent" aria-hidden="true" />
            {site.name}
          </a>

          <div className="flex items-center gap-2.5">
            <ThemeToggle />
            <button
              ref={toggleRef}
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="index-overlay"
              aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
              data-cursor="view"
              className="u-label inline-flex min-h-[44px] min-w-[44px] items-center justify-center border border-border px-3 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
            >
              <span
                className="inline-flex flex-col gap-[4px]"
                aria-hidden="true"
              >
                <span className={`block h-px w-5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
                <span className={`block h-px w-5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
              </span>
            </button>
          </div>
        </nav>

        {/* Reading progress */}
        <div className="absolute inset-x-0 bottom-0 h-[2px]" aria-hidden="true">
          <div
            className="h-full origin-left bg-accent"
            style={{ transform: `scaleX(${progress})` }}
          />
        </div>
      </header>

      {/* INDEX overlay */}
      <div
        id="index-overlay"
        ref={panelRef}
        className={cn(
          'fixed inset-0 z-[80] flex flex-col bg-bg-primary transition-[opacity,visibility] duration-300',
          open ? 'visible opacity-100' : 'invisible opacity-0',
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Índice del portfolio"
        hidden={!open}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-24 sm:px-6 md:pt-28 lg:px-8">
          <div className="mb-8 flex items-end justify-between border-b border-border pb-4">
            <div>
              <p className="u-label text-accent">Navegación</p>
              <p className="display mt-2 text-4xl text-text-primary md:text-5xl">Índice</p>
            </div>
            <p className="u-label text-text-muted">ESC para cerrar</p>
          </div>

          <ol className="grid flex-1 auto-rows-min grid-cols-1 content-start gap-3 overflow-y-auto sm:grid-cols-2 lg:grid-cols-3">
            {sectionIndex.map((section, i) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={close}
                  className="group flex min-h-24 flex-col justify-between border border-border bg-bg-secondary/30 p-4 transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:bg-bg-secondary md:min-h-28 md:p-5"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-mono text-sm text-accent">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <ArrowUpRight
                      size={20}
                      className="text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </span>
                  <span className="display text-xl text-text-primary transition-colors duration-300 group-hover:text-accent sm:text-2xl md:text-3xl">
                    {section.label}
                  </span>
                </a>
              </li>
            ))}
          </ol>

          <div className="flex flex-col gap-3 border-t border-border py-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="u-label text-text-muted">
              {site.email} — {site.location}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
