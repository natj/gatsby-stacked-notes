import React from 'react';
import { graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from '../components/MdxLink';

// We can import MDX files as if they were components.
// These are "partials" - reusable snippets of content.
import NoteHeader from '../components/partials/NoteHeader.mdx';
import NoteFooter from '../components/partials/NoteFooter.mdx';

// This is a "page template" component. Gatsby uses this file to create a page for each of our notes.
// The special filename `{mdx.fields__slug}.js` tells Gatsby to use this template for any MDX file and pass its slug in the URL.
// Gatsby passes 'data' (from the GraphQL query below) and 'children' (the rendered HTML from the MDX file) as props.
export default function NotePage({ data, children }) {
  // We extract the 'backlinks' and 'frontmatter' from the data.
  const { backlinks, frontmatter } = data.mdx;

  return (
    <div>
      {/* The MDXProvider allows us to replace default HTML elements with custom React components. */}
      {/* Here, we're telling it to use our 'MdxLink' component for all `<a>` tags within the MDX content. */}
      <MDXProvider components={{ a: MdxLink }}>
        
        {/* We can conditionally render parts of the page. */}
        {/* The header is only shown if the 'hideHeader' frontmatter field is not true. */}
        {!frontmatter.hideHeader && (
          <div className="note-header-area">
            <NoteHeader />
          </div>
        )}

        {/* This is the title of the note, from the frontmatter. */}
        <h1>{data.mdx.frontmatter.title}</h1>

        {/* 'children' contains the main content of our note, already converted from Markdown to HTML. */}
        {children}

        {/* If there are any backlinks to this note, we display them here. */}
        {backlinks && backlinks.length > 0 && (
          <div className="references-block">
            <h3 className="references-title">
              Referred in
            </h3>
            <div>
              {/* We "map" over the backlinks array and render a link for each one. */}
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

        {/* The footer is only shown if the 'hideFooter' frontmatter field is not true. */}
        {!frontmatter.hideFooter && (
          <div className="note-footer-area">
            <NoteFooter />
          </div>
        )}

      </MDXProvider>

    </div>
  );
}

// This is a GraphQL query. Gatsby runs this query and passes the result as the 'data' prop to our component.
// GraphQL allows us to ask for the exact data we need.
export const query = graphql`
  # The '$id' is a variable that Gatsby provides, corresponding to the unique ID of the current MDX file.
  query($id: String!) {
    # We are querying for a single MDX node with that ID.
    mdx(id: { eq: $id }) {
      frontmatter {
        title
        hideHeader
        hideFooter
      }
      fields {
        slug
      }
      # We are also querying for backlinks - other notes that link to this one.
      backlinks {
        id
        excerpt(pruneLength: 80) # A short excerpt of the content.
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
