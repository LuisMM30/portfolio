import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { site } from '../../data/site'
import HeroInfoVariants from '../ui/HeroInfoVariants'
import { useEnvironment } from '../../hooks/useEnvironment'
import { useI18n } from '../../i18n/LocaleProvider'
import { localizePath } from '../../i18n'

const nameLines = [
  { text: 'LUIS', scroll: 0.18 },
  { text: 'MONTES', scroll: 0.3 },
  { text: 'DE OCA', scroll: 0.1 },
]

export default function Hero() {
  const { motionEnabled } = useEnvironment()
  const { locale, t } = useI18n()
  const route = (path) => localizePath(path, locale)
  const specRows = [
    { label: t('ui.role'), value: t('hero.role').replace(' Junior', '\\nJunior') },
    { label: t('hero.base'), value: site.location },
    { label: t('ui.training'), value: t('hero.education') },
    { label: t('common.status'), value: t('hero.available'), live: true },
  ]
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
            {t('hero.portfolioRole', { role: t('hero.role') })}
          </p>
          <p className="u-label hidden text-text-muted md:block">{t('hero.availableProjects')}</p>
        </div>

        {/* Monumental name */}
        <div className="hero-content flex flex-1 flex-col justify-center py-8 md:py-10">
          <h1 className="sr-only">
            {site.name} — {t('hero.role')} en {site.location}
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
              {t('hero.headline')} {site.subheadline}
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                to={`${route('/')}#experiencia`}
                className="inline-flex min-h-[44px] items-center justify-center gap-2 whitespace-nowrap bg-accent px-7 py-3.5 text-base font-medium text-accent-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent-hover"
                data-cursor="view"
              >
                {t('hero.aboutCta')}
                <ArrowRight size={18} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>

    </section>
  )
}
