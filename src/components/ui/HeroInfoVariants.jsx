import { Terminal as TerminalIcon } from 'lucide-react'

export default function HeroInfoVariants({ rows }) {
  return (
    <div className="hero-variants" role="group" aria-label="Información profesional">
      <div className="hero-variant-terminal terminal-box w-full border border-border bg-bg-primary p-3 font-mono text-[0.98rem] leading-tight">
        <div className="terminal-bar mb-2 flex items-center justify-between border-b border-border pb-2 text-text-muted">
          <span className="flex items-center gap-2">
            <TerminalIcon size={18} className="text-accent" aria-hidden="true" />
            <span>profile.config</span>
          </span>
          <span className="text-accent">●</span>
        </div>

        {/* Mobile: info first, photo below; sm+: photo beside the rows */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-stretch">
          <div className="min-w-0 flex-1">
            {rows.map((row) => (
              <div key={row.label} className="grid grid-cols-[6.2rem_1fr] gap-4 py-1">
                <span className="text-text-muted">{row.label.toLowerCase()}:</span>
                <span className={row.live ? 'text-online' : 'text-text-primary'} style={{ whiteSpace: 'pre-line' }}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>

          {/* Mobile: portrait crop (height > width, centered); sm+: narrow strip stretched to the rows' height */}
          <picture className="shrink-0 self-center sm:self-start">
            {/* Desktop: narrow strip -> full head-and-shoulders crop for detail */}
            <source media="(min-width: 640px)" srcSet="/images/luis-portrait-desktop.jpg" />
            <img
              src="/images/luis-portrait.jpg"
              alt="Foto de Luis Montes de Oca"
              loading="lazy"
              className="mx-auto block aspect-[3/4] h-72 w-auto max-w-full rounded-sm border border-border object-contain object-center sm:mx-0 sm:aspect-auto sm:h-[102px] sm:w-20 md:h-[122px] md:w-24 lg:h-[184px] lg:w-36"
            />
          </picture>
        </div>

        <div className="mt-2 border-t border-border pt-2 text-accent">$ status --available</div>
      </div>
    </div>
  )
}
