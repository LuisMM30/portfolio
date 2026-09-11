import { cn } from '../../utils/cn'

const variants = {
  default: 'text-text-secondary border border-border',
  accent: 'text-accent border border-accent/40',
  online: 'text-online border border-online/40',
  private: 'text-private border border-private/40',
}

const markers = {
  default: '▪',
  accent: '▪',
  online: '●',
  private: '◐',
}

export default function Badge({ children, variant = 'default', className }) {
  return (
    <span
      className={cn(
        'u-label inline-flex items-center gap-2 px-2 py-1.5 leading-none rounded-none',
        variants[variant],
        className,
      )}
    >
      <span aria-hidden="true" className="text-[0.7em]">
        {markers[variant]}
      </span>
      {children}
    </span>
  )
}
