import { lazy, Suspense } from 'react'
import ContactSkeleton from './ContactSkeleton'

const Contact = lazy(() => import('./Contact').then(m => ({ default: m.default })))

export default function ContactRoute() {
  return (
    <Suspense fallback={<ContactSkeleton />}>
      <Contact />
    </Suspense>
  )
}
