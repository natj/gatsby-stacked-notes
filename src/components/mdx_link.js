import React from 'react';
import { Link } from 'gatsby';
import { use_stack, use_note_idx } from '../context/stack_context';

// Renders links within MDX content.
const MdxLink = ({ href, children }) => {
  const { set_source_idx } = use_stack();
  const idx = use_note_idx(); 
  
  const is_internal = href && (href.startsWith('/') || href.startsWith('.'));

  // Use Gatsby Link for internal navigation.
  if (is_internal) {
    return (
      <Link
        to={href}
        onClick={() => {
          // Tell StackContext the index of the note containing the link for branching.
          if (idx !== -1) {
            set_source_idx(idx);
          }
        }}
        className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer"
      >
        {children}
      </Link>
    );
  }

  // Standard anchor for external links.
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
      {children}
    </a>
  );
};

export default MdxLink;
