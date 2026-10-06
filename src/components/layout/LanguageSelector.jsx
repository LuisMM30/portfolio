import { useEffect, useRef, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { useI18n } from '../../i18n/LocaleProvider'

export default function LanguageSelector({ className = '' }) {
  const { locale, locales, t, setLocale } = useI18n()
  const [open, setOpen] = useState(false)
  const containerRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined
    const closeOnOutsideClick = (event) => {
      if (!containerRef.current?.contains(event.target)) setOpen(false)
    }
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('pointerdown', closeOnOutsideClick)
    document.addEventListener('keydown', closeOnEscape)
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick)
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [open])

  return (
    <div ref={containerRef} className={`relative inline-flex ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={t('language.label')}
        aria-haspopup="menu"
        aria-expanded={open}
        className="inline-flex h-11 min-w-[42px] items-center justify-center gap-1 border border-border bg-bg-primary px-1.5 font-mono text-xs text-text-secondary transition-colors hover:border-border-strong hover:text-text-primary focus:border-accent sm:h-[46px] sm:px-3"
      >
        <span aria-hidden="true">{locale.toUpperCase()}</span>
        <ChevronDown size={13} aria-hidden="true" className={open ? 'rotate-180 transition-transform' : 'transition-transform'} />
      </button>
      {open && (
        <div
          role="menu"
          aria-label={t('language.label')}
          className="absolute right-0 top-full z-[110] mt-2 min-w-40 border border-border bg-bg-primary p-1 shadow-lg"
        >
          {locales.map((language) => (
            <button
              key={language}
              type="button"
              role="menuitemradio"
              aria-checked={language === locale}
              onClick={() => {
                setLocale(language)
                setOpen(false)
              }}
              className={`block w-full px-3 py-2 text-left text-sm transition-colors hover:bg-bg-secondary focus:bg-bg-secondary focus:outline-none ${language === locale ? 'text-accent' : 'text-text-secondary'}`}
            >
              {t(`language.${language}`)}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
