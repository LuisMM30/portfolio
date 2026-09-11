import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import App from './App'
import ContactRoute from './components/sections/ContactRoute'
import LegalPage from './components/pages/LegalPage'

function RedirectActiveApp() {
  const location = useLocation()
  if (location.pathname === '/contact' || location.pathname.startsWith('/contact/')) {
    return <ContactRoute />
  }
  return <App />
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RedirectActiveApp />} />
        <Route path="/contact" element={<ContactRoute />} />
        <Route path="/contact/*" element={<ContactRoute />} />
        <Route path="/aviso-legal" element={<LegalPage type="/aviso-legal" />} />
        <Route path="/politica-privacidad" element={<LegalPage type="/politica-privacidad" />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
