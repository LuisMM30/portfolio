import { education, languages } from '../../data/education'
import SectionHeading from '../ui/SectionHeading'
import { useI18n } from '../../i18n/LocaleProvider'

export default function Education() {
  const { t } = useI18n()
  return (
    <section id="formacion" className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading index="07" title={t('sections.education')} />

        <div className="grid lg:grid-cols-12 gap-x-12 gap-y-12">
          <div className="lg:col-span-8">
            <ol className="border-b border-border">
              {education.map((item, index) => {
                const translated = t(`data.education.${index}`)
                return (
                <li
                  key={item.title}
                  className="py-7 border-t border-border first:border-t-0"
                >
                  <div className="grid sm:grid-cols-[150px_1fr] gap-x-8 gap-y-3 items-baseline">
                    <p className="font-mono text-xs text-text-muted">{t(`data.educationPeriods.${index}`) || item.period || '—'}</p>
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                        <h3 className="text-lg md:text-xl font-semibold tracking-tight text-text-primary">
                          {translated.title}
                        </h3>
                        {translated.subtitle && (
                          <span className="u-label text-accent">{translated.subtitle}</span>
                        )}
                      </div>
                      <p className="text-sm text-text-secondary mt-1.5">
                        {item.center} · {item.location}
                      </p>
                      {translated.description && (
                        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                          {translated.description}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              )})}
            </ol>
          </div>

          <div className="lg:col-span-4">
            <h3 className="u-label text-text-muted mb-4 pb-2 border-b border-border">{t('ui.languages')}</h3>
            <div className="border border-border divide-y divide-border">
              {languages.map((lang, index) => (
                <div
                  key={lang.language}
                  className="flex items-baseline justify-between gap-4 px-4 py-3.5"
                >
                  <span className="font-medium text-text-primary">{t(`data.languageLevels.${index}.language`)}</span>
                  <span className="u-label text-text-secondary">{t(`data.languageLevels.${index}.level`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
