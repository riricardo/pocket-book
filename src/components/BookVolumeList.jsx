export function BookVolumeList({ book }) {
  return (
    <ul className="book-list">
      {book.volumes.map((volume) => (
        <li key={volume.slug}>
          <a
            href={
              volume.chapters.length > 0
                ? `../../${book.slug}/${volume.slug}/${volume.chapters[0].id}/`
                : `../../${book.slug}/${volume.slug}/`
            }
          >
            <span className="book-number" aria-hidden="true">
              {String(volume.number).padStart(2, '0')}
            </span>
            <span className="book-details">
              <span className="book-category">Volume</span>
              <span className="book-title">{volume.title}</span>
            </span>
            <span className="book-volume">Read volume</span>
          </a>
        </li>
      ))}
    </ul>
  )
}