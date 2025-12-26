import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from '../components/MdxLink';

export default function NotePage({ data, children }) {
  const { backlinks } = data.mdx;

  return (
    <div className="prose lg:prose-xl">

      <h1>{data.mdx.frontmatter.title}</h1>

      <MDXProvider components={{ a: MdxLink }}>
        {children}
      </MDXProvider>


      {/* 2. BACKLINKS SECTION (Automatic) */}
      {backlinks && backlinks.length > 0 && (
        <div className="mt-12 pt-6 border-t border-gray-200 bg-gray-50 -mx-6 px-6 pb-6">
          <h3 className="text-lg font-bold text-gray-500 mb-3 uppercase tracking-wider text-sm">
            Linked to by
          </h3>
          <ul className="space-y-2">
            {backlinks.map((ref) => (
              <li key={ref.id}>
                <MdxLink href={ref.fields.slug}>
                  <div className="text-blue-600 hover:underline font-medium">
                    {ref.frontmatter.title || ref.fields.slug}
                  </div>
                  {/* Optional: Show a preview snippet of the backlink body */}
                  <p className="text-xs text-gray-500 truncate">
                    {ref.excerpt}
                  </p>
                </MdxLink>
              </li>
            ))}
          </ul>
        </div>
      )}


    </div>
  );
}


// Update the Query to fetch backlinks
export const query = graphql`
  query($id: String!) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
      fields {
        slug
      }
      # Fetch the backlinks we resolved in gatsby-node
      backlinks {
        id
        excerpt(pruneLength: 50)
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
