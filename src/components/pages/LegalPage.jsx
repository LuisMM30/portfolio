import { Link, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import Footer from '../layout/Footer'

const legalContent = {
  '/aviso-legal': {
    title: 'Aviso legal',
    intro: 'Información general del sitio web y de su responsable.',
    sections: [
      ['Titular del sitio', 'Este sitio web pertenece a Luis Montes de Oca.'],
      ['Datos de contacto', 'Email: luismonteswebs@gmail.com · Madrid, España. Para cualquier consulta relacionada con este sitio, puedes escribir a la dirección indicada.'],
      ['Objeto', 'Este sitio tiene como finalidad presentar la actividad profesional, los proyectos y los servicios de desarrollo web de su titular.'],
      ['Propiedad intelectual', 'Los textos, diseños, código, imágenes y demás contenidos de este sitio están protegidos por la normativa aplicable. No se permite su reproducción o reutilización sin autorización previa, salvo los usos permitidos legalmente.'],
      ['Responsabilidad', 'El titular procura que la información publicada sea correcta y esté actualizada, pero no garantiza la ausencia de errores o la disponibilidad permanente del sitio.'],
    ],
  },
  '/politica-privacidad': {
    title: 'Política de privacidad',
    intro: 'Cómo se tratan los datos personales cuando contactas con este sitio.',
    sections: [
      ['Responsable', 'El responsable del tratamiento es Luis Montes de Oca. Puedes contactar en luismonteswebs@gmail.com.'],
      ['Datos tratados', 'Si utilizas el formulario de contacto, se pueden tratar tu nombre, dirección de email, motivo y el contenido del mensaje.'],
      ['Finalidad y base legal', 'Los datos se utilizan exclusivamente para responder a las consultas y gestionar una posible relación profesional. La base legal es tu consentimiento al enviar el formulario o escribir voluntariamente al email de contacto.'],
      ['Conservación', 'Los datos se conservarán durante el tiempo necesario para responder a la consulta y, posteriormente, durante los plazos exigidos por obligaciones legales o mientras puedan derivarse responsabilidades.'],
      ['Destinatarios y derechos', 'No se venderán tus datos ni se cederán a terceros salvo obligación legal o proveedores necesarios para prestar el servicio. Puedes solicitar acceso, rectificación, supresión, oposición, limitación o portabilidad escribiendo a luismonteswebs@gmail.com. También puedes reclamar ante la Agencia Española de Protección de Datos.'],
      ['Seguridad', 'Se aplican medidas razonables para proteger la información, aunque ningún sistema conectado a Internet puede garantizar una seguridad absoluta.'],
    ],
  },
}

export default function LegalPage({ type }) {
  const location = useLocation()
  const content = legalContent[type] ?? legalContent['/aviso-legal']

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <>
      <main className="min-h-screen pt-14 pb-12">
        <div className="mx-auto max-w-4xl px-5 sm:px-6 lg:px-8">
          <Link to="/" className="u-label inline-flex items-center gap-2 text-text-muted transition-colors hover:text-accent">
            <ArrowLeft size={14} aria-hidden="true" /> Volver al portfolio
          </Link>
          <header className="mt-7 border-t border-border pt-4 md:mt-10">
            <p className="u-label text-accent">Información legal</p>
            <h1 className="display mt-4 max-w-3xl text-5xl text-text-primary md:text-7xl">{content.title}</h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-text-secondary">{content.intro}</p>
          </header>
          <div className="mt-8 divide-y divide-border border-y border-border">
            {content.sections.map(([heading, text]) => (
              <section key={heading} className="grid gap-4 py-7 md:grid-cols-[220px_1fr] md:gap-10">
                <h2 className="u-label text-text-muted">{heading}</h2>
                <p className="max-w-2xl text-sm leading-relaxed text-text-secondary">{text}</p>
              </section>
            ))}
          </div>
          <p className="mt-4 text-xs text-text-muted">Última actualización: septiembre de 2026.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
