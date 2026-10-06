import es from './locales/es.json'
import en from './locales/en.json'
import de from './locales/de.json'
import gl from './locales/gl.json'
import pt from './locales/pt.json'
import ca from './locales/ca.json'
import fr from './locales/fr.json'

export const locales = ['es', 'en', 'de', 'gl', 'pt', 'ca', 'fr']
export const localeNames = {
  es: 'Español', en: 'English', de: 'Deutsch', gl: 'Galego', pt: 'Português', ca: 'Català', fr: 'Français',
}
export const dictionaries = { es, en, de, gl, pt, ca, fr }

export function getBrowserLocale() {
  if (typeof navigator === 'undefined') return 'es'
  for (const language of navigator.languages ?? [navigator.language]) {
    const locale = language?.toLowerCase().split('-')[0]
    if (locales.includes(locale)) return locale
  }
  return 'es'
}

export function localeFromPath(pathname) {
  const firstSegment = pathname.split('/').filter(Boolean)[0]
  return locales.includes(firstSegment) ? firstSegment : 'es'
}

export function stripLocalePrefix(pathname) {
  const parts = pathname.split('/').filter(Boolean)
  if (locales.includes(parts[0])) parts.shift()
  return `/${parts.join('/')}`
}

export function localizePath(pathname, locale) {
  const path = stripLocalePrefix(pathname)
  return locale === 'es' ? (path === '/' ? '/' : path) : `/${locale}${path === '/' ? '' : path}`
}

export function translate(locale, key, values = {}) {
  const get = (object, path) => path.split('.').reduce((value, part) => value?.[part], object)
  const template = get(dictionaries[locale], key) ?? get(es, key) ?? key
  if (typeof template !== 'string') return template
  return template.replace(/\{\{(\w+)\}\}/g, (_, name) => values[name] ?? `{{${name}}}`)
}
