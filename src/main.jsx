import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation, Navigate, Link, Outlet, useParams } from 'react-router-dom'
import './index.css'
import App from './App'
import ProjectsPage from './pages/ProjectsPage'
import ContactRoute from './components/sections/ContactRoute'
import LegalPage from './components/pages/LegalPage'
import { LocaleProvider, useI18n } from './i18n/LocaleProvider'
import { locales } from './i18n'

function HomeOrRedirect() {
  const location = useLocation()
  if (location.pathname.endsWith('/contact') || location.pathname.includes('/contact/')) return <ContactRoute />
  return <App />
}

function ContactoRedirect() {
  return <Navigate to="/#contacto" replace />
}

function NotFound() {
  const { t, locale } = useI18n()
  return (
    <main className="mx-auto flex min-h-screen max-w-7xl flex-col items-start justify-center px-5 sm:px-6 lg:px-8">
      <p className="u-label text-accent">{t('common.error404')}</p>
      <h1 className="display mt-4 text-5xl text-text-primary md:text-7xl">{t('common.notFoundTitle')}</h1>
      <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">{t('common.notFoundBody')}</p>
      <Link to={locale === 'es' ? '/' : `/${locale}`} className="u-label mt-10 inline-flex h-[46px] items-center border border-border px-6 text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary">
        {t('common.backHome')}
      </Link>
    </main>
  )
}

function LocaleLayout() {
  const { locale } = useParams()
  if (!locales.includes(locale)) return <NotFound />
  return <LocaleProvider><Outlet /></LocaleProvider>
}

function RoutesContent() {
  return (
    <Routes>
      <Route element={<LocaleProvider />}>
        <Route index element={<HomeOrRedirect />} />
        <Route path="proyectos" element={<ProjectsPage />} />
        <Route path="contacto" element={<ContactoRedirect />} />
        <Route path="contact/*" element={<ContactRoute />} />
        <Route path="aviso-legal" element={<LegalPage type="/aviso-legal" />} />
        <Route path="politica-privacidad" element={<LegalPage type="/politica-privacidad" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="/:locale" element={<LocaleLayout />}>
        <Route index element={<HomeOrRedirect />} />
        <Route path="proyectos" element={<ProjectsPage />} />
        <Route path="contacto" element={<ContactoRedirect />} />
        <Route path="contact/*" element={<ContactRoute />} />
        <Route path="aviso-legal" element={<LegalPage type="/aviso-legal" />} />
        <Route path="politica-privacidad" element={<LegalPage type="/politica-privacidad" />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route path="*" element={<LocaleProvider><NotFound /></LocaleProvider>} />
    </Routes>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter><RoutesContent /></BrowserRouter>
  </StrictMode>,
)
