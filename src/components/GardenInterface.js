import React from 'react';
import { useStack } from '../context/StackContext';
import { useStaticQuery, graphql } from 'gatsby';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from './MdxLink';

// Helper to render MDX children (The visible Note Card)
const NoteCard = ({ title, children, index }) => (
  <div 
    className="flex-shrink-0 w-[550px] bg-white border-r border-gray-200 shadow-xl h-full overflow-y-auto transition-transform duration-300"
    style={{
      position: 'sticky',
      left: index * 40, // The "Stacking" offset
      zIndex: index,
    }}
  >
    <div className="p-12 min-h-screen bg-white">
      <h1 className="text-3xl font-bold mb-8 text-gray-900">{title}</h1>
      <div className="prose prose-lg text-gray-700">
        <MDXProvider components={{ a: MdxLink }}>
          {children}
        </MDXProvider>
      </div>
    </div>
  </div>
);

export default function GardenInterface() {
  const { stack } = useStack();
  
  // FIXED QUERY: Removed the invalid // comment
  const data = useStaticQuery(graphql`
    query AllNotesQuery {
      allMdx {
        nodes {
          frontmatter {
            title
            slug
          }
          body 
        }
      }
    }
  `);

  const allNotes = data.allMdx.nodes;

  return (
    <div className="flex flex-row h-screen w-full overflow-x-auto bg-gray-100 items-start">
       <div className="p-10">
          <p>Garden is active. Stack: {JSON.stringify(stack)}</p>
          <p className="text-sm text-gray-500 mt-4">
            (Total notes loaded: {allNotes.length})
          </p>
       </div>
    </div>
  );
}
