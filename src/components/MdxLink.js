import React from 'react';
import { Link } from 'gatsby';
import { useStack, useNoteIndex } from '../context/StackContext';

// This is the MdxLink component. It's designed to render links within MDX content.
// It receives "href" (the URL) and "children" (the content of the link, like text) as props.
const MdxLink = ({ href, children }) => {
  // "useStack" and "useNoteIndex" are custom hooks.
  // "setSourceIndex" is a function from our StackContext that we can use to update the stack of notes.
  const { setSourceIndex } = useStack();
  // "useNoteIndex" gives us the index of the note where this link is located.
  const myIndex = useNoteIndex(); 
  
  // We check if the link is "internal" to our site (starts with "/" or ".")
  const isInternal = href && (href.startsWith('/') || href.startsWith('.'));

  // If the link is internal, we render it using Gatsby's Link component for fast client-side navigation.
  if (isInternal) {
    return (
      <Link
        to={href}
        // The "onClick" event handler is a function that gets called when the user clicks the link.
        onClick={() => {
          // This is the core logic for the "branching" feature.
          // When a link is clicked, we tell the StackContext the index of the note containing the link.
          // This allows the context to remove any notes in the stack that came after the current note.
          if (myIndex !== -1) {
            setSourceIndex(myIndex);
          }
        }}
        // "className" is used for styling the link.
        className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer"
      >
        {children}
      </Link>
    );
  }

  // If the link is not internal, we render it as a standard HTML `<a>` tag.
  // "target="_blank"" opens the link in a new tab.
  // "rel="noopener noreferrer"" is a security measure for external links.
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
      {children}
    </a>
  );
};

export default MdxLink;
