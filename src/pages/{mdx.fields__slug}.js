import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from '../components/MdxLink';

export default function NotePage({ data, children }) {
  const { backlinks } = data.mdx;

  return (
    <div>
      {/* 1. Header & Body */}
      <h1>{data.mdx.frontmatter.title}</h1>

      <MDXProvider components={{ a: MdxLink }}>
        {children}
      </MDXProvider>

      {/* 2. BACKLINKS FOOTER */}
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
          {/* Optional: Add the "Direct Message" text from the old theme here if you want */}
        </div>
      )}
    </div>
  );
}

export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
      backlinks {
        id
        excerpt(pruneLength: 80) # Increased length for better preview
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
