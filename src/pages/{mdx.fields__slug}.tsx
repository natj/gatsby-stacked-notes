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

interface TOCItem {
  url: string;
  title: string;
  items?: TOCItem[];
}

interface NotePageProps {
  data: {
    mdx: {
      frontmatter: {
        title: string;
        hideHeader: boolean | null;
        hideFooter: boolean | null;
        toc: boolean | null;
        toc_depth: number | null;
      };
      fields: {
        slug: string;
      };
      backlinks: Backlink[] | null;
      tableOfContents: {
        items?: TOCItem[];
      };
    };
  };
  children: ReactNode;
}

const TOCList: React.FC<{ items: TOCItem[]; current_depth: number; max_depth: number }> = ({ items, current_depth, max_depth }) => (
  <ul className="toc-list">
    {items.map((item) => (
      <li key={item.url}>
        <a href={item.url} className="toc-link">
          {item.title}
        </a>
        {item.items && current_depth < max_depth && (
          <TOCList items={item.items} current_depth={current_depth + 1} max_depth={max_depth} />
        )}
      </li>
    ))}
  </ul>
);

// Page Template: Gatsby automatically creates pages using this component for every MDX file.
export default function NotePage({ data, children }: NotePageProps) {
  const { backlinks, frontmatter, tableOfContents } = data.mdx;

  // Default to a large depth if not specified.
  const max_depth = frontmatter.toc_depth || 6;

  return (
    <div>
      <MDXProvider components={{ a: MdxLink as any }}>
        
        <h1>{data.mdx.frontmatter.title}</h1>

        {/* Table of Contents: Rendered only if 'toc: true' in frontmatter and items exist. */}
        {frontmatter.toc && tableOfContents.items && tableOfContents.items.length > 0 && (
          <div className="toc-container">
            <h3 className="toc-title">Table of Contents</h3>
            <TOCList items={tableOfContents.items} current_depth={1} max_depth={max_depth} />
          </div>
        )}

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
        toc
        toc_depth
      }
      fields {
        slug
      }
      tableOfContents
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
