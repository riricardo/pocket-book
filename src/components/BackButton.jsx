import { ArrowLeft } from 'lucide-react'

function handleBack(event) {
  if (!document.referrer) return

  const previousPage = new URL(document.referrer)
  const destination = new URL(event.currentTarget.href, window.location.href)
  const normalizePath = (path) => path.replace(/\/+$/, '') || '/'
  const cameFromDestination =
    previousPage.origin === destination.origin &&
    normalizePath(previousPage.pathname) === normalizePath(destination.pathname) &&
    previousPage.search === destination.search

  if (cameFromDestination) {
    event.preventDefault()
    window.history.back()
  }
}

export function BackButton({ href, label }) {
  return (
    <a
      className="header-back"
      href={href}
      aria-label={label}
      title={label}
      onClick={handleBack}
    >
      <ArrowLeft aria-hidden="true" />
    </a>
  )
}