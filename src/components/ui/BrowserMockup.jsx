export default function BrowserMockup({ src, alt, url, imgRef }) {
  return (
    <figure className="border border-border bg-bg-secondary">
      {/* Chrome bar */}
      <div className="flex items-center gap-3 border-b border-border bg-bg-secondary px-3.5 py-2.5">
        <div className="flex shrink-0 gap-1.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-online/70" />
          <span className="h-2 w-2 rounded-full bg-private/70" />
          <span className="h-2 w-2 rounded-full bg-border-strong" />
        </div>
        <div className="flex min-w-0 flex-1 items-center gap-1.5 border border-border bg-bg-primary/80 px-2 py-1.5">
          <svg
            className="h-2.5 w-2.5 shrink-0 text-text-muted"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="u-label truncate text-text-muted normal-case tracking-normal">
            {url || alt}
          </span>
        </div>
      </div>

      {/* Screen */}
      <div className="aspect-[16/10] overflow-hidden bg-bg-primary">
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 will-change-transform group-hover:scale-[1.02]"
        />
      </div>
    </figure>
  )
}
