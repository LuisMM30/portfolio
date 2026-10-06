import { useEffect, useState } from 'react'
import { projects } from '../data/projects'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import ProjectShowcase from '../components/projects/ProjectShowcase'
import ProjectModal from '../components/projects/ProjectModal'
import { useI18n } from '../i18n/LocaleProvider'
import { localizeProject } from '../i18n/projectTranslations'

export default function ProjectsPage() {
  const [modalProject, setModalProject] = useState(null)
  const { locale, t } = useI18n()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <section className="pb-24 pt-24 md:pb-32 md:pt-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              title={t('sections.projects')}
              subtitle={t('sections.projectsSubtitle')}
              as="h1"
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
              )})}
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <ProjectModal
        project={modalProject}
        isOpen={!!modalProject}
        onClose={() => setModalProject(null)}
      />
    </>
  )
}
