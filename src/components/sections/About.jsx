import { site } from '../../data/site'
import { aptitudes } from '../../data/skills'
import SectionHeading from '../ui/SectionHeading'

export default function About() {
  return (
    <section className="py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="06"
          title="Construyo productos web para necesidades reales."
          id="sobre-mi"
        />

        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Sticky label column */}
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-56">
              <p className="u-label text-text-muted">Sobre mí</p>
              <p className="display mt-6 text-2xl text-text-primary md:text-3xl">
                {site.name}
              </p>
              <p className="u-label mt-3 text-text-muted">
                {site.role} — {site.location}
              </p>
              <div className="mt-10 hidden border-t border-border pt-6 lg:block">
                <p className="u-label text-text-muted">Estado</p>
                <p className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-online">
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-online opacity-50" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-online" />
                  </span>
                  {site.status}
                </p>
              </div>
            </div>
          </div>

          {/* Narrative */}
          <div className="lg:col-span-8">
            <div className="max-w-2xl space-y-6 text-lg text-text-secondary leading-relaxed">
              <p>
                Soy desarrollador Full Stack Junior y me gusta aprender construyendo. Durante estos
                últimos años he trabajado en proyectos reales relacionados con páginas web, comercio
                electrónico y aplicaciones desarrolladas desde cero.
              </p>
              <p>
                He trabajado con tecnologías como HTML, CSS, JavaScript, React, PHP, MongoDB y
                MySQL, además de herramientas y plataformas como WordPress, PrestaShop y
                WooCommerce.
              </p>
              <p>
                Mi experiencia me ha permitido conocer distintas partes del desarrollo: desde crear
                interfaces y funcionalidades hasta trabajar con datos, bases de datos y comunicación
                entre diferentes partes de una aplicación.
              </p>
              <p>
                No pretendo saberlo todo. Me gusta enfrentarme a problemas que todavía no sé
                resolver, investigar, probar diferentes opciones y aprender durante el proceso. La
                inteligencia artificial forma parte de mi forma de trabajar, utilizándola como apoyo
                para aprender, investigar y desarrollar de forma más eficiente, siempre revisando y
                entendiendo lo que hago.
              </p>
              <p>
                Busco seguir creciendo como desarrollador, especialmente en Full Stack, React,
                backend, APIs, bases de datos y desarrollo de aplicaciones, mientras participo en
                proyectos reales y asumo cada vez más responsabilidades.
              </p>
              <p>
                Creo que puedo aportar sobre todo curiosidad, capacidad de aprendizaje, implicación
                y ganas de hacer las cosas bien.
              </p>
            </div>

            <div className="mt-4 md:mt-6">
              <div className="terminal-box border border-border bg-bg-primary p-5 font-mono text-xs md:p-6">
                <div className="mb-5 flex items-center justify-between border-b border-border pb-3 text-text-muted">
                  <span className="flex items-center gap-2">
                    <span className="text-accent">›_</span>
                    <span>./skills --list</span>
                  </span>
                  <span className="text-accent">●</span>
                </div>
                <ol className="space-y-2.5 text-sm leading-relaxed">
                  {aptitudes.map((aptitude, i) => (
                    <li key={aptitude} className="flex items-start gap-3">
                      <span className="shrink-0 text-accent">[{String(i + 1).padStart(2, '0')}]</span>
                      <span className="text-text-primary">{aptitude}</span>
                    </li>
                  ))}
                </ol>
                <div className="mt-5 border-t border-border pt-4 text-accent">
                  $ ready_to_build
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
