import { site } from '../../data/site'
import { aptitudes } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'
import { useI18n } from '../../i18n/LocaleProvider'

export default function About() {
  const { t } = useI18n()
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          title={t('sections.about')}
          id="sobre-mi"
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky label column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-56">
              <p className="u-label text-text-muted">{t('sections.aboutMe')}</p>
              <p className="display mt-6 text-2xl text-text-primary md:text-3xl">
                {site.name}
              </p>
              <p className="u-label mt-3 text-text-muted">
                {t('hero.role')} — {site.location}
              </p>
              <div className="mt-10 hidden border-t border-border pt-6 lg:block">
                <p className="u-label text-text-muted">{t('common.status')}</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-online">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-online opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-online" />
                  </span>
                  {t('hero.available')}
                </p>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-8">
            <div className="max-w-2xl space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>
                {t('copy.about.paragraph1')}
              </p>
              <p>
                {t('copy.about.paragraph2')}
              </p>
              <p>
                {t('copy.about.paragraph3')}
              </p>
              <p>
                {t('copy.about.paragraph4')}
              </p>
              <p>
                {t('copy.about.paragraph5')}
              </p>
              <p>
                {t('copy.about.paragraph6')}
              </p>
            </div>

            <div className="mt-4 md:mt-6">
              <div className="terminal-box border border-border bg-bg-primary p-5 font-mono text-xs md:p-6">
                <div className="mb-5 flex items-center justify-between border-b border-border pb-3 text-text-muted">
                  <span className="flex items-center gap-2">
                    <span className="text-accent">›_</span>
                    <span>{t('copy.about.skillsCommand')}</span>
                  </span>
                  <span className="text-accent">●</span>
                </div>
                <ol className="space-y-2.5 text-sm leading-relaxed">
                  {aptitudes.map((aptitude, i) => (
                    <li key={aptitude} className="flex items-start gap-3">
                      <span className="shrink-0 text-accent">[{String(i + 1).padStart(2, '0')}]</span>
                      <span className="text-text-primary">{t(`data.aptitudes.${i}`)}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 border-t border-border pt-4 text-accent">
                  {t('copy.about.readyCommand')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
