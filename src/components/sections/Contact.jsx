import { useState } from 'react'
import { ArrowUpRight, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { site } from '../../data/site'
import SectionHeading from '../ui/SectionHeading'
import Button from '../ui/Button'
import DownloadCVButton from '../ui/DownloadCVButton'
import { useI18n } from '../../i18n/LocaleProvider'

const fieldClasses =
  'w-full bg-transparent border-0 border-b border-border py-[7px] text-text-primary placeholder:text-text-muted focus:border-accent focus:outline-none transition-colors min-h-[40px]'

export default function Contact() {
  const { t } = useI18n()
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    reason: '',
  })
  const [status, setStatus] = useState('idle') // idle | success | error
  const [errors, setErrors] = useState({})

  const hasEndpoint = Boolean(import.meta.env.VITE_CONTACT_ENDPOINT)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('idle')

    // Validación en cliente: el form usa noValidate, así que esta es la única barrera.
    const nextErrors = {}
    if (formState.name.trim().length < 2) nextErrors.name = t('form.nameRequired')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email.trim())) {
      nextErrors.email = t('form.emailInvalid')
    }
    if (formState.reason.trim().length < 10) {
      nextErrors.reason = t('form.messageRequired')
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length > 0) return

    const payload = {
      name: formState.name.trim(),
      email: formState.email.trim(),
      reason: formState.reason.trim(),
    }

    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT

    if (!endpoint) {
      const subject = encodeURIComponent(t('form.subject', { name: payload.name }))
      const body = encodeURIComponent(
        t('form.body', { name: payload.name, email: payload.email, reason: payload.reason }),
      )
      const mailtoUrl = `mailto:${site.email}?subject=${subject}&body=${body}`
      setFormState({ name: '', email: '', reason: '' })
      window.location.href = mailtoUrl
      setStatus('success')
      return
    }

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          ...payload,
          _subject: t('form.subject', { name: payload.name }),
          _captcha: 'false',
        }),
      })

      if (!response.ok) throw new Error(t('form.sendError'))

      const result = await response.json().catch(() => null)
      if (result && result.success === 'false') throw new Error(t('form.rejected'))

      setStatus('success')
      setFormState({ name: '', email: '', reason: '' })
    } catch {
      setStatus('error')
    }
  }

  const rows = [
    {
      label: 'Email',
      value: site.email,
      href: `mailto:${site.email}`,
      external: false,
    },
    {
      label: 'LinkedIn',
      value: 'luis-montes-de-oca',
      href: site.linkedin,
      external: true,
    },
  ]

  return (
    <section className="relative pb-24 pt-24 md:pb-32 md:pt-36">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          index="07"
          title={t('sections.contact')}
          id="contacto"
        />

        <div className="mt-0 grid gap-x-14 gap-y-14 lg:grid-cols-[43fr_57fr] lg:items-stretch">
          {/* Direct channels */}
          <div className="flex min-w-0 lg:col-span-1">
            <div className="terminal-box flex w-full flex-col border border-border bg-bg-secondary font-mono text-xs">
              <div className="flex h-[62px] items-center justify-between border-b border-border px-6 py-0 text-text-muted">
                <span className="flex items-center gap-2"><span className="text-accent">›_</span> contact.channels</span>
                <span className="text-accent">●</span>
              </div>
              <ul className="divide-y divide-border">
              {rows.map((row) => (
                <li key={row.label}>
                  <a
                    href={row.href}
                    {...(row.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    data-cursor="talk"
                    className="group flex min-w-0 items-center justify-between gap-3 px-4 py-6 transition-colors hover:bg-bg-elevated sm:gap-4 sm:px-6 sm:py-[31px]"
                  >
                    <span className="u-label text-text-muted">{row.label}</span>
                    <span className="inline-flex min-w-0 items-center gap-2 break-all text-right font-medium text-text-primary">
                      {row.value}
                      <ArrowUpRight
                        size={16}
                        className="text-text-muted transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                        aria-hidden="true"
                      />
                    </span>
                  </a>
                </li>
              ))}
              </ul>
              <div className="mt-auto border-t border-border px-4 py-5 sm:px-6">
                <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="u-label mb-1 text-text-muted">{t('sections.curriculum')}</p>
                    <p className="text-sm text-text-secondary">
                      {t('sections.curriculumDescription')}
                    </p>
                  </div>
                  <DownloadCVButton
                    variant="primary"
                    size="contact"
                    label={t('common.downloadCv')}
                    className="min-h-0 h-10 max-w-full self-start whitespace-normal text-left font-sans sm:self-end"
                  />
                </div>
              </div>

            </div>
          </div>

          {/* Form */}
          <div className="flex min-w-0 lg:col-span-1">
            <div className="terminal-box flex w-full flex-col border border-border bg-bg-secondary">
              <div className="flex h-[62px] items-center justify-between border-b border-border px-6 py-0 font-mono text-xs text-text-muted">
                <span className="flex items-center gap-2"><span className="text-accent">›_</span> send.message</span>
                <span className="text-accent">●</span>
              </div>
              <div className="flex flex-1 flex-col px-6 pb-5 pt-[31px]">

              <form onSubmit={handleSubmit} className="flex flex-1 flex-col gap-[17px]" noValidate>
                <div className="grid gap-x-8 gap-y-[17px] sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="u-label mb-1 block text-text-muted">
                      {t('sections.name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      autoComplete="name"
                      value={formState.name}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.name)}
                      className={fieldClasses}
                      placeholder={t('sections.placeholderName')}
                    />
                    {errors.name && <p className="mt-1 text-sm text-danger">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className="u-label mb-1 block text-text-muted">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      autoComplete="email"
                      value={formState.email}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.email)}
                      className={fieldClasses}
                      placeholder={t('sections.placeholderEmail')}
                    />
                    {errors.email && <p className="mt-1 text-sm text-danger">{errors.email}</p>}
                  </div>
                </div>

                <div>
                  <label htmlFor="reason" className="u-label mb-1 block text-text-muted">
                    {t('sections.message')}
                  </label>                    <input
                      type="text"
                      id="reason"
                      name="reason"
                      required
                      value={formState.reason}
                      onChange={handleChange}
                      aria-invalid={Boolean(errors.reason)}
                      className={fieldClasses}
                      placeholder={t('sections.placeholderMessage')}
                    />
                    {errors.reason && (
                      <p className="mt-1 text-sm text-danger">{errors.reason}</p>
                    )}
                  </div>

                <div className="mt-auto flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                  <Button
                    type="submit"
                    variant="primary"
                    size="contact"
                    data-cursor="talk"
                    className="min-h-0 h-10 font-sans"
                  >
                    {t('sections.sendMessage')}
                    <Send size={16} aria-hidden="true" />
                  </Button>

                  <div aria-live="polite">
                    {status === 'success' && (
                      <p className="flex items-start gap-2 text-sm text-online" role="status">
                        <CheckCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>
                          {hasEndpoint
                            ? t('form.sent')
                            : t('form.mailtoReady')}
                        </span>
                      </p>
                    )}
                    {status === 'error' && (
                      <p className="flex items-start gap-2 text-sm text-danger" role="alert">
                        <AlertCircle size={16} className="mt-0.5 shrink-0" aria-hidden="true" />
                        <span>
                          {t('form.failed', { email: site.email })}
                        </span>
                      </p>
                    )}
                  </div>
                </div>
              </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
