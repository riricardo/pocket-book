import { createIcons, ArrowLeft, ArrowRight } from 'lucide'

export function renderIcons() {
  createIcons({ icons: { ArrowLeft, ArrowRight } })
  enableBackLinks()
}

function enableBackLinks() {
  document.querySelectorAll('[data-history-back]').forEach((link) => {
    if (link.dataset.historyBackReady) return
    link.dataset.historyBackReady = 'true'

    link.addEventListener('click', (event) => {
      if (!document.referrer) return

      const previous = new URL(document.referrer)
      const destination = new URL(link.href, window.location.href)
      const normalizePath = (path) => path.replace(/\/+$/, '') || '/'
      const isPreviousPage =
        previous.origin === destination.origin &&
        normalizePath(previous.pathname) === normalizePath(destination.pathname) &&
        previous.search === destination.search

      if (isPreviousPage) {
        event.preventDefault()
        window.history.back()
      }
    })
  })
}

renderIcons()