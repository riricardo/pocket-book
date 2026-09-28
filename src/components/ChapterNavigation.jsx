import { ArrowLeft, ArrowRight } from 'lucide-react'

export function ChapterNavigation({
  previousChapter,
  nextChapter,
  previousHref,
  nextHref,
}) {
  return (
    <nav className="chapter-navigation" aria-label="Chapter navigation">
      {previousChapter ? (
        <a
          className="chapter-navigation-link"
          href={previousHref}
          aria-label={`Previous chapter: ${previousChapter.title}`}
        >
          <ArrowLeft aria-hidden="true" />
          <span>Previous chapter</span>
        </a>
      ) : (
        <span />
      )}
      {nextChapter ? (
        <a
          className="chapter-navigation-link chapter-navigation-next"
          href={nextHref}
          aria-label={`Next chapter: ${nextChapter.title}`}
        >
          <span>Next chapter</span>
          <ArrowRight aria-hidden="true" />
        </a>
      ) : (
        <span />
      )}
    </nav>
  )
}