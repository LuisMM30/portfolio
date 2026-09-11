import { education, languages } from '../../data/education'
import SectionHeading from '../ui/SectionHeading'

export default function Education() {
  return (
    <section id="formacion" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading index="07" title="Formación" />

        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12">
          <div className="lg:col-span-8">
            <ol className="border-b border-border">
              {education.map((item) => (
                <li
                  key={item.title}
                  className="py-7 border-t border-border first:border-t-0"
                >
                  <div className="grid sm:grid-cols-[150px_1fr] gap-x-8 gap-y-3 items-baseline">
                    <p className="font-mono text-xs text-text-muted">{item.period || '—'}</p>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-text-primary">
                          {item.title}
                        </h3>
                        {item.subtitle && (
                          <span className="u-label text-accent">{item.subtitle}</span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary mt-1.5">
                        {item.center} · {item.location}
                      </p>
                      {item.description && (
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                          {item.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="lg:col-span-4">
            <h3 className="u-label text-text-muted mb-4 pb-2 border-b border-border">Idiomas</h3>
            <div className="border border-border divide-y divide-border">
              {languages.map((lang) => (
                <div
                  key={lang.language}
                  className="flex items-baseline justify-between gap-4 px-4 py-3.5"
                >
                  <span className="font-medium text-text-primary">{lang.language}</span>
                  <span className="u-label text-text-secondary">{lang.level}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
