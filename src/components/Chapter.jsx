import { ChapterSection } from './ChapterSection.jsx'

export function Chapter({ chapter }) {
  return (
    <article className="chapter" aria-labelledby={`${chapter.id}-title`}>
      <header className="chapter-header">
        <h2 id={`${chapter.id}-title`}>{chapter.title}</h2>
      </header>
      {chapter.sections.map((section) => (
        <ChapterSection key={section.id} section={section} />
      ))}
    </article>
  )
}