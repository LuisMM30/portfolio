import { useEffect } from 'react'

let listeners = new Set()
let raf = 0
let next = { x: 0, y: 0 }

function onMove(e) {
  next = {
    x: (e.clientX / window.innerWidth) * 2 - 1,
    y: (e.clientY / window.innerHeight) * 2 - 1,
  }
  if (!raf) {
    raf = requestAnimationFrame(() => {
      raf = 0
      listeners.forEach((fn) => fn(next))
    })
  }
}

let attached = false
function ensureAttached() {
  if (attached || typeof window === 'undefined') return
  attached = true
  window.addEventListener('pointermove', onMove, { passive: true })
}

export function subscribePointer(fn) {
  ensureAttached()
  listeners.add(fn)
  fn(next)
  return () => {
    listeners.delete(fn)
  }
}

export function usePointerParallax(ref, { depth = 0.05 } = {}) {
  useEffect(() => {
    if (!ref.current) return undefined
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined
    if (!window.matchMedia('(pointer: fine)').matches) return undefined

    return subscribePointer(({ x, y }) => {
      ref.current.style.transform = `translate3d(${(-x * depth * 100).toFixed(2)}px, ${(
        -y *
        depth *
        100
      ).toFixed(2)}px, 0)`
    })
  }, [ref, depth])
}
