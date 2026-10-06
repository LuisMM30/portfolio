import { Download } from 'lucide-react'
import { cv } from '../../data/site'
import Button from './Button'
import { useI18n } from '../../i18n/LocaleProvider'

export default function DownloadCVButton({
  variant = 'secondary',
  size = 'md',
  label = 'Descargar CV',
  className,
  iconOnly = false,
  ...props
}) {
  const { t } = useI18n()
  const translatedLabel = label === 'Descargar CV' ? t('common.downloadCv') : label
  return (
    <Button
      href={cv.url}
      download={cv.fileName}
      variant={variant}
      size={size}
      className={className}
      aria-label={iconOnly ? translatedLabel : undefined}
      title={translatedLabel}
      {...props}
    >
      <Download size={16} aria-hidden="true" />
      {!iconOnly && <span>{translatedLabel}</span>}
    </Button>
  )
}
