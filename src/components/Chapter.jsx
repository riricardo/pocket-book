import { ChapterSection } from './ChapterSection.jsx'
import { ChapterNavigation } from './ChapterNavigation.jsx'

export function Chapter({
  chapter,
  previousChapter,
  nextChapter,
  previousHref,
  nextHref,
}) {
  return (
    <article
      id={chapter.id}
      className="chapter"
      aria-labelledby={`${chapter.id}-title`}
    >
      <header className="chapter-header">
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
      </header>
      {chapter.sections.map((section) => (
        <ChapterSection key={section.id} section={section} />
      ))}
      <ChapterNavigation
        previousChapter={previousChapter}
        nextChapter={nextChapter}
        previousHref={previousHref}
        nextHref={nextHref}
      />
    </article>
  )
}