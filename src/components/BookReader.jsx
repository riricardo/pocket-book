import { BackButton } from './BackButton.jsx'
import { Chapter } from './Chapter.jsx'
import { SiteHeader } from './SiteHeader.jsx'

export function BookReader({ book, volume, chapter }) {
  const volumeNumber = String(volume.number).padStart(2, '0')
  const routeRoot = chapter ? '../../../' : '../../'
  const chapterIndex = chapter
    ? volume.chapters.findIndex((item) => item.id === chapter.id)
    : -1
  const previousChapter = volume.chapters[chapterIndex - 1]
  const nextChapter = volume.chapters[chapterIndex + 1]

  return (
    <main className="volume-page reader-page">
      <SiteHeader
        homeHref={routeRoot}
        action={
          <BackButton
            href={`${routeRoot}book/${book.slug}/`}
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

        {chapter ? (
          <Chapter
            chapter={chapter}
            previousChapter={previousChapter}
            nextChapter={nextChapter}
            previousHref={previousChapter ? `../${previousChapter.id}/` : null}
            nextHref={nextChapter ? `../${nextChapter.id}/` : null}
          />
        ) : (
          <p className="reader-note">{volume.emptyMessage}</p>
        )}
      </div>
    </main>
  )
}