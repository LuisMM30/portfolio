import { ArrowUpRight } from 'lucide-react'
import { capabilities } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'

export default function Capabilities() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading index="03" title="Qué puedo construir" id="servicios" />

        <ol className="border-b border-border">
          {capabilities.map((cap, i) => (
            <li key={cap.title}>
              <a
                href={`#${cap.experienceId}`}
                onClick={(event) => {
                  event.preventDefault()
                  document.getElementById(cap.experienceId)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="group grid items-baseline gap-x-8 gap-y-3 border-t border-border px-2 py-7 transition-colors hover:bg-bg-secondary/50 sm:grid-cols-12 sm:px-3 sm:py-9"
              >
                <span className="font-mono text-sm text-accent sm:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="text-xl font-semibold tracking-tight text-text-primary transition-colors group-hover:text-accent sm:col-span-4 md:text-2xl">
                  {cap.title}
                </h3>
                <p className="max-w-lg leading-relaxed text-text-secondary sm:col-span-6">
                  {cap.description}
                </p>
                <span className="justify-self-end text-text-muted transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-1 group-hover:text-accent sm:col-span-1">
                  <ArrowUpRight size={20} aria-hidden="true" />
                </span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
