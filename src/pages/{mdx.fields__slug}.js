import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from '../components/mdx_link';

// MDX partials.
import NoteHeader from '../components/partials/NoteHeader.mdx';
import NoteFooter from '../components/partials/NoteFooter.mdx';

// Template for individual note pages.
export default function NotePage({ data, children }) {
  const { backlinks, frontmatter } = data.mdx;

  return (
    <div>
      <MDXProvider components={{ a: MdxLink }}>
        
        {/* Render header if not hidden. */}
        {!frontmatter.hideHeader && (
          <div className="note-header-area">
            <NoteHeader />
          </div>
        )}

        <h1>{data.mdx.frontmatter.title}</h1>

        {/* Render note content. */}
        {children}

        {/* Render backlinks if present. */}
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

        {/* Render footer if not hidden. */}
        {!frontmatter.hideFooter && (
          <div className="note-footer-area">
            <NoteFooter />
          </div>
        )}

      </MDXProvider>

    </div>
  );
}

// Query note data and backlinks.
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
