import { createContext, useCallback, useContext, useEffect, useMemo } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { dictionaries, getBrowserLocale, localeFromPath, localizePath, locales, translate } from './index'

const LocaleContext = createContext(null)
const ORIGIN = 'https://luismontesdeoca.vercel.app'

export function LocaleProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const locale = localeFromPath(location.pathname)
  const t = useCallback((key, values) => translate(locale, key, values), [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    document.title = t('meta.title')
    let description = document.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.name = 'description'
      document.head.appendChild(description)
    }
    description.content = t('meta.description')

    const upsert = (rel, hrefLang, href) => {
      let link = document.head.querySelector(`link[rel="${rel}"][hreflang="${hrefLang}"]`)
      if (!link) {
        link = document.createElement('link')
        link.rel = rel
        if (hrefLang) link.hreflang = hrefLang
        document.head.appendChild(link)
      }
      link.href = href
    }
    locales.forEach((language) => {
      upsert('alternate', language, `${ORIGIN}${localizePath(location.pathname, language)}`)
    })
    upsert('alternate', 'x-default', `${ORIGIN}${localizePath(location.pathname, 'es')}`)
    upsert('canonical', '', `${ORIGIN}${location.pathname}`)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = t('meta.title')
    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.content = t('meta.description')
    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.content = t('meta.title')
    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) twitterDescription.content = t('meta.description')
  }, [locale, location.pathname, t])

  useEffect(() => {
    if (location.pathname !== '/') return
    let stored
    try { stored = localStorage.getItem('lm-locale') } catch { /* optional */ }
    if (stored && locales.includes(stored)) {
      if (stored !== 'es') navigate(localizePath(location.pathname, stored), { replace: true })
      return
    }
    const preferred = getBrowserLocale()
    if (preferred !== 'es') navigate(localizePath(location.pathname, preferred), { replace: true })
  }, [location.pathname, navigate])

  useEffect(() => {
    if (locale === 'es' && location.pathname === '/') {
      try { if (!localStorage.getItem('lm-locale')) return } catch { /* optional */ }
    }
    try { localStorage.setItem('lm-locale', locale) } catch { /* Storage can be unavailable. */ }
  }, [locale, location.pathname])

  const value = useMemo(() => ({
    locale,
    locales,
    t,
    setLocale: (nextLocale) => {
      if (!locales.includes(nextLocale)) return
      try { localStorage.setItem('lm-locale', nextLocale) } catch { /* optional */ }
      navigate(`${localizePath(location.pathname, nextLocale)}${location.search}${location.hash}`)
    },
    dictionaries,
  }), [locale, location.pathname, location.search, location.hash, navigate, t])

  return <LocaleContext.Provider value={value}>{children ?? <Outlet />}</LocaleContext.Provider>
}

export function useI18n() {
  const context = useContext(LocaleContext)
  if (!context) return { locale: 'es', locales, t: (key, values) => translate('es', key, values), setLocale: () => {} }
  return context
}
