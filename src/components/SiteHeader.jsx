export function SiteHeader({ homeHref, action }) {
  return (
    <header className="site-header">
      <a className="wordmark" href={homeHref}>
        Pocket Books
      </a>
      {action}
    </header>
  )
}