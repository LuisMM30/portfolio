import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Footer from '../layout/Footer'
import { useI18n } from '../../i18n/LocaleProvider'
import { localizePath } from '../../i18n'
import { getLegalContent } from '../../i18n/legalTranslations'

export default function LegalPage({ type }) {
  const location = useLocation()
  const { locale, t } = useI18n()
  const path = localizePath('/', locale)
  const [title, intro, sections] = getLegalContent(type, locale)

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <>
      <main className="min-h-screen pt-14 pb-12">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <Link to={path} className="u-label inline-flex items-center gap-2 text-text-muted transition-colors hover:text-accent">
            <ArrowLeft size={14} aria-hidden="true" /> {t('common.backPortfolio')}
          </Link>
          <header className="mt-7 border-t border-border pt-4 md:mt-10">
            <p className="u-label text-accent">{t('common.legalInfo')}</p>
            <h1 className="display mt-4 max-w-3xl text-5xl text-text-primary md:text-7xl">{title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">{intro}</p>
          </header>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {sections.map(([heading, text]) => (
              <section key={heading} className="grid gap-4 py-7 md:grid-cols-[220px_1fr] md:gap-10">
                <h2 className="u-label text-text-muted">{heading}</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">{text}</p>
              </section>
            ))}
          </div>
          <p className="mt-4 text-xs text-text-muted">{t('common.lastUpdated')}</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
