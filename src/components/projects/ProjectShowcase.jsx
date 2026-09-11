import { useEffect, useRef, useState } from 'react'
import { ExternalLink, ArrowRight } from 'lucide-react'
import Badge from '../ui/Badge'
import Button from '../ui/Button'
import BrowserMockup from '../ui/BrowserMockup'
import { usePointerParallax } from '../../hooks/usePointer'
import { cn } from '../../utils/cn'

function ProjectFigure({ project, label }) {
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

  // Internal parallax: image drifts slightly against the scroll.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    let raf = 0
    const update = () => {
      raf = 0
      const el = frameRef.current
      const img = imgRef.current
      if (!el || !img) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const t = Math.min(Math.max((rect.top + rect.height / 2 - vh / 2) / vh, -1), 1)
      img.style.transform = `translate3d(0, ${(t * 4).toFixed(2)}%, 0) scale(1.06)`
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
  }, [])

  return (
    <figure>
      <div
        ref={frameRef}
        data-cursor="explore"
        className={cn(
          'border border-border bg-bg-secondary transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]',
          revealed ? '[clip-path:inset(0_0_0%_0)]' : '[clip-path:inset(0_0_18%_0)]',
        )}
      >
        <BrowserMockup
          ref={undefined}
          src={project.images.desktop}
          alt={`Vista previa de ${project.title}`}
          url={project.url || 'proyecto-privado'}
          imgRef={imgRef}
        />
      </div>
      <figcaption className="u-label mt-2.5 text-text-muted">{label}</figcaption>
    </figure>
  )
}

export default function ProjectShowcase({ project, index, onOpenModal }) {
  const reversed = index % 2 !== 0
  const badgeVariant = project.status === 'online' ? 'online' : 'private'
  const rowRef = useRef(null)
  const previewRef = useRef(null)

  usePointerParallax(previewRef, { depth: 0.03 })

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
        <div className={cn('lg:col-span-5', reversed ? 'lg:order-2' : 'lg:order-1')}>
          <h3
            className="display text-3xl text-text-primary transition-transform duration-500 group-hover:translate-x-2 md:text-4xl xl:text-5xl"
            data-cursor={project.ctaType === 'modal' ? 'view' : undefined}
          >
            {project.title}
          </h3>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
            {project.description}
          </p>

          <p className="mt-6 flex flex-wrap gap-x-2 gap-y-1 font-mono text-sm text-text-muted">
            {project.technologies.map((tech, i) => (
              <span key={tech} className="inline-flex items-baseline gap-2">
                {i > 0 && <span aria-hidden="true">/</span>}
                <span className="cursor-default transition-colors hover:text-accent">{tech}</span>
              </span>
            ))}
          </p>

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
                <button
                  type="button"
                  onClick={handleOpen}
                  className="u-label cursor-pointer pb-0.5 text-text-muted transition-colors hover:text-accent link-underline"
                >
                  Ver case study
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Figures */}
        <div className={cn('lg:col-span-7', reversed ? 'lg:order-1' : 'lg:order-2')}>
          <div
            className={cn(
              'flex items-start gap-4 md:gap-6',
              project.images.mobile && 'flex-col sm:flex-row',
            )}
          >
            <div className="min-w-0 flex-1">
              <ProjectFigure
                project={project}
                label={`FIG. ${project.id} — escritorio`}
              />
            </div>
            {project.images.mobile && (
              <div className="shrink-0 sm:w-[38%] lg:w-[30%]">
                <ProjectFigure
                  project={{ ...project, images: { desktop: project.images.mobile } }}
                  label={`FIG. ${project.id}b — móvil`}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}
