# Pocket Books

A React + Vite project with generic book and volume routes backed by JSON content.

## Development

```sh
npm install
npm run dev
```

## Build and deploy

```sh
npm run build
npm run deploy
```

The `deploy` command publishes the contents of `dist/` to the `gh-pages` branch. In GitHub, configure Pages to serve the `gh-pages` branch from its root.

Vite's `base: './'` keeps asset paths relative, so the site works both at a domain root and in a GitHub Pages project repository.

## Reading design system

`shared/lesson-system.css` provides the responsive lesson and print styles. Keep lesson content in semantic HTML and use `.chapter`, `.section`, `.concept`, `.example`, `.code-block`, `.remember`, `.important`, `.warning`, `.tip`, and `.exercise` to apply the reusable components.

On screen, lessons use Inter at 17px with 1.6 line-height and scrollable JetBrains Mono code blocks. Print uses Source Serif 4 body text, Inter headings, and A6 pages with mirrored binding margins and page numbers. Print styles preserve lesson content while removing site navigation.

## Book content

Store each volume as `books/<book-slug>/volume-<number>.json`. Each file contains its `book` metadata and a `volume` with `chapters`, `sections`, and typed `blocks`. The catalog is generated from these files.

Book overview pages use `/book/<book-slug>/`; volumes use `/reader/<book-slug>/<volume-slug>/`. The React routes are backed by shared components and generated static pages for GitHub Pages, using `book` and `volume` slugs from the JSON data.

The React reader is split into `BookReader`, `Chapter`, and `ChapterSection` components under `src/components/`. `ChapterSection` maps semantic section types such as `example`, `remember`, `important`, and `exercise` to the matching design-system classes.
