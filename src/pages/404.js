import React from 'react';
import MdxLink from '../components/MdxLink';

// In Gatsby, a file named `404.js` inside the `src/pages` directory automatically becomes the 404 "Not Found" page.
// This page is shown whenever a user tries to visit a URL that doesn't exist.
export default function NotFoundPage() {
  return (
    // We are just rendering some simple text and a link.
    <div className="max-w-none">
      <h1>
        404
      </h1>

      <div className="prose prose-lg text-gray-700">
        <h3>
          This note doesn't exist yet.
        </h3>
        <p>
          You have reached the edge of the site. The link you clicked hasn't been created (yet).
        </p>
        <p className="mt-8">
           {/* We use our custom MdxLink component to link back to the homepage. */}
           <MdxLink href="/">← Go back to the beginning</MdxLink>
        </p>
      </div>
    </div>
  );
}
