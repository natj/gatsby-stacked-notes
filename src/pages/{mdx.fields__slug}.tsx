import React, { ReactNode } from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from '../components/mdx_link';

// Import partials (reusable MDX snippets) to be used in rendering.
import NoteFooter from '../components/partials/NoteFooter.mdx';

interface Backlink {
  id: string;
  excerpt: string;
  frontmatter: {
    title: string | null;
  };
  fields: {
    slug: string;
  };
}

interface NotePageProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        hideHeader: boolean | null;
        hideFooter: boolean | null;
      };
      fields: {
        slug: string;
      };
      backlinks: Backlink[] | null;
    };
  };
  children: ReactNode;
}

// Page Template: Gatsby automatically creates pages using this component for every MDX file.
export default function NotePage({ data, children }: NotePageProps) {
  const { backlinks, frontmatter } = data.mdx;

  return (
    <div>
      <MDXProvider components={{ a: MdxLink as any }}>
        
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
                <MdxLink href={ref.fields.slug} key={ref.id}>
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
      # Fetch all notes that link TO this note (generated in gatsby-node.ts).
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