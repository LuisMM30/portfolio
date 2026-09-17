import { cn } from '../../utils/cn'

const variants = {
  primary: 'bg-accent text-accent-ink hover:bg-accent-hover hover:-translate-y-0.5',
  secondary:
    'border border-border-strong text-text-primary hover:border-text-primary hover:bg-bg-secondary',
  ghost: 'text-text-secondary hover:text-text-primary',
}

const sizes = {
  sm: 'px-3.5 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-7 py-3.5 text-base',
  // Tamaño compacto compartido por los botones de Contacto (~30% más pequeño que lg)
  contact: 'min-h-0 px-4 py-2 text-sm',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className,
  href,
  external,
  download,
  type = 'button',
  ...props
}) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-medium transition-all duration-300 min-h-[44px] cursor-pointer select-none whitespace-nowrap rounded-none',
    variants[variant],
    sizes[size],
    className,
  )

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
        {...(download ? { download } : {})}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}
