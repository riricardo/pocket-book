import { useEffect } from 'react'
import { books, findVolume } from './books.js'
import { BookList } from './components/BookList.jsx'
import { SiteHeader } from './components/SiteHeader.jsx'
import { BookOverview } from './components/BookOverview.jsx'
import { BookReader } from './components/BookReader.jsx'

function getRoute(pathname) {
  const pathSegments = pathname.split('/').filter(Boolean)
  const bookRouteIndex = pathSegments.lastIndexOf('book')

  if (bookRouteIndex >= 0 && pathSegments[bookRouteIndex + 1]) {
    return { type: 'book', slug: pathSegments[bookRouteIndex + 1] }
  }

  const bookSlug = pathSegments.at(-3)
  const volumeSlug = pathSegments.at(-2)
  const chapterSlug = pathSegments.at(-1)
  const chapterVolume = findVolume(bookSlug, volumeSlug)
  const chapter = chapterVolume?.volume.chapters.find((item) => item.id === chapterSlug)

  if (chapterVolume && chapter) {
    return { type: 'chapter', bookSlug, volumeSlug, chapterSlug }
  }

  const emptyVolume = findVolume(pathSegments.at(-2), pathSegments.at(-1))
  if (emptyVolume && emptyVolume.volume.chapters.length === 0) {
    return {
      type: 'volume',
      bookSlug: pathSegments.at(-2),
      volumeSlug: pathSegments.at(-1),
    }
  }

  return { type: 'home' }
}

function LibraryHome() {
  return (
    <main className="book-index">
      <SiteHeader homeHref="./" />
      <section className="library" aria-labelledby="library-title">
        <p className="eyebrow">A little reading, at your own pace</p>
        <h1 id="library-title">Your next read</h1>
        <p className="intro">Books to follow your curiosity, one volume at a time.</p>
        <p className="section-label">Your books</p>
        <BookList books={books} />
      </section>
    </main>
  )
}

function App() {
  const route = getRoute(window.location.pathname)
  const book =
    route.type === 'book' ? books.find((item) => item.slug === route.slug) : null
  const volumeData =
    route.type === 'chapter' || route.type === 'volume'
      ? findVolume(route.bookSlug, route.volumeSlug)
      : null
  const chapter =
    route.type === 'chapter'
      ? volumeData?.volume.chapters.find((item) => item.id === route.chapterSlug)
      : null
  const pageTitle = book
    ? `${book.title} | Pocket Books`
    : chapter
      ? `${chapter.title} | ${volumeData.book.title} | Pocket Books`
      : volumeData
      ? `${volumeData.book.title} | Volume ${volumeData.volume.number} | Pocket Books`
      : 'Pocket Books'

  useEffect(() => {
    document.title = pageTitle
  }, [pageTitle])

  if (route.type === 'book') {
    return book ? (
      <BookOverview book={book} />
    ) : (
      <NotFound message="This book could not be found." />
    )
  }

  if (route.type === 'chapter' || route.type === 'volume') {
    return volumeData ? (
      <BookReader
        book={volumeData.book}
        volume={volumeData.volume}
        chapter={chapter}
      />
    ) : (
      <NotFound message="This volume could not be found." />
    )
  }

  return <LibraryHome />
}

function NotFound({ message }) {
  return (
    <main className="volume-page reader-page">
      <p role="alert">{message}</p>
    </main>
  )
}

export default App
