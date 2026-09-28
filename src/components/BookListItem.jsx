import { ArrowRight } from 'lucide-react'

export function BookListItem({ book }) {
  return (
    <li>
      <a href={book.href}>
        <span className="book-number" aria-hidden="true">
          {book.number}
        </span>
        <span className="book-details">
          <span className="book-category">{book.category}</span>
          <span className="book-title">{book.title}</span>
        </span>
        <span className="book-volume">
          Open book
          <ArrowRight className="action-icon" aria-hidden="true" />
        </span>
      </a>
    </li>
  )
}