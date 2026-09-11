import { cn } from '../../utils/cn'

export default function SectionHeading({
  title,
  index,
  className,
  align = 'left',
  sticky = true,
  id,
}) {
  return (
    <div
      className={cn(
        'pt-6 border-t border-border mb-14 md:mb-20',
        sticky && 'sticky top-20 z-20 bg-bg-primary/95 backdrop-blur-sm',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-start justify-between gap-6',
          align === 'center' && 'justify-center',
        )}
      >
        <h2
          id={id}
          className={cn(
            'display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary max-w-3xl',
            align === 'center' && 'text-center',
          )}
        >
          {title}
        </h2>
        {index && (
          <p className="u-label text-accent mt-1.5 shrink-0" aria-hidden="true">
            ({index})
          </p>
        )}
      </div>
    </div>
  )
}
