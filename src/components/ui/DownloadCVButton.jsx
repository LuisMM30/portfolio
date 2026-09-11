import { Download } from 'lucide-react'
import { cv } from '../../data/site'
import Button from './Button'

export default function DownloadCVButton({
  variant = 'secondary',
  size = 'md',
  label = 'Descargar CV',
  className,
  iconOnly = false,
  ...props
}) {
  return (
    <Button
      href={cv.url}
      download={cv.fileName}
      variant={variant}
      size={size}
      className={className}
      aria-label={iconOnly ? label : undefined}
      title={label}
      {...props}
    >
      <Download size={16} aria-hidden="true" />
      {!iconOnly && <span>{label}</span>}
    </Button>
  )
}
