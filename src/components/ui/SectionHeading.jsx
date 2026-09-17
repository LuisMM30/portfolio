import { cn } from '../../utils/cn'

export default function SectionHeading({
  title,
  index,
  className,
  align = 'left',
  sticky = true,
  singleLine = false,
  subtitle,
  as: HeadingTag = 'h2',
  id,
}) {
  return (
    <div
      className={cn(
        'pt-3 border-t border-border mb-14 md:mb-20',
        sticky && 'sticky top-16 md:top-20 z-20 bg-bg-primary/95 backdrop-blur-sm',
        className,
      )}
    >
      <div
        className={cn(
          'flex items-start justify-between gap-6',
          align === 'center' && 'justify-center',
        )}
      >
        <HeadingTag
          id={id}
          className={cn(
            'display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-text-primary max-w-3xl',
            align === 'center' && 'text-center',
            singleLine && 'text-2xl sm:text-3xl md:text-4xl lg:whitespace-nowrap lg:text-[2.6rem] xl:text-[3.1rem]',
          )}
        >
          {title}
        </HeadingTag>
        {index && (
          <p className="u-label text-accent mt-1.5 shrink-0" aria-hidden="true">
            ({index})
          </p>
        )}
      </div>
      {subtitle && (
        <p className="u-label mt-3 max-w-3xl text-text-muted">{subtitle}</p>
      )}
    </div>
  )
}
