import { Terminal as TerminalIcon } from 'lucide-react'

export default function HeroInfoVariants({ rows }) {
  return (
    <div className="hero-variants" role="group" aria-label="Información profesional">
      <div className="hero-variant-terminal terminal-box border border-border bg-bg-primary p-3 font-mono text-[1.05rem] leading-tight">
        <div className="terminal-bar mb-2 flex items-center justify-between border-b border-border pb-2 text-text-muted">
          <span className="flex items-center gap-2">
            <TerminalIcon size={18} className="text-accent" aria-hidden="true" />
            <span>profile.config</span>
          </span>
          <span className="text-accent">●</span>
        </div>
        {rows.map((row) => (
          <div key={row.label} className="grid grid-cols-[7.7rem_1fr] gap-4 py-1">
            <span className="text-text-muted">{row.label.toLowerCase()}:</span>
            <span className={row.live ? 'text-online' : 'text-text-primary'}>
              {row.value}
            </span>
          </div>
        ))}
        <div className="mt-2 border-t border-border pt-2 text-accent">$ status --available</div>
      </div>
    </div>
  )
}
