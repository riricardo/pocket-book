export const volumes = Object.values(
  import.meta.glob('../books/*/volume-*.json', {
    eager: true,
    import: 'default',
  }),
)

export const books = [
  ...new Map(
    volumes.map(({ book }) => [
      book.slug,
      {
        number: book.number,
        category: book.category,
        title: book.title,
        slug: book.slug,
        description: book.description,
        href: `./book/${book.slug}/`,
        volumes: volumes
          .filter((volumeData) => volumeData.book.slug === book.slug)
          .map((volumeData) => volumeData.volume)
          .sort((first, second) => first.number - second.number),
      },
    ]),
  ).values(),
].sort((firstBook, secondBook) => Number(firstBook.number) - Number(secondBook.number))

export function findBook(bookSlug) {
  return books.find((book) => book.slug === bookSlug)
}

export function findVolume(bookSlug, volumeSlug) {
  return volumes.find(
    ({ book, volume }) => book.slug === bookSlug && volume.slug === volumeSlug,
  )
}