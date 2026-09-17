import { useEffect, useState } from 'react'
import { projects } from '../data/projects'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SectionHeading from '../components/ui/SectionHeading'
import ProjectShowcase from '../components/projects/ProjectShowcase'
import ProjectModal from '../components/projects/ProjectModal'

export default function ProjectsPage() {
  const [modalProject, setModalProject] = useState(null)

  useEffect(() => {
    document.title = 'Proyectos | Luis Montes de Oca'
    window.scrollTo({ top: 0, behavior: 'auto' })
    return () => {
      document.title = 'Luis Montes de Oca | Desarrollador Web'
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <section className="pb-24 pt-24 md:pb-32 md:pt-36">
          <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
            <SectionHeading
              title="Proyectos seleccionados"
              subtitle="Una selección de proyectos en los que he trabajado, desde comercio electrónico hasta herramientas web para empresas."
              as="h1"
              sticky={false}
              id="proyectos"
            />

            <div className="space-y-20 md:space-y-28">
              {projects.map((project, index) => (
                <ProjectShowcase
                  key={project.slug}
                  project={project}
                  index={index}
                  onOpenModal={setModalProject}
                />
              ))}
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
