import { useMemo, useState } from 'react'
import { skillCategories } from '../../data/skills'
import { projects } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'

export default function TechStack() {
  const [activeTech, setActiveTech] = useState(null)

  // Real relationships only: tech → projects that actually list it.
  const usage = useMemo(() => {
    const map = {}
    projects.forEach((project) => {
      const all = [
        ...(project.technologies ?? []),
        ...(project.details?.technologies ?? []),
        ...(project.details?.subProjects?.flatMap((sub) => sub.technologies) ?? []),
      ]
      all.forEach((tech) => {
        const key = tech.toLowerCase()
        ;(map[key] ??= { label: tech, projects: new Set() }).projects.add(project)
      })
    })
    return map
  }, [])

  const active = activeTech ? usage[activeTech.toLowerCase()] : null

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          title="Tecnologías con las que trabajo"
          subtitle="Lenguajes, plataformas y herramientas que utilizo en proyectos reales."
          id="tecnologias"
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Stack list */}
          <div className="lg:col-span-8">
            <ol className="border-b border-border">
              {skillCategories.map((category) => (
                <li key={category.title}>
                  <div className="grid items-baseline gap-x-10 gap-y-4 border-t border-border py-6 md:grid-cols-[220px_1fr] md:py-7">
                    <h3 className="u-label text-text-muted">{category.title}</h3>
                    <p className="flex flex-wrap gap-x-3 gap-y-1.5 font-medium text-text-primary">
                      {category.skills.map((skill, i) => {
                        const key = skill.toLowerCase()
                        const isUsed = Boolean(usage[key])
                        const isActive = activeTech === skill
                        const dimmed = activeTech && !isActive
                        return (
                          <span key={skill} className="inline-flex items-baseline gap-3">
                            {i > 0 && (
                              <span className="font-normal text-text-muted" aria-hidden="true">
                                /
                              </span>
                            )}
                            <button
                              type="button"
                              onMouseEnter={() => setActiveTech(skill)}
                              onFocus={() => setActiveTech(skill)}
                              onBlur={() => setActiveTech(null)}
                              onClick={() => setActiveTech(isActive ? null : skill)}
                              className={[
                                'cursor-pointer transition-colors duration-200',
                                isUsed ? '' : 'text-text-muted',
                                isActive ? 'text-accent' : '',
                                dimmed ? 'opacity-40' : '',
                                'hover:opacity-100 hover:text-accent',
                              ]
                                .filter(Boolean)
                                .join(' ')}
                              aria-pressed={isActive}
                            >
                              {skill}
                            </button>
                          </span>
                        )
                      })}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* Usage panel — only real relationships */}
          <aside className="lg:col-span-4">
            <div className="border border-border bg-bg-secondary/40 p-5 lg:sticky lg:top-32">
              <p className="u-label text-text-muted">En proyectos reales</p>
              {active ? (
                <div className="mt-4">
                  <p className="display text-2xl text-text-primary">{active.label}</p>
                  <ul className="mt-4 divide-y divide-border border-y border-border">
                    {[...active.projects].map((project) => (
                      <li key={project.slug} className="flex items-baseline justify-between gap-3 py-3">
                        <span className="font-mono text-xs text-accent">{project.id}</span>
                        <span className="text-sm font-medium text-text-primary">
                          {project.title}
                        </span>
                        <span className="u-label text-text-muted">{project.category}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="mt-4 text-sm text-text-secondary leading-relaxed">
                  Pasa el cursor sobre una tecnología para ver en qué proyectos se ha utilizado de
                  verdad.
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
