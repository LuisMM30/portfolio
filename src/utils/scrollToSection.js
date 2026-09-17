// Igual a la altura del header (md:h-20 = 80px): el título de la sección
// queda justo debajo del header al aterrizar.
const DEFAULT_OFFSET = 80

/**
 * Scrolls to the start of the section containing `id`, using the section
 * wrapper as target (it never moves, unlike its sticky heading). Supports a
 * delay for cases where a lock on body scroll has to be released first
 * (overlay menu).
 */
export function scrollToSection(id, { delay = 0 } = {}) {
  const el = document.getElementById(id)
  if (!el) return
  const target = el.closest('section') ?? el

  const go = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const top = target.getBoundingClientRect().top + window.scrollY - DEFAULT_OFFSET
    window.scrollTo({ top: Math.max(top, 0), behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  if (delay > 0) {
    window.setTimeout(go, delay)
  } else {
    go()
  }
}
