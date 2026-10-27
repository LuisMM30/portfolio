import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { cn } from '../../utils/cn'
import { useI18n } from '../../i18n/LocaleProvider'

// Easing and duration shared by the icons and the button background.
const EASE = 'ease-[cubic-bezier(0.22,1,0.36,1)] duration-[550ms]'

export default function ThemeToggle({ className }) {
  const { theme, toggleTheme } = useTheme()
  const { t } = useI18n()
  const isDark = theme === 'dark'
  const label = isDark ? t('ui.themeLight') : t('ui.themeDark')

  return (
    <button
      type="button"
      onClick={toggleTheme}
      data-state={isDark ? 'dark' : 'light'}
      className={cn(
        'relative inline-flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden border border-border transition-[background-color,border-color] hover:border-border-strong sm:h-[46px] sm:w-[46px] motion-reduce:transition-none',
        EASE,
        'bg-transparent text-text-secondary hover:text-text-primary',
        className,
      )}
      aria-label={label}
      title={label}
    >
      <Sun
        size={17}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 m-auto transition-[translate,scale,opacity] motion-reduce:transition-none',
          EASE,
          isDark ? 'translate-y-full opacity-0' : 'translate-y-0 opacity-100',
        )}
      />
      <Moon
        size={17}
        aria-hidden="true"
        className={cn(
          'absolute inset-0 m-auto transition-[translate,scale,opacity] motion-reduce:transition-none',
          EASE,
          isDark ? 'translate-y-0 scale-100 opacity-100' : 'translate-y-full scale-0 opacity-0',
        )}
      />
    </button>
  )
}
