import React from 'react';
import { Link } from 'gatsby';
import { useStack, useNoteIndex } from '../context/stack_context';

const MdxLink = ({ href, children }) => {
  const { set_source_idx } = useStack();
  const idx = useNoteIndex(); 
  
  const is_internal = href && (href.startsWith('/') || href.startsWith('.'));

  // Use Gatsby <Link> for internal routes to enable instant, client-side navigation without page reloads.
  if (is_internal) {
    return (
      <Link
        to={href}
        // onClick: Handles the stack branching logic before navigation occurs.
        onClick={() => {
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

  // Use standard HTML <a> tag for external links to open in new tab.
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-700">
      {children}
    </a>
  );
};

export default MdxLink;
