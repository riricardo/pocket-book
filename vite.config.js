import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath, URL } from 'node:url'

function bookRoutes() {
  const booksDirectory = fileURLToPath(new URL('./books/', import.meta.url))

  function loadVolumes() {
    return readdirSync(booksDirectory, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .flatMap((bookDirectory) => {
        const bookPath = join(booksDirectory, bookDirectory.name)

        return readdirSync(bookPath)
          .filter((fileName) => /^volume-.*\.json$/.test(fileName))
          .map((fileName) => JSON.parse(readFileSync(join(bookPath, fileName), 'utf8')))
      })
  }

  return {
    name: 'pocket-book-routes',
    enforce: 'post',
    configureServer(server) {
      server.middlewares.use((request, _response, next) => {
        if (!request.url) return next()

        const requestUrl = new URL(request.url, 'http://localhost')
        const bookRoute = /^\/book\/([^/]+)\/?$/.test(requestUrl.pathname)
        const pathSegments = requestUrl.pathname.split('/').filter(Boolean)
        const volumes = loadVolumes()
        const bookSlug = pathSegments.at(-3)
        const volumeSlug = pathSegments.at(-2)
        const chapterSlug = pathSegments.at(-1)
        const chapterRoute = volumes.some(
          ({ book, volume }) =>
            book.slug === bookSlug &&
            volume.slug === volumeSlug &&
            volume.chapters.some((chapter) => chapter.id === chapterSlug),
        )
        const emptyVolumeRoute = volumes.some(
          ({ book, volume }) =>
            book.slug === pathSegments.at(-2) &&
            volume.slug === pathSegments.at(-1) &&
            volume.chapters.length === 0,
        )

        if (bookRoute || chapterRoute || emptyVolumeRoute) {
          request.url = `/index.html${requestUrl.search}`
        }

        next()
      })
    },
    generateBundle(_options, bundle) {
      const pageTemplate = bundle['index.html']
      if (!pageTemplate) {
        throw new Error('The root index.html template must exist in the build bundle.')
      }

      const pageHtml = String(pageTemplate.source)
      const rebaseAssets = (html, depth) => {
        const relativeRoot = '../'.repeat(depth)
        return html
          .replaceAll('./assets/', `${relativeRoot}assets/`)
          .replaceAll('./favicon.svg', `${relativeRoot}favicon.svg`)
      }
      const volumes = loadVolumes()
      const emittedBooks = new Set()

      for (const { book, volume } of volumes) {
        if (!emittedBooks.has(book.slug)) {
          this.emitFile({
            type: 'asset',
            fileName: `book/${book.slug}/index.html`,
            source: rebaseAssets(pageHtml, 2),
          })
          emittedBooks.add(book.slug)
        }

        if (volume.chapters.length > 0) {
          for (const chapter of volume.chapters) {
            this.emitFile({
              type: 'asset',
              fileName: `${book.slug}/${volume.slug}/${chapter.id}/index.html`,
              source: rebaseAssets(pageHtml, 3),
            })
          }
        } else {
          this.emitFile({
            type: 'asset',
            fileName: `${book.slug}/${volume.slug}/index.html`,
            source: rebaseAssets(pageHtml, 2),
          })
        }
      }
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), bookRoutes()],
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
      },
    },
  },
})
