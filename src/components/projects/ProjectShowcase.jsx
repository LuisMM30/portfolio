import { useEffect, useRef, useState } from 'react'
import { ExternalLink, ArrowRight, Monitor } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import BrowserMockup from '../ui/BrowserMockup'
import CopyUrlButton from '../ui/CopyUrlButton'
import { cn } from '../../utils/cn'

function ProjectFigure({ project, variant = 'desktop' }) {
  const frameRef = useRef(null)
  const imgRef = useRef(null)
  const [revealed, setRevealed] = useState(false)

  // Clip-path reveal (once) instead of a generic fade-up.
  useEffect(() => {
    const el = frameRef.current
    if (!el) return undefined
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.25 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // Internal parallax is disabled: screenshots must stay fully visible (object-contain),
  // so no drift/scale that would crop the image inside the frame.

  return (
    <figure>
      <div
        ref={frameRef}
        data-cursor="explore"
        className={cn(
          'transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          revealed ? '[clip-path:inset(0_0_0%_0)]' : '[clip-path:inset(0_0_18%_0)]',
        )}
      >
        <BrowserMockup
          ref={undefined}
          src={project.images.desktop}
          alt={`Vista previa de ${project.title}`}
          url={project.url || 'proyecto-privado'}
          imgRef={imgRef}
          variant={variant}
          action={
            project.url && project.ctaType === 'external' ? (
              <CopyUrlButton
                url={project.url}
                className="flex h-7 w-7 cursor-pointer items-center justify-center rounded border border-border text-text-muted transition-colors hover:border-text-primary hover:text-accent"
              />
            ) : null
          }
        />
      </div>
    </figure>
  )
}

export default function ProjectShowcase({ project, index, onOpenModal }) {
  const reversed = index % 2 !== 0
  const badgeVariant = project.status === 'online' ? 'online' : 'private'
  const rowRef = useRef(null)

  const handleOpen = () => {
    if (project.ctaType === 'modal') onOpenModal(project)
  }

  return (
    <article ref={rowRef} className="group relative">
      {/* Entry header */}
      <header className="mb-10 flex items-center justify-between gap-4 border-b border-border pb-3 md:mb-14">
        <div className="flex min-w-0 items-baseline gap-4">
          <span className="font-mono text-sm text-accent">{project.id}</span>
          <span className="u-label truncate text-text-muted">{project.category}</span>
        </div>
        <Badge variant={badgeVariant}>{project.statusLabel}</Badge>
      </header>

      <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Text */}
        {/* min-w-0: without it, the mockup screenshots' intrinsic width (1500px+)
            inflates the grid track and the row overflows the right margin. */}
        <div className={cn('min-w-0 lg:col-span-5', reversed ? 'lg:order-2' : 'lg:order-1')}>
          <h3
            className="display text-3xl text-text-primary transition-transform duration-500 group-hover:translate-x-2 md:text-4xl xl:text-5xl"
            data-cursor={project.ctaType === 'modal' ? 'view' : undefined}
          >
            {project.title}
          </h3>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
            {project.description}
          </p>          <p className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-sm text-text-muted">
            {project.technologies.map((tech, i) => (
              <span key={tech} className="inline-flex items-baseline gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                <span className="cursor-default transition-colors hover:text-accent">{tech}</span>
              </span>
            ))}
          </p>

          {project.desktopOnly && (
            <p className="mt-3 flex items-center gap-2 text-sm text-text-muted">
              <Monitor size={15} aria-hidden="true" className="shrink-0" />
              Único proyecto de esta página no responsive: preparado solo para ordenadores.
            </p>
          )}

          <div className="mt-8">
            {project.ctaType === 'external' ? (
              <Button href={project.url} external variant="primary" size="md" data-cursor="view">
                {project.cta}
                <ExternalLink size={16} aria-hidden="true" />
              </Button>
            ) : (
              <div className="flex flex-wrap items-center gap-5">
                <Button variant="primary" size="md" onClick={handleOpen} data-cursor="view">
                  {project.cta}
                  <ArrowRight size={16} aria-hidden="true" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Figures */}
        <div className={cn('min-w-0 lg:col-span-7', reversed ? 'lg:order-1' : 'lg:order-2')}>
          <div
            className="flex flex-col items-start gap-4 md:gap-6 sm:flex-row"
          >
            <div className="w-full min-w-0 flex-1">
              <ProjectFigure
                project={project}
              />
            </div>
            {project.images.mobile && (
              <div className="w-full min-w-0 shrink-0 sm:w-[240px]">
                <ProjectFigure
                  project={{ ...project, images: { desktop: project.images.mobile } }}
                  variant="phone"
                />
              </div>
            )}
            {!project.images.mobile && project.images.desktop2 && (
              <div className="w-full min-w-0 shrink-0 sm:w-[38%]">
                <ProjectFigure
                  project={{ ...project, images: { desktop: project.images.desktop2 } }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
