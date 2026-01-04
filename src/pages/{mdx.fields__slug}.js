import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from '../components/mdx_link';

// Import partials (reusable MDX snippets) to be used in rendering.
import NoteFooter from '../components/partials/NoteFooter.mdx';

// Page Template: Gatsby automatically creates pages using this component for every MDX file.
// 'data': The result of the GraphQL query below, injected as a prop.
// 'children': The actual MDX content (converted to React components).
export default function NotePage({ data, children }) {
  const { backlinks, frontmatter } = data.mdx;

  return (
    <div>
      {/* MDXProvider: Defines how markdown elements (like links) should be rendered. */}
      <MDXProvider components={{ a: MdxLink }}>
        
        {/* Header removed from individual note level */}

        <h1>{data.mdx.frontmatter.title}</h1>

        {/* Render the main body of the note. */}
        {children}

        {/* Render Backlinks section if references exist. */}
        {backlinks && backlinks.length > 0 && (
          <div className="references-block">
            <h3 className="references-title">
              Referred in
            </h3>
            <div>
              {backlinks.map((ref) => (
                <MdxLink href={ref.fields.slug} key={ref.id} className="reference-link">
                  <div className="ref-title">
                    {ref.frontmatter.title || ref.fields.slug}
                  </div>
                  <p className="ref-excerpt">
                    {ref.excerpt}
                  </p>
                </MdxLink>
              ))}
            </div>
          </div>
        )}

        {/* Conditional Rendering: Render Footer if not hidden. */}
        {!frontmatter.hideFooter && (
          <div className="note-footer-area">
            <NoteFooter />
          </div>
        )}

      </MDXProvider>

    </div>
  );
}

// GraphQL Query: Fetches data for this specific page.
// The '$id' variable is provided by Gatsby context for the current page.
export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        hideHeader
        hideFooter
      }
      fields {
        slug
      }
      # Fetch all notes that link TO this note (generated in gatsby-node.js).
      backlinks {
        id
        excerpt(pruneLength: 80)
        frontmatter {
          title
        }
        fields {
          slug
        }
      }
    }
  }
`;
