import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"

// Styles defined in CSS would be preferred as per our rules, but for 404
// a few structural styles are common. I will use the established CSS classes.
const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className="prose max-w-none p-12">
      <h1>Page Not Found</h1>
      <p>
        The requested resource could not be located. This may be due to a broken link or a moved page.
      </p>
      <p>
        <Link to="/" className="mdx-link">Return to the home page</Link>
      </p>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>404: Not Found</title>
