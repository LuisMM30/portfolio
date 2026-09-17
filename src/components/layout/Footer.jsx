import { Download, ArrowUpRight } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import { cv, site } from '../../data/site'

export default function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const onProjectsPage = location.pathname === '/proyectos'

  const projectsLink = onProjectsPage
    ? { to: '/#experiencia', label: 'Ver experiencia' }
    : { to: '/proyectos', label: 'Ver proyectos' }
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-7xl px-5 pb-8 pt-14 sm:px-6 md:pt-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div>
            <p className="display text-2xl text-text-primary md:text-3xl">{site.name}</p>
            <p className="mt-2 text-sm text-text-secondary">
              {site.role} — {site.location}
            </p>
          </div>

          <div>
            <p className="u-label mb-4 border-b border-border pb-2 text-text-muted">Contacto</p>
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
            <p className="u-label mb-4 border-b border-border pb-2 text-text-muted">Navegación</p>
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
            <p className="u-label mb-4 border-b border-border pb-2 text-text-muted">Documentos</p>
            <ul className="space-y-2.5 text-sm">
              <li className="flex justify-start">
                <a
                  href={cv.url}
                  download={cv.fileName}
                  className="link-underline inline-flex items-center gap-2 text-text-secondary transition-colors hover:text-accent"
                >
                  <Download size={14} aria-hidden="true" />
                  Descargar CV
                </a>
              </li>
            </ul>
          </div>

          <div>
            <p className="u-label mb-4 border-b border-border pb-2 text-text-muted">Legal</p>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/aviso-legal" className="link-underline text-text-secondary transition-colors hover:text-accent">Aviso legal</Link></li>
              <li><Link to="/politica-privacidad" className="link-underline text-text-secondary transition-colors hover:text-accent">Privacidad</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-border pt-5 sm:flex-row sm:items-center">
          <p className="u-label text-text-muted">
            © {year} — {site.name}
          </p>
          <p className="u-label text-text-muted">
            {site.location} — Portfolio {year}
          </p>
        </div>
      </div>
    </footer>
  )
}
