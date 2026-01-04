import React from 'react';
import { use_stack, NoteIndexContext } from '../context/stack_context';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from './mdx_link';
import { Link } from 'gatsby';
import use_win_width from '../hooks/use_win_width';
import ThemeToggle from './theme_toggle';

// Reusable card for a note.
const NoteCard = ({ children, idx, title, slug, is_stacked, is_mobile }) => (
  <div 
    className="note-card"
    style={{
      width: is_mobile ? '100vw' : undefined,
      left: is_mobile ? 0 : idx * 40, 
      zIndex: idx,
      position: is_mobile ? 'relative' : 'sticky',
      borderRight: is_mobile ? 'none' : undefined,
      boxShadow: is_mobile ? 'none' : undefined,
    }}
  >
    {/* SPINE: Only show on Desktop */}
    {!is_mobile && (
      <div className={`note-spine ${is_stacked ? 'visible' : ''}`}>
        <Link to={slug} className="spine-text">
          {title || slug}
        </Link>
      </div>
    )}

    {/* CONTENT */}
    <div className="note-content">
      <div className="prose max-w-none">
        <MDXProvider components={{ a: MdxLink }}>
          {children}
        </MDXProvider>
      </div>
    </div>
  </div>
);

// Main interface for the note garden.
export default function GardenInterface() {
  const { stack } = use_stack();
  const width = use_win_width();
  const is_mobile = width <= 768;

  if (!stack || stack.length === 0) return null;

  // Show only latest note on mobile, all on desktop.
  const notes_to_show = is_mobile ? [stack[stack.length - 1]] : stack;

  return (
    <div className="garden-layout relative">
      <ThemeToggle />

      {notes_to_show.map((item, i) => {
        const real_idx = is_mobile ? stack.length - 1 : i;
        const is_stacked = !is_mobile && real_idx < stack.length - 1;
        const title = item.path === '/' ? 'Home' : item.path.replace(/^\//, '').replace(/-/g, ' ');

        return (
          <NoteIndexContext.Provider value={real_idx} key={item.path}>
             <NoteCard 
              idx={real_idx} 
              title={title} 
              slug={item.path}
              is_stacked={is_stacked}
              is_mobile={is_mobile}
            >
              {item.component}
            </NoteCard>
          </NoteIndexContext.Provider>
        );
      })}
      
      {!is_mobile && <div className="flex-shrink-0 w-96" />}
    </div>
  );
}
