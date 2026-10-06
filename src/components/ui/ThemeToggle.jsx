import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/cn'
import { useI18n } from '../../i18n/LocaleProvider'

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={cn(
        'relative inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border text-text-secondary transition-all duration-200 hover:border-border-strong hover:text-text-primary sm:h-[46px] sm:w-[46px]',
        className,
      )}
      aria-label={isDark ? t('ui.themeLight') : t('ui.themeDark')}
      title={isDark ? t('ui.themeLight') : t('ui.themeDark')}
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
