import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { findVolume } from './books.js'
import '../shared/pocket-book.css'

const routeSegments = window.location.pathname.split('/').filter(Boolean)
const chapterVolume = findVolume(routeSegments.at(-3), routeSegments.at(-2))
const hasChapterRoute = chapterVolume?.volume.chapters.some(
  (chapter) => chapter.id === routeSegments.at(-1),
)
const emptyVolume = findVolume(routeSegments.at(-2), routeSegments.at(-1))
const isReaderRoute = Boolean(
  hasChapterRoute || (emptyVolume && emptyVolume.volume.chapters.length === 0),
)

async function startApp() {
  if (isReaderRoute) {
    document.body.classList.add('reading-body')
    await import('../shared/lesson-system.css')
  }

  createRoot(document.getElementById('root')).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}

startApp()
