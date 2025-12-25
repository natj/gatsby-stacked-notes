import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from '../components/MdxLink';

export default function NotePage({ data, children }) {
  return (
    <div className="prose lg:prose-xl">
      <h1>{data.mdx.frontmatter.title}</h1>
      <MDXProvider components={{ a: MdxLink }}>
        {children}
      </MDXProvider>
    </div>
  );
}

export const query = graphql`
  query ($id: String) {
    mdx(id: { eq: $id }) {
      frontmatter {
        title
      }
    }
  }
`;
