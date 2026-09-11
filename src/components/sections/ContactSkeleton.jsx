export default function ContactSkeleton() {
  return (
    <section
      id="contacto"
      className="relative pb-24 pt-24 md:pb-32 md:pt-36"
      aria-busy="true"
      aria-label="Cargando sección de contacto"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="border-t border-border pt-6 md:pt-20">
          <div className="max-w-2xl space-y-3">
            <div className="h-10 w-24 bg-border rounded animate-pulse" />
            <div className="h-5 w-72 bg-border/70 rounded animate-pulse" />
          </div>
        </div>

        <div className="mt-16 grid gap-x-14 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-5 space-y-4">
            <div className="h-32 border border-border bg-bg-secondary/40 animate-pulse" />
            <div className="h-20 border border-border bg-bg-secondary/40 animate-pulse" />
          </div>
          <div className="lg:col-span-7">
            <div className="h-[420px] border border-border bg-bg-secondary/40 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
}
