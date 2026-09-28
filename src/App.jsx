import { useEffect } from 'react'
import '../shared/pocket-book.css'
import { renderIcons } from '../shared/icons.js'

function App() {
  useEffect(() => {
    renderIcons()
  }, [])

  return (
    <main className="book-index">
      <header className="site-header">
        <a className="wordmark" href="./">Pocket Books</a>
        <span className="header-note">Your personal library</span>
      </header>
      <section className="library" aria-labelledby="library-title">
        <p className="eyebrow">A little reading, at your own pace</p>
        <h1 id="library-title">Your next read</h1>
        <p className="intro">Books to follow your curiosity, one volume at a time.</p>
        <p className="section-label">Your books</p>
        <ul className="book-list">
          <li>
            <a href="./software-engineering/">
              <span className="book-number" aria-hidden="true">01</span>
              <span className="book-details">
                <span className="book-category">Technology</span>
                <span className="book-title">Software Engineering</span>
              </span>
              <span className="book-volume">
                Open book <i className="action-icon" data-lucide="arrow-right" aria-hidden="true"></i>
              </span>
            </a>
          </li>
          <li>
            <a href="./japanese/">
              <span className="book-number" aria-hidden="true">02</span>
              <span className="book-details">
                <span className="book-category">Languages</span>
                <span className="book-title">Japanese</span>
              </span>
              <span className="book-volume">
                Open book <i className="action-icon" data-lucide="arrow-right" aria-hidden="true"></i>
              </span>
            </a>
          </li>
        </ul>
      </section>
    </main>
  )
}

export default App
