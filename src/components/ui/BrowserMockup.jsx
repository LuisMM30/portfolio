export default function BrowserMockup({ src, alt, url, imgRef, variant = 'desktop', action }) {
  const isPhone = variant === 'phone'

  // Hardware (bezel, shell, stand) uses fixed dark tones — same for both
  // variants and both site themes, so desktop and mobile read as one family.
  // Shadows adapt to the site theme via --device-shadow-color (dark in dark
  // mode, soft gray in light mode) so devices never melt into the background.
  if (isPhone) {
    return (
      <figure className="relative mx-auto w-full max-w-[240px]">
        <div className="relative rounded-[2.2rem] border border-white/10 bg-[#0d0f0c] p-[7px] shadow-[var(--device-shadow)]">
          {/* Side buttons: solid light gray — visible on any background */}
          <div
            className="absolute -left-[4px] top-24 h-10 w-[4px] rounded-l-md bg-[#6b716b] shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
            aria-hidden="true"
          />
          <div
            className="absolute -left-[4px] top-36 h-7 w-[4px] rounded-l-md bg-[#6b716b] shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
            aria-hidden="true"
          />
          <div
            className="absolute -right-[4px] top-28 h-16 w-[4px] rounded-r-md bg-[#6b716b] shadow-[0_0_0_1px_rgba(0,0,0,0.35)]"
            aria-hidden="true"
          />

          {/* Screen: transparent — only the screenshot and its overlays */}
          <div className="relative overflow-hidden rounded-[1.75rem]">
            <div
              className="absolute left-1/2 top-2 z-10 h-[6px] w-16 -translate-x-1/2 rounded-full bg-black/80"
              aria-hidden="true"
            />
            <div
              className="flex items-center justify-between border-b border-white/10 bg-white/[0.04] px-4 pb-1.5 pt-2.5"
              aria-hidden="true"
            >
              <span className="font-mono text-[10px] leading-none text-white/90">9:41</span>
              <span className="flex items-center gap-1.5">
                <svg
                  className="h-2.5 w-2.5 text-white/80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M2 20h3v-7H2v7zm5 0h3V9H7v11zm5 0h3V5h-3v15zm5 0h3V2h-3v18z" />
                </svg>
                <svg
                  className="h-2.5 w-2.5 text-white/80"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 21 2 9c2.5-2.7 6-4 10-4s7.5 1.3 10 4L12 21z" />
                </svg>
                <span className="relative inline-block h-[10px] w-5 rounded-[3px] border border-white/70">
                  <span className="absolute inset-[1.5px] right-[30%] rounded-[1px] bg-white/90" />
                </span>
              </span>
            </div>
            <img
              ref={imgRef}
              src={src}
              alt={alt}
              loading="lazy"
              className="block aspect-[9/19] w-full object-contain object-top"
            />
            <div
              className="absolute bottom-1.5 left-1/2 h-1 w-16 -translate-x-1/2 rounded-full bg-black/50"
              aria-hidden="true"
            />
          </div>
        </div>
      </figure>
    )
  }

  return (
    <figure>
      {/* Monitor: black bezel; the screen hugs the screenshot — no blank filler */}
      <div className="overflow-hidden rounded-xl border border-white/10 bg-[#0d0f0c] p-[6px] shadow-[var(--device-shadow)]">
        {/* Chrome bar */}
        <div className="flex shrink-0 items-center gap-3 border-b border-white/10 bg-white/[0.05] px-3 py-2.5">
          <div className="flex shrink-0 gap-1.5" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-online/70" />
            <span className="h-2 w-2 rounded-full bg-private/70" />
            <span className="h-2 w-2 rounded-full bg-white/30" />
          </div>
          <div className="flex min-w-0 flex-1 items-center gap-1.5 rounded border border-white/10 bg-black/40 px-2 py-1.5">
            <svg
              className="h-2.5 w-2.5 shrink-0 text-white/50"
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
            <span className="u-label truncate normal-case tracking-normal text-white/60">
              {url || alt}
            </span>
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </div>

        {/* Screen: square corners, screenshot full width, light page filler below */}
        <div className="overflow-hidden bg-[#f6f6f6]">
          <img ref={imgRef} src={src} alt={alt} loading="lazy" className="block w-full" />
        </div>
      </div>

      {/* Stand: solid dark hardware — same tone as the bezel so it reads as
          one piece in both themes */}
      <div className="flex flex-col items-center" aria-hidden="true">
        <div className="h-6 w-16 bg-[#20241f] md:h-8" />
        <div className="h-1.5 w-40 rounded-t-sm bg-[#2c312b] md:w-52" />
      </div>
    </figure>
  )
}
