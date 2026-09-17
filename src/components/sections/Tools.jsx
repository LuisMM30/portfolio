import { useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, ChevronRight, Cpu, Sparkles } from 'lucide-react'
import { toolCategories, aiMessage } from '../../data/tools'
import SectionHeading from '../ui/SectionHeading'
import useInView from '../../hooks/useInView'

const GLYPHS = '!<>-_\\/[]{}=+*^?#01'

// Terminal "typed" text: reveals character by character with glyph noise.
function TypedText({ text, play, speed = 18, className }) {
  const [output, setOutput] = useState(play ? '' : text)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!play) {
      setOutput(text)
      return undefined
    }
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) {
      setOutput(text)
      return undefined
    }
    let index = 0
    setOutput('')
    timerRef.current = window.setInterval(() => {
      index += 1
      const noise = index < text.length && Math.random() > 0.82
      const char = noise ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : text[index - 1]
      setOutput(text.slice(0, index - 1) + char)
      if (index >= text.length) {
        setOutput(text)
        window.clearInterval(timerRef.current)
      }
    }, speed)
    return () => window.clearInterval(timerRef.current)
  }, [text, play, speed])

  return (
    <span className={className} aria-label={text}>
      {output}
    </span>
  )
}

function ToolLog({ tools, inView, keyPrefix }) {
  return (
    <ol
      key={keyPrefix}
      className="grid gap-x-8 gap-y-0 sm:grid-cols-2 lg:grid-cols-3"
    >
      {tools.map((tool, index) => (
        <li
          key={`${keyPrefix}-${tool}`}
          data-revealed={inView}
          className="tools-log-item flex items-baseline gap-3 border-b border-border/60 py-3 last:border-b-0 sm:odd:pr-4"
          style={{ animationDelay: inView ? `${index * 55}ms` : '0ms' }}
        >
          <span className="font-mono text-[.65rem] text-accent" aria-hidden="true">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span className="font-medium text-text-primary transition-colors duration-200 hover:text-accent">
            {tool}
          </span>
        </li>
      ))}
    </ol>
  )
}

/* Mobile/tablet accordion row: category title + count + expandable tools. */
function CategoryAccordion({ item, index, inView, isOpen, onToggle }) {
  const contentId = `tools-panel-${index}`
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full cursor-pointer items-center gap-3 px-5 py-4 text-left transition-colors hover:bg-bg-secondary/60"
      >
        <span className="font-mono text-xs text-accent">{String(index + 1).padStart(2, '0')}</span>
        <span className="flex-1 text-[1.05rem] font-semibold uppercase tracking-tight text-accent">
          {item.title}
        </span>
        <span className="u-label text-text-muted">{item.tools.length}</span>
        <span
          aria-hidden="true"
          className={[
            'tools-chevron text-text-muted transition-transform duration-300',
            isOpen ? 'rotate-180 text-accent' : '',
          ].join(' ')}
        >
          <ChevronDown size={16} />
        </span>
      </button>
      <div id={contentId} className="tools-collapse" data-open={isOpen}>
        {/* Padding on an inner wrapper: the direct grid child must be padding-free
            so the 0fr track can collapse it to a true 0px height. */}
        <div>
          <div className="px-5 pb-5">
            <ToolLog tools={item.tools} inView={inView} keyPrefix={`m-${item.title}`} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Tools() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [openMobileIndex, setOpenMobileIndex] = useState(null)
  const [sectionRef, sectionInView] = useInView(0.1)
  const category = toolCategories[activeIndex]
  const tools = useMemo(() => category?.tools ?? [], [category])

  return (
    <section className="py-24 md:py-36" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="05"
          title="Herramientas e IA"
          subtitle={aiMessage}
          id="herramientas"
          sticky={false}
        />

        <div
          className={[
            'tools-terminal terminal-box relative border border-border-strong bg-bg-secondary/50',
            sectionInView ? 'tools-terminal--in' : '',
          ].join(' ')}
        >
          {/* Title bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-5 py-3.5">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="tools-dot tools-dot--r" />
              <span className="tools-dot tools-dot--y" />
              <span className="tools-dot tools-dot--g" />
            </div>
            <p className="u-label flex items-center gap-2 text-text-muted">
              <Cpu size={13} aria-hidden="true" className="text-accent" />
              toolkit — flujo de trabajo
            </p>
            <p className="u-label hidden items-center gap-1.5 text-text-muted sm:flex" aria-hidden="true">
              <span className="relative flex h-1.5 w-1.5">
                <span className="tools-ping absolute inline-flex h-full w-full" />
                <span className="relative inline-flex h-1.5 w-1.5 bg-online" />
              </span>
              IA activa
            </p>
          </div>

          {/* Typed boot line */}
          <div className="border-b border-border px-5 py-4 font-mono text-xs sm:text-sm">
            <p className="flex items-baseline gap-2">
              <ChevronRight size={13} aria-hidden="true" className="shrink-0 translate-y-0.5 text-accent" />
              <TypedText
                text="awake@portfolio:~$ cargar herramientas --con-ia"
                play={sectionInView}
                className="text-text-primary"
              />
            </p>
            <p className="u-label mt-2 pl-6 text-text-muted">
              <TypedText
                text={`// ${toolCategories.reduce((acc, c) => acc + c.tools.length, 0)} herramientas listadas · ${toolCategories.length} módulos`}
                play={sectionInView}
                speed={12}
              />
            </p>
          </div>

          {/*
            Two layouts:
            - < lg: every category stacked with its tools always visible —
              nothing depends on tapping a tab far away from the content.
            - ≥ lg: interactive tabs + single log panel (hover/click works there
              because tab and content share the viewport).
          */}

          {/* Mobile / tablet: accordion — title + count + expandable tools */}
          <div className="lg:hidden">
            {toolCategories.map((item, index) => (
              <CategoryAccordion
                key={item.title}
                item={item}
                index={index}
                inView={sectionInView}
                isOpen={openMobileIndex === index}
                onToggle={() => setOpenMobileIndex(openMobileIndex === index ? null : index)}
              />
            ))}
            <p className="u-label flex items-center gap-2 px-5 py-5 text-text-muted">
              <Sparkles size={13} aria-hidden="true" className="text-accent" />
              La IA apoya el flujo, siempre con revisión técnica y criterio propio.
            </p>
          </div>

          {/* Desktop: tabs + single log panel */}
          <div className="hidden lg:block">
            <div className="flex flex-wrap gap-2 border-b border-border px-5 py-4" role="tablist" aria-label="Categorías de herramientas">
              {toolCategories.map((item, index) => {
                const isActive = index === activeIndex
                return (
                  <button
                    key={item.title}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    data-revealed={sectionInView}
                    onClick={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={[
                      'u-label tools-tab cursor-pointer border px-3 py-2 transition-[background-color,border-color,color,transform,opacity] duration-300',
                      isActive
                        ? 'border-accent bg-accent text-[color:var(--accent-ink)]'
                        : 'border-border bg-bg-primary/40 text-text-muted hover:border-border-strong hover:text-text-primary',
                      sectionInView ? 'tools-tab--in' : '',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    style={{ animationDelay: sectionInView ? `${index * 60}ms` : '0ms' }}
                  >
                    <span className="mr-1.5 font-mono opacity-70">{String(index + 1).padStart(2, '0')}</span>
                    {item.title}
                  </button>
                )
              })}
            </div>

            <div className="px-5 py-6" role="tabpanel">
              <ToolLog tools={tools} inView={sectionInView} keyPrefix={category.title} />
              <p className="u-label mt-6 flex items-center gap-2 text-text-muted">
                <Sparkles size={13} aria-hidden="true" className="text-accent" />
                La IA apoya el flujo, siempre con revisión técnica y criterio propio.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
