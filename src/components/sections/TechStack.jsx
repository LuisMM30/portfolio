import { useMemo, useRef, useState } from 'react'
import { Radar } from 'lucide-react'
import { skillCategories } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import useInView from '../../hooks/useInView'

/* One orbiting chip. Position is computed with CSS custom properties; the
   animation itself lives in index.css so prefers-reduced-motion is respected. */
function OrbitChip({ skill, ringSlot, angleDeg, isActive, isDimmed, onSelect }) {
  const chipRef = useRef(null)
  const isReversedRing = ringSlot % 2 === 1

  const handleMove = () => {
    const el = chipRef.current
    const host = el?.closest('.radar-stage')
    if (!el || !host) return
    const r = el.getBoundingClientRect()
    const h = host.getBoundingClientRect()
    el.style.setProperty('--mx', `${r.left + r.width / 2 - h.left}px`)
    el.style.setProperty('--my', `${r.top + r.height / 2 - h.top}px`)
  }

  return (
    <button
      ref={chipRef}
      type="button"
      onMouseMove={handleMove}
      onClick={() => onSelect(isActive ? null : skill)}
      onMouseEnter={() => onSelect(skill)}
      onFocus={() => onSelect(skill)}
      onBlur={() => onSelect(null)}
      aria-pressed={isActive}
      className={[
        'radar-chip absolute font-mono text-[.68rem] sm:text-xs whitespace-nowrap',
        isReversedRing ? 'radar-chip--rev' : '',
        isActive ? 'radar-chip--active text-accent' : '',
        isDimmed ? 'radar-chip--dim' : '',
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        '--ring': ringSlot,
        '--angle': `${angleDeg}deg`,
      }}
    >
      {skill}
    </button>
  )
}

function RadarReadout({ activeSkill }) {
  if (!activeSkill) {
    return (
      <p className="u-label leading-relaxed text-text-muted">
        Sistema listo. Activa un nodo del radar para ver la descripción de la tecnología.
      </p>
    )
  }
  return (
    <div key={activeSkill.name} className="radar-readout">
      <p className="display text-xl text-text-primary sm:text-2xl">{activeSkill.name}</p>
      <span aria-hidden="true" className="mt-2 block h-px w-10 bg-accent" />
      <p className="mt-4 text-sm leading-relaxed text-text-secondary">
        {activeSkill.description}
      </p>
    </div>
  )
}

export default function TechStack() {
  const [activeName, setActiveName] = useState(null)
  const [stageRef, stageInView] = useInView(0.15)

  // Flatten every skill once, carrying its category for the readout.
  const allSkills = useMemo(
    () =>
      skillCategories.flatMap((category) =>
        category.skills.map((skill) => ({ ...skill, category: category.title })),
      ),
    [],
  )

  // Uniform distribution: sort by name and walk the full circle with equal
  // angular steps, so chips never cluster regardless of category sizes.
  // Rings only control radius/speed; the angle comes from the global order.
  const chips = useMemo(() => {
    const ordered = [...allSkills].sort((a, b) => a.name.localeCompare(b.name))
    const step = 360 / ordered.length
    // Bigger categories get outer rings so wide chip lists have more room.
    const counts = skillCategories.map((c) => ({ title: c.title, count: c.skills.length }))
    const slotByTitle = new Map(
      [...counts].sort((a, b) => b.count - a.count).map((c, slot) => [c.title, slot]),
    )
    return ordered.map((skill, index) => ({
      ...skill,
      angleDeg: index * step + slotByTitle.get(skill.category) * 7,
      ringSlot: slotByTitle.get(skill.category),
    }))
  }, [allSkills])

  const activeSkill = chips.find((c) => c.name === activeName) ?? null

  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="04"
          title="Tecnologías con las que trabajo"
          singleLine
          id="tecnologias"
        />

        <div className="grid items-center gap-14 md:grid-cols-12 md:gap-10">
          {/* Mobile only: compact chip grid (no radar geometry, zero overlaps) */}
          <div className="tech-chip-grid md:hidden">
            {chips.map((chip) => (
              <button
                key={chip.name}
                type="button"
                onClick={() => {
                  setActiveName(activeName === chip.name ? null : chip.name)
                  if (activeName !== chip.name) {
                    document.getElementById('tech-readout')?.scrollIntoView({
                      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                      block: 'nearest',
                    })
                  }
                }}
                aria-pressed={activeName === chip.name}
                className={[
                  'cursor-pointer border px-3 py-2.5 font-mono text-[.72rem] leading-tight transition-colors duration-200',
                  activeName === chip.name
                    ? 'border-accent bg-accent/15 text-accent'
                    : 'border-border bg-bg-secondary/40 text-text-primary hover:border-border-strong',
                ].join(' ')}
              >
                {chip.name}
              </button>
            ))}
          </div>

          {/* Radar stage (tablet + desktop) */}
          <div
            ref={stageRef}
            className={[
              'radar-stage relative mx-auto hidden aspect-square w-full max-w-[620px] md:col-span-7 md:block',
              stageInView ? 'radar-stage--in' : '',
            ].join(' ')}
          >
            {/* Concentric rings (one per category) + cross axes */}
            {[1, 2, 3, 4, 5].map((n) => (
              <span key={n} aria-hidden="true" className={`radar-ring radar-ring--${n}`} />
            ))}
            <span aria-hidden="true" className="radar-axis radar-axis--h" />
            <span aria-hidden="true" className="radar-axis radar-axis--v" />
            {/* Sweep */}
            <span aria-hidden="true" className="radar-sweep" />

            {/* Core */}
            <div className="radar-core" aria-hidden="true">
              <Radar size={18} />
              <span className="u-label mt-1">stack</span>
            </div>

            {chips.map((chip) => (
              <OrbitChip
                key={chip.name}
                skill={chip.name}
                ringSlot={chip.ringSlot}
                angleDeg={chip.angleDeg}
                isActive={activeName === chip.name}
                isDimmed={Boolean(activeName) && activeName !== chip.name}
                onSelect={setActiveName}
              />
            ))}
          </div>

          {/* Readout panel */}
          <aside id="tech-readout" className="md:col-span-5">
            <div className="radar-panel relative overflow-hidden border border-border-strong bg-bg-secondary/40 p-5 md:sticky md:top-32">
              <span aria-hidden="true" className="radar-scan" />
              <div className="relative">
                <p className="u-label flex items-center gap-2 text-text-muted">
                  <Radar size={14} aria-hidden="true" className="text-accent" />
                  Descripción de la tecnología
                </p>
                <div className="mt-5 min-h-[130px]">
                  <RadarReadout activeSkill={activeSkill} />
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}
