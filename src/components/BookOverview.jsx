import { BackButton } from './BackButton.jsx'
import { BookVolumeList } from './BookVolumeList.jsx'
import { SiteHeader } from './SiteHeader.jsx'

export function BookOverview({ book }) {
  return (
    <main className="volume-page">
      <SiteHeader
        homeHref="../../"
        action={<BackButton href="../../" label="Back to library" />}
      />
      <section className="volume-content" aria-labelledby="book-title">
        <p className="eyebrow">Book {book.number}</p>
        <h1 id="book-title">{book.title}</h1>
        <p className="intro">{book.description}</p>
        <p className="section-label">Volumes</p>
        <BookVolumeList book={book} />
      </section>
    </main>
  )
}