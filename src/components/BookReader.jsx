import { BackButton } from './BackButton.jsx'
import { Chapter } from './Chapter.jsx'
import { SiteHeader } from './SiteHeader.jsx'

export function BookReader({ book, volume }) {
  const volumeNumber = String(volume.number).padStart(2, '0')

  return (
    <main className="volume-page reader-page">
      <SiteHeader
        homeHref="../../../"
        action={
          <BackButton
            href={`../../../book/${book.slug}/`}
            label={`Back to ${book.title}`}
          />
        }
      />

      <div className="volume-content">
        <header className="volume-heading">
          <p className="eyebrow">
            {book.title} · Volume {volumeNumber}
          </p>
          <h1>{volume.title}</h1>
        </header>

        {volume.chapters.length > 0 ? (
          volume.chapters.map((chapter) => (
            <Chapter key={chapter.id} chapter={chapter} />
          ))
        ) : (
          <p className="reader-note">{volume.emptyMessage}</p>
        )}
      </div>
    </main>
  )
}