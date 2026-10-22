import { useCallback, useEffect, useState } from 'react'

// Siempre arranca en claro; el cambio manual dura solo mientras la página está abierta.
export function useTheme() {
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
  }, [theme])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
  }, [])

  return { theme, toggleTheme }
}
