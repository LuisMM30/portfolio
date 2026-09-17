import { useEffect, useRef } from 'react'
import { X, ExternalLink, Monitor } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import { cn } from '../../utils/cn'

function Section({ label, children }) {
  return (
    <section className="pt-6 border-t border-border">
      <h3 className="u-label text-text-muted mb-4">{label}</h3>
      {children}
    </section>
  )
}

export default function ProjectModal({ project, isOpen, onClose }) {
  const closeButtonRef = useRef(null)
  const panelRef = useRef(null)
  const open = isOpen && Boolean(project?.details)

  useEffect(() => {
    if (!open) return undefined

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    closeButtonRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  const { details } = project ?? {}

  return (
    <div
      ref={panelRef}
      className={cn(
        'fixed inset-0 z-[100] transition-[opacity,visibility] duration-250',
        open ? 'visible opacity-100' : 'invisible opacity-0',
      )}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      hidden={!open}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70" onClick={onClose} aria-hidden="true" />

      {/* Panel */}
      <div className="absolute inset-0 flex items-end justify-center sm:items-center sm:p-6">
        <div
          className={cn(
            'max-h-[92vh] w-full overflow-y-auto border border-border bg-bg-primary transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] sm:max-h-[88vh] sm:max-w-3xl lg:max-w-4xl',
            open ? 'translate-y-0' : 'translate-y-6',
          )}
        >
          {details && (
            <>
              {/* Header */}
              <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-bg-primary px-5 py-4 md:px-8">
                <div className="flex min-w-0 items-center gap-4">
                  <span
                    className="shrink-0 font-mono text-sm text-accent"
                    aria-hidden="true"
                  >
                    {project.id}
                  </span>
                  <div className="min-w-0">
                    <Badge
                      variant={project.status === 'online' ? 'online' : 'private'}
                      className="mb-1.5"
                    >
                      {details.status}
                    </Badge>
                    {project.desktopOnly && (
                      <p className="mt-1.5 flex items-center gap-1.5 text-xs text-text-muted">
                        <Monitor size={13} aria-hidden="true" className="shrink-0" />
                        Solo ordenadores · no responsive
                      </p>
                    )}
                    <h2
                      id="modal-title"
                      className="truncate text-lg font-semibold tracking-tight text-text-primary md:text-2xl"
                    >
                      {project.title}
                    </h2>
                  </div>
                </div>
                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={onClose}
                  className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center border border-border p-2.5 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
                  aria-label="Cerrar"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="px-5 py-2 md:px-8">
                <Section label="Contexto">
                  {(Array.isArray(details.context) ? details.context : [details.context]).map(
                    (paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="mb-3 leading-relaxed text-text-secondary last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ),
                  )}
                </Section>

                <Section label="El proyecto">
                  {(Array.isArray(details.project) ? details.project : [details.project]).map(
                    (paragraph) => (
                      <p
                        key={paragraph.slice(0, 32)}
                        className="mb-3 leading-relaxed text-text-secondary last:mb-0"
                      >
                        {paragraph}
                      </p>
                    ),
                  )}
                </Section>

                {details.subProjects && (
                  <Section label="Proyectos">
                    <div className="grid gap-6 sm:grid-cols-2">
                      {details.subProjects.map((sub) => (
                        <article key={sub.name}>
                          <div className="border border-border bg-bg-secondary">
                            <img
                              src={sub.image}
                              alt={sub.name}
                              loading="lazy"
                              className="aspect-video w-full object-cover object-top"
                            />
                          </div>
                          <p className="u-label mb-1 mt-2.5 text-text-muted">{sub.category}</p>
                          <h4 className="font-semibold text-text-primary">{sub.name}</h4>
                          <p className="mb-3 mt-1.5 text-sm text-text-secondary">
                            {sub.description}
                          </p>
                          <p className="flex flex-wrap gap-x-2 font-mono text-xs text-text-muted">
                            {sub.technologies.map((tech, i) => (
                              <span key={tech} className="inline-flex items-baseline gap-2">
                                {i > 0 && <span aria-hidden="true">/</span>}
                                {tech}
                              </span>
                            ))}
                          </p>
                        </article>
                      ))}
                    </div>
                  </Section>
                )}

                {details.features && (
                  <Section label="Funcionalidades">
                    <ul>
                      {details.features.map((feature, i) => (
                        <li
                          key={feature}
                          className="flex items-baseline gap-4 border-b border-border/60 py-3 last:border-b-0"
                        >
                          <span className="shrink-0 font-mono text-xs text-accent">
                            {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-sm text-text-secondary">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </Section>
                )}

                <Section label="Tecnologías">
                  <p className="flex flex-wrap gap-x-2.5 gap-y-1 font-mono text-sm text-text-primary">
                    {details.technologies.map((tech, i) => (
                      <span key={tech} className="inline-flex items-baseline gap-2.5">
                        {i > 0 && <span className="text-text-muted" aria-hidden="true">/</span>}
                        {tech}
                      </span>
                    ))}
                  </p>
                </Section>

                {details.goal && (
                  <Section label="Objetivo principal">
                    <p className="leading-relaxed text-text-secondary">{details.goal}</p>
                  </Section>
                )}

                <div className="flex flex-col gap-4 pb-8 pt-8 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-3">
                    <span className="u-label text-text-muted">Estado</span>
                    <Badge variant={project.status === 'online' ? 'online' : 'private'}>
                      {details.status}
                    </Badge>
                  </div>
                  {project.url && (
                    <Button href={project.url} external variant="primary">
                      Visitar web
                      <ExternalLink size={16} aria-hidden="true" />
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
