import { toolCategories, aiMessage } from '../../data/tools'
import SectionHeading from '../ui/SectionHeading'

export default function Tools() {
  return (
    <section className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          title="Herramientas e IA"
          subtitle={aiMessage}
          id="herramientas"
        />

        <ol className="border-b border-border">
          {toolCategories.map((category, i) => (
            <li key={category.title}>
              <div className="grid md:grid-cols-[260px_1fr] gap-x-10 gap-y-4 py-6 md:py-7 border-t border-border items-baseline">
                <h3 className="u-label text-text-muted">
                  <span className="text-accent mr-2">{String(i + 1).padStart(2, '0')}</span>
                  {category.title}
                </h3>
                <p className="font-medium text-text-primary flex flex-wrap gap-x-3 gap-y-1.5">
                  {category.tools.map((tool, idx) => (
                    <span key={tool} className="inline-flex items-baseline gap-3">
                      {idx > 0 && <span className="text-text-muted font-normal" aria-hidden="true">/</span>}
                      <span className="cursor-default hover:text-accent transition-colors">
                        {tool}
                      </span>
                    </span>
                  ))}
                </p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
