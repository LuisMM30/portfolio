import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link } from 'react-router-dom'
import './index.css'
import App from './App'
import ProjectsPage from './pages/ProjectsPage'
import ContactRoute from './components/sections/ContactRoute'
import LegalPage from './components/pages/LegalPage'

function HomeOrRedirect() {
  const location = useLocation()
  if (location.pathname === '/contact' || location.pathname.startsWith('/contact/')) {
    return <ContactRoute />
  }
  return <App />
}

// /contacto aparece en navRoutes pero nunca existió como ruta: redirige a la home, sección Contacto.
function ContactoRedirect() {
  return <Navigate to="/#contacto" replace />
}

// 404: sin esta ruta catch-all, cualquier URL desconocida renderiza una página en blanco.
function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center px-5 sm:px-6 lg:px-8">
      <p className="u-label text-accent">Error 404</p>
      <h1 className="display mt-4 text-5xl text-text-primary md:text-7xl">
        Página no encontrada
      </h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
        La página que buscas no existe o se ha movido. Vuelve al inicio para seguir explorando el
        portfolio.
      </p>
      <Link
        to="/"
        className="u-label mt-10 inline-flex h-[46px] items-center border border-border px-6 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary"
      >
        Volver al inicio
      </Link>
    </main>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeOrRedirect />} />
        <Route path="/proyectos" element={<ProjectsPage />} />
        <Route path="/contacto" element={<ContactoRedirect />} />
        <Route path="/contact" element={<ContactRoute />} />
        <Route path="/contact/*" element={<ContactRoute />} />
        <Route path="/aviso-legal" element={<LegalPage type="/aviso-legal" />} />
        <Route path="/politica-privacidad" element={<LegalPage type="/politica-privacidad" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
