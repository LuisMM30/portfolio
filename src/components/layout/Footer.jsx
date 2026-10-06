import { Download, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cv, site } from '../../data/site'
import { useI18n } from '../../i18n/LocaleProvider'
import { localizePath } from '../../i18n'

export default function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const { locale, t } = useI18n()
  const route = (path) => localizePath(path, locale)
  const onProjectsPage = location.pathname.endsWith('/proyectos')

  const projectsLink = onProjectsPage
    ? { to: `${route('/')}#experiencia`, label: t('common.viewExperience') }
    : { to: route('/proyectos'), label: t('common.viewProjects') }
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 md:pt-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="display text-2xl text-text-primary md:text-3xl">{site.name}</p>
            <p className="mt-2 text-sm text-text-secondary">
              {t('hero.role')} — {site.location}
            </p>
          </div>

          <div>
            <p className="u-label mb-4 border-b border-border pb-2 text-text-muted">{t('footer.contact')}</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${site.email}`}
                  className="link-underline inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-accent"
                >
                  {site.email}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
              <li>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="link-underline inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-accent"
                >
                  LinkedIn
                  <ArrowUpRight size={13} aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="u-label mb-4 border-b border-border pb-2 text-text-muted">{t('footer.navigation')}</p>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link
                  to={projectsLink.to}
                  className="link-underline inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-accent"
                >
                  {projectsLink.label}
                  <ArrowUpRight size={13} aria-hidden="true" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <p className="u-label mb-4 border-b border-border pb-2 text-text-muted">{t('footer.documents')}</p>
            <ul className="space-y-2.5 text-sm">
              <li className="flex justify-start">
                <a
                  href={cv.url}
                  download={cv.fileName}
                  className="link-underline inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-accent"
                >
                  <Download size={14} aria-hidden="true" />
                  {t('common.downloadCv')}
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="u-label mb-4 border-b border-border pb-2 text-text-muted">{t('footer.legal')}</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to={route('/aviso-legal')} className="link-underline text-text-secondary transition-colors hover:text-accent">{t('footer.legalNotice')}</Link></li>
              <li><Link to={route('/politica-privacidad')} className="link-underline text-text-secondary transition-colors hover:text-accent">{t('footer.privacy')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-border pt-5 sm:flex-row sm:items-center">
          <p className="u-label text-text-muted">
            {t('common.copyright', { year, name: site.name })}
          </p>
          <p className="u-label text-text-muted">
            {t('common.portfolioYear', { location: site.location, year })}
          </p>
        </div>
      </div>
    </footer>
  )
}
