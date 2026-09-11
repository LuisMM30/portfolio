import { useEffect, useState } from 'react'

const query = (q) => window.matchMedia(q).matches

function read() {
  if (typeof window === 'undefined') return { reducedMotion: false, finePointer: false }
  return {
    reducedMotion: query('(prefers-reduced-motion: reduce)'),
    finePointer: query('(pointer: fine)'),
  }
}

export function useEnvironment() {
  const [env, setEnv] = useState(read)

  useEffect(() => {
    const mqls = ['(prefers-reduced-motion: reduce)', '(pointer: fine)'].map((q) =>
      window.matchMedia(q),
    )
    const update = () => setEnv(read())
    mqls.forEach((m) => m.addEventListener('change', update))
    return () => mqls.forEach((m) => m.removeEventListener('change', update))
  }, [])

  // Parallax + cursor only for fine pointers without reduced motion.
  return {
    ...env,
    motionEnabled: env.finePointer && !env.reducedMotion,
  }
}
