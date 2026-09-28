function ContentBlock({ block }) {
  if (block.type === 'code') {
    return (
      <pre className="code-block">
        <code className={`language-${block.language}`}>{block.code}</code>
      </pre>
    )
  }

  if (block.type === 'paragraph') {
    return <p>{block.text}</p>
  }

  return null
}

function ContentBlocks({ blocks }) {
  return blocks.map((block, index) => (
    <ContentBlock key={block.id ?? `${block.type}-${index}`} block={block} />
  ))
}

export function ChapterSection({ section }) {
  const headingId = `${section.id}-title`
  const heading = <h3 id={headingId} className="callout-title">{section.title}</h3>
  const content = <ContentBlocks blocks={section.blocks} />

  if (['concept', 'remember', 'important', 'warning', 'tip'].includes(section.type)) {
    return (
      <aside className={section.type} aria-labelledby={headingId}>
        {heading}
        {content}
      </aside>
    )
  }

  if (['example', 'exercise'].includes(section.type)) {
    return (
      <section className={section.type} aria-labelledby={headingId}>
        {heading}
        {content}
      </section>
    )
  }

  return (
    <section className="section" aria-labelledby={headingId}>
      {heading}
      {content}
    </section>
  )
}