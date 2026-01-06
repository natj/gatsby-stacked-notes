import React from 'react';
import { Link, withPrefix } from 'gatsby';
import { useStack, useNoteIndex } from '../context/stack_context';
import clsx from 'clsx';
import make_slug from '../../utils/slugify.mjs';

const MdxLink = ({ href, children }) => {
  const { stack, set_source_idx } = useStack();
  const idx = useNoteIndex(); 
  
  const is_internal = href && (href.startsWith('/') || href.startsWith('.'));

  // Normalize href for comparison with stack paths.
  const get_clean_path = (raw_href) => {
    let path = raw_href;
    const prefix = withPrefix('/');
    
    // Remove prefix if present
    if (prefix !== '/' && path.startsWith(prefix)) {
      path = path.slice(prefix.length - 1); 
    }
    
    // If it's a root path or just a slash, return as is
    if (path === '/' || path === '') return '/';

    // Remove leading slash for slugification, then add it back
    const parts = path.split('/').filter(Boolean);
    const slugified_parts = parts.map(part => make_slug(part));
    
    return '/' + slugified_parts.join('/');
  };

  const clean_target = get_clean_path(href);
  const is_open = is_internal && stack.some(item => item.path === clean_target);

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
        className={clsx(
          "mdx-link",
          is_open && "is-open"
        )}
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