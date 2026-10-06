import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowUpRight, X } from 'lucide-react'
import { site } from '../../data/site'
import { useI18n } from '../../i18n/LocaleProvider'
import { localizePath } from '../../i18n'
import LanguageSelector from './LanguageSelector'
import { sectionIndex } from '../../data/navigation'
import ThemeToggle from '../ui/ThemeToggle'
import { scrollToSection } from '../../utils/scrollToSection'
import { cn } from '../../utils/cn'

// Tarjeta del índice: fila compacta en móvil (número · etiqueta · flecha) y
// tarjeta apilada (número+flecha arriba, etiqueta abajo) desde sm.
function IndexCard({ href, onClick, index, label, featured = false }) {
  const className = cn(
    'group flex flex-row items-center gap-3 border px-4 py-3.5 text-left transition-all duration-300 hover:-translate-y-1 sm:min-h-24 sm:grid sm:grid-cols-[auto_1fr_auto] sm:p-4 md:min-h-28 md:p-5',
    featured
      ? 'border-accent/50 bg-accent/10 hover:border-accent hover:bg-accent/20'
      : 'border-border bg-bg-secondary/30 hover:border-accent hover:bg-bg-secondary',
  )
  const children = (
    <>
      <span className="shrink-0 font-mono text-sm text-accent">{index}</span>
      <span
        className={cn(
          'display min-w-0 flex-1 text-lg transition-colors duration-300 group-hover:text-accent sm:col-span-3 sm:col-start-1 sm:row-start-2 sm:text-xl md:text-2xl lg:text-3xl',
          featured ? 'text-accent' : 'text-text-primary',
        )}
      >
        {label}
      </span>
      <ArrowUpRight
        size={20}
        className={cn(
          'shrink-0 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 sm:col-start-3 sm:row-start-1',
          featured ? 'text-accent' : 'text-text-muted group-hover:text-accent',
        )}
        aria-hidden="true"
      />
    </>
  )
  // Enlaces internos (#seccion) como <a>; rutas de páginas con Link (SPA)
  return href.startsWith('#') ? (
    <a href={href} onClick={onClick} className={className}>{children}</a>
  ) : (
    <Link to={href} onClick={onClick} className={className}>{children}</Link>
  )
}

export default function Navbar() {
  const { locale, t } = useI18n()
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuLocation, setMenuLocation] = useState(location)

  // El overlay se considera cerrado si la ruta cambió desde que se abrió
  // (botón atrás del navegador, enlace de marca, tarjeta del índice…)
  const open = menuOpen && menuLocation === location
  const toggleOpen = () => {
    setMenuOpen(!open)
    setMenuLocation(location)
  }
  const close = () => setMenuOpen(false)
  const toggleRef = useRef(null)
  const panelRef = useRef(null)

  const isProjectsPage = location.pathname.endsWith('/proyectos')
  const route = (path) => localizePath(path, locale)
  const localizedSectionIndex = sectionIndex.map((section) => {
    const sectionKeys = { inicio: 'home', experiencia: 'experience', servicios: 'capabilities', tecnologias: 'technologies', herramientas: 'tools', 'sobre-mi': 'aboutSection', contacto: 'contact' }
    return { ...section, label: t(`nav.${sectionKeys[section.id] ?? section.id}`) }
  })

  // En /proyectos el botón central mantiene su nombre pero lleva a la sección Experiencia
  const centralButton = isProjectsPage
    ? { label: t('nav.about'), href: `${route('/')}#experiencia` }
    : { label: t('nav.projects'), href: route('/proyectos') }

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
        close()
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

  return (
    <>
      <header
        className={cn(
          'fixed inset-x-0 top-0 z-[90] border-b transition-colors duration-300',
          scrolled || open ? 'border-border bg-bg-primary/95 backdrop-blur-md' : 'border-transparent bg-transparent',
        )}
      >
        <nav
          aria-label={t('nav.main')}
          className="mx-auto flex h-16 items-center justify-between gap-2 px-3 min-[380px]:gap-4 min-[380px]:px-5 sm:px-6 md:h-20 lg:px-8"
        >
          <Link
            to={route('/')}
            className="group inline-flex shrink-0 items-center gap-2.5 text-sm font-semibold tracking-tight text-text-primary transition-colors hover:text-accent md:text-base"
          >
            <span className="inline-block h-2.5 w-2.5 bg-accent" aria-hidden="true" />
            {site.name}
          </Link>

          {/* El acceso contextual se reserva a escritorio para que los controles
              esenciales conserven espacio y alcance cómodo en móviles estrechos. */}
          <Link
            to={centralButton.href}
            className="u-label hidden h-[46px] items-center border border-border px-4 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary md:inline-flex"
          >
            {centralButton.label}
          </Link>

          <div className="flex items-center gap-1 min-[380px]:gap-2.5">
            <button
              ref={toggleRef}
              type="button"
              onClick={toggleOpen}
              aria-expanded={open}
              aria-controls="index-overlay"
              aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
              data-cursor="view"
              className="u-label inline-flex h-11 min-h-0 min-w-11 items-center justify-center border border-border px-2 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary sm:h-[46px] sm:min-w-[46px] sm:px-3"
            >
              <span
                className="inline-flex flex-col gap-[4px]"
                aria-hidden="true"
              >
                <span className={`block h-px w-5 bg-current transition-all duration-300 ${open ? 'rotate-45 translate-y-[5px]' : ''}`} />
                <span className={`block h-px w-5 bg-current transition-all duration-300 ${open ? '-rotate-45 -translate-y-[5px]' : ''}`} />
              </span>
            </button>
            <LanguageSelector />
            <ThemeToggle />
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
        aria-label={t('nav.index')}
      >
        <div className="mx-auto flex w-full max-w-7xl flex-1 flex-col px-5 pt-20 sm:px-6 sm:pt-24 md:pt-28 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-2 border-b border-border pb-4 sm:mb-8">
            <div className="min-w-0">
              <p className="u-label text-accent">{t('nav.navigation')}</p>
              <p className="display mt-2 text-[26px] text-text-primary min-[380px]:text-4xl md:text-5xl">{t('ui.index')}</p>
            </div>
            {/* En móvil no hay teclado: botón Cerrar visible. En escritorio, atajo ESC. */}
            <button
              type="button"
              onClick={close}
              className="u-label inline-flex h-[46px] shrink-0 items-center gap-2 border border-border px-2 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary min-[460px]:px-4 md:hidden"
            >
              <span className="hidden min-[460px]:inline">{t('nav.close')}</span>
              <X size={16} aria-hidden="true" />
            </button>
            <p className="u-label hidden text-text-muted md:block">{t('nav.escape')}</p>
          </div>

          <ol className="grid min-h-0 flex-1 auto-rows-min grid-cols-1 content-start gap-2.5 overflow-y-auto overscroll-contain sm:grid-cols-2 sm:gap-3 lg:grid-cols-3">
            {/* Secciones de la página actual */}
            {localizedSectionIndex.map((section, i) => (
              <li key={section.id}>
                {isProjectsPage ? (
                  <IndexCard
                    href={`${route('/')}#${section.id}`}
                    onClick={close}
                    index={String(i + 1).padStart(2, '0')}
                    label={section.label}
                  />
                ) : (
                  <IndexCard
                    href={`#${section.id}`}
                    index={String(i + 1).padStart(2, '0')}
                    label={section.label}
                    onClick={(e) => {
                      e.preventDefault()
                      close()
                      // Espera a que se libere el bloqueo de scroll del overlay antes de medir
                      scrollToSection(section.id, { delay: 30 })
                    }}
                  />
                )}
              </li>
            ))}

            {/* Botón de la otra página (solo en home; en /proyectos ya está Inicio como item 01) */}
            {!isProjectsPage && (
              <li>
                <IndexCard href={route('/proyectos')} onClick={close} index="→" label={t('nav.projects')} featured />
              </li>
            )}
          </ol>

          <div className="flex flex-col gap-3 border-t border-border py-4 sm:flex-row sm:items-center sm:justify-between sm:py-6">
            <p className="u-label text-text-muted">{site.email} — {site.location}</p>
          </div>
        </div>
      </div>
    </>
  )
}
