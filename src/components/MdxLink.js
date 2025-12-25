import React from 'react';
import { Link } from 'gatsby';

const MdxLink = ({ href, children }) => {
  // 1. Check if the link is internal (starts with / or .)
  const isInternal = href && (href.startsWith('/') || href.startsWith('.'));

  if (isInternal) {
    // 2. Use Gatsby's Link component. 
    // This changes the URL -> The Layout detects it -> The Stack updates.
    return (
      <Link
        to={href}
        className="text-blue-600 hover:text-blue-800 font-medium underline cursor-pointer"
      >
        {children}
      </Link>
    );
  }

  // 3. Handle external links (open in new tab)
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer" 
      className="text-gray-500 hover:text-gray-700 transition-colors"
    >
      {children}
    </a>
  );
};

export default MdxLink;
