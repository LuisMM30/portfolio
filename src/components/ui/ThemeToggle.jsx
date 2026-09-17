import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/cn'

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex items-center justify-center h-[46px] w-[46px] border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-all duration-200 cursor-pointer',
        className,
      )}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <Sun
        size={17}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 m-auto transition-all duration-300',
          isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90',
        )}
      />
      <Moon
        size={17}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 m-auto transition-all duration-300',
          isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0',
        )}
      />
    </button>
  )
}
