# Pocket Books

A React + Vite project with standalone HTML pages for each volume.

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
