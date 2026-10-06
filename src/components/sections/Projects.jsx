import { useState } from 'react'
import { projects } from '../../data/projects'
import SectionHeading from '../ui/SectionHeading'
import ProjectShowcase from '../projects/ProjectShowcase'
import ProjectModal from '../projects/ProjectModal'
import { useI18n } from '../../i18n/LocaleProvider'
import { localizeProject } from '../../i18n/projectTranslations'

export default function Projects() {
  const [modalProject, setModalProject] = useState(null)
  const { locale, t } = useI18n()

  return (
    <section className="py-24 md:py-36">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          title={t('sections.projects')}
          subtitle={t('sections.projectsSubtitle')}
          sticky={false}
          id="proyectos"
        />

        <div className="space-y-20 md:space-y-28">
          {projects.map((sourceProject, index) => {
            const project = localizeProject(sourceProject, locale)
            return (
              <ProjectShowcase
                key={project.slug}
                project={project}
                index={index}
                onOpenModal={setModalProject}
              />
            )
          })}
        </div>
      </div>

      <ProjectModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
      />
    </section>
  )
}
