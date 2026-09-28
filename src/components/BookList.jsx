import { BookListItem } from './BookListItem.jsx'

export function BookList({ books }) {
  return (
    <ul className="book-list">
      {books.map((book) => (
        <BookListItem key={book.href} book={book} />
      ))}
    </ul>
  )
}