import { useEffect, useRef, useState } from 'react'

const LABELS = {
  view: 'VIEW',
  explore: 'EXPLORE',
  download: 'DOWNLOAD',
  talk: "LET'S TALK",
}

export default function ContextualCursor() {
  const elRef = useRef(null)
  const [label, setLabel] = useState(null)
  const [enabled] = useState(() => {
    if (typeof window === 'undefined') return false
    return (
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    )
  })

  useEffect(() => {
    if (!enabled) return undefined

    let raf = 0
    let target = { x: 0, y: 0 }
    let pos = { x: 0, y: 0 }

    const move = (e) => {
      target = { x: e.clientX, y: e.clientY }
      if (!raf) {
        raf = requestAnimationFrame(tick)
      }
    }

    const tick = () => {
      pos.x += (target.x - pos.x) * 0.2
      pos.y += (target.y - pos.y) * 0.2
      if (elRef.current) {
        elRef.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`
      }
      raf = requestAnimationFrame(tick)
    }

    const over = (e) => {
      const zone = e.target.closest?.('[data-cursor]')
      setLabel(zone ? LABELS[zone.dataset.cursor] ?? null : null)
    }

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div
      ref={elRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] hidden lg:block"
    >
      <span
        className={
          label
            ? 'u-label inline-flex items-center justify-center border border-accent bg-accent px-3 py-2 text-accent-ink transition-[opacity,scale] duration-150'
            : 'block h-1.5 w-1.5 rounded-full bg-accent opacity-70 transition-[opacity,scale] duration-150'
        }
        style={{ opacity: 1 }}
      >
        {label}
      </span>
    </div>
  )
}
