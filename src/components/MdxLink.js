import React from 'react';
import { useStack } from '../context/StackContext';
import { Link } from 'gatsby';

const MdxLink = ({ href, children }) => {
  const { openNote } = useStack();
  const isInternal = href && (href.startsWith('/') || href.startsWith('.'));

  if (isInternal) {
    return (
      <a
        href={href}
        onClick={(e) => {
          e.preventDefault();
          // Ensure we pass the clean slug
          openNote(href);
        }}
        className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer"
      >
        {children}
      </a>
    );
  }
  return <a href={href} target="_blank" rel="noreferrer" className="text-gray-500">{children}</a>;
};

export default MdxLink;
