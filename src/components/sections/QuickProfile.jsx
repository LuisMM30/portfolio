import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import DownloadCVButton from '../ui/DownloadCVButton'

export default function QuickProfile() {
  return (
    <section id="perfil" className="border-b border-border">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-10 items-end">
          {/* Identity */}
          <div className="lg:col-span-5">
            <h2 className="display text-4xl md:text-5xl text-text-primary">{site.name}</h2>
            <p className="mt-3 text-text-secondary text-lg">
              {site.role} — {site.education}
            </p>
            <p className="mt-2 text-sm text-text-muted max-w-md">
              Proyectos reales para negocios y empresas, de la idea al producto final.
            </p>
          </div>

          {/* Tech line */}
          <div className="lg:col-span-4">
            <p className="u-label text-text-muted mb-3">Stack principal</p>
            <p className="text-text-primary font-medium leading-relaxed flex flex-wrap gap-x-2 gap-y-1">
              {site.mainTech.map((tech, i) => (
                <span key={tech} className="inline-flex items-baseline gap-2">
                  {i > 0 && <span className="text-text-muted" aria-hidden="true">/</span>}
                  <span className="hover:text-accent transition-colors cursor-default">{tech}</span>
                </span>
              ))}
            </p>
            <p className="mt-4 text-sm text-text-secondary">
              {site.highlights.join(' / ')}
            </p>
          </div>

          {/* Actions */}
          <div className="lg:col-span-3 flex flex-col sm:flex-row lg:flex-col gap-3 lg:items-end">
            <DownloadCVButton variant="primary" size="md" className="w-full sm:w-auto" />
            <Link
              to="/proyectos"
              className="inline-flex min-h-[44px] w-full items-center justify-center border border-border-strong px-5 py-2.5 text-sm font-medium text-text-primary transition-all duration-300 hover:border-text-primary hover:bg-bg-secondary sm:w-auto"
            >
              Ver proyectos
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
