import React from 'react';
import { useStack, NoteIndexContext } from '../context/stack_context';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from './mdx_link';
import { Link } from 'gatsby';
import useWindowWidth from '../hooks/useWindowWidth';
import ThemeToggle from './theme_toggle';

// Functional Component: A function that returns UI (JSX).
// Props (children, idx, etc.) are arguments passed to the component.
const NoteCard = ({ children, idx, title, slug, is_stacked, is_mobile, on_close }) => (
  <div 
    className="note-card"
    // Inline styles in React use Objects, not strings.
    style={{
      width: is_mobile ? '100vw' : undefined,
      left: is_mobile ? 0 : idx * 40, 
      zIndex: idx,
      position: is_mobile ? 'relative' : 'sticky',
      borderRight: is_mobile ? 'none' : undefined,
      boxShadow: is_mobile ? 'none' : undefined,
    }}
  >
    {/* Conditional Rendering: {condition && element} renders element only if condition is true. */}
    {!is_mobile && (
      <div className={`note-spine ${is_stacked ? 'visible' : ''}`}>
        <Link to={slug} className="spine-text">
          {title || slug}
        </Link>
      </div>
    )}

    {/* MDXProvider: Overrides default HTML elements (like <a>) with custom components (MdxLink) inside MDX content. */}
    <div className="note-content relative">
      {/* Close Button: Absolute positioned top-right. Only shown if on_close is provided. */}
      {on_close && (
        <button 
          onClick={on_close}
          className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors z-50 p-2"
          aria-label="Close note"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}

      <div className="prose max-w-none">
        <MDXProvider components={{ a: MdxLink }}>
          {children}
        </MDXProvider>
      </div>
    </div>
  </div>
);

export default function GardenInterface() {
  const { stack, close_note } = useStack();
  const width = useWindowWidth();
  const is_mobile = width <= 768;

  if (!stack || stack.length === 0) return null;

  const notes_to_show = is_mobile ? [stack[stack.length - 1]] : stack;

  return (
    <div className="garden-layout relative">
      <ThemeToggle />

      {/* Map: Iterates over the stack array to generate a list of components. */}
      {notes_to_show.map((item, i) => {
        const real_idx = is_mobile ? stack.length - 1 : i;
        const is_stacked = !is_mobile && real_idx < stack.length - 1;
        
        // Use the title from the stack if available, otherwise fallback to path.
        const title = item.title || (item.path === '/' ? 'Home' : item.path.replace(/^\//, '').replace(/-/g, ' '));

        return (
          // Context Provider: Injects specific index value for the child component tree.
          // Key: Unique ID required by React for efficient list updates.
          <NoteIndexContext.Provider value={real_idx} key={item.path}>
             <NoteCard 
              idx={real_idx} 
              title={title} 
              slug={item.path}
              is_stacked={is_stacked}
              is_mobile={is_mobile}
              // Only the last note in the stack can be closed, and only if it's not the root note.
              on_close={real_idx > 0 && real_idx === stack.length - 1 ? () => close_note(real_idx) : undefined}
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
