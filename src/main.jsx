import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import '../shared/pocket-book.css'

const routeSegments = window.location.pathname.split('/').filter(Boolean)
const isReaderRoute = routeSegments.includes('reader')

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
