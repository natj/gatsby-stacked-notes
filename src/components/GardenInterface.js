import React from 'react';
import { useStack, NoteIndexContext } from '../context/StackContext';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from './MdxLink';
import { Link } from 'gatsby';
import useWindowWidth from '../hooks/useWindowWidth'; // <--- Import the hook

const NoteCard = ({ children, index, title, slug, isStacked, isMobile }) => (
  <div 
    className="note-card"
    style={{
      // If mobile, take full width. If desktop, use fixed 576px
      width: isMobile ? '100vw' : undefined,
      left: isMobile ? 0 : index * 40, 
      zIndex: index,
      // On mobile, remove the sticky behavior so it scrolls naturally
      position: isMobile ? 'relative' : 'sticky',
      borderRight: isMobile ? 'none' : undefined,
      boxShadow: isMobile ? 'none' : undefined,
    }}
  >
    {/* SPINE: Only show on Desktop */}
    {!isMobile && (
      <div className={`note-spine ${isStacked ? 'visible' : ''}`}>
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

export default function GardenInterface() {
  const { stack } = useStack();
  const width = useWindowWidth();
  
  // Mobile Breakpoint (768px is standard iPad portrait / large phone)
  const isMobile = width <= 768;

  if (!stack || stack.length === 0) return null;

  // RENDER LOGIC:
  // Mobile: Show ONLY the last item (the active note)
  // Desktop: Show the whole list
  
  const notesToShow = isMobile 
    ? [stack[stack.length - 1]] // Array with just the last item
    : stack;

  return (
    <div className="garden-layout">
      {notesToShow.map((item, i) => {
        // On mobile, index is always 0. On desktop, it matches the stack index.
        const realIndex = isMobile ? stack.length - 1 : i;
        
        const isStacked = !isMobile && realIndex < stack.length - 1;
        const cleanTitle = item.path === '/' ? 'Home' : item.path.replace(/^\//, '').replace(/-/g, ' ');

        return (
          <NoteIndexContext.Provider value={realIndex} key={item.path}>
            <NoteCard 
              index={realIndex} 
              title={cleanTitle} 
              slug={item.path}
              isStacked={isStacked}
              isMobile={isMobile}
            >
              {item.component}
            </NoteCard>
          </NoteIndexContext.Provider>
        );
      })}
      
      {/* Spacer for scrolling past the last card (Desktop only) */}
      {!isMobile && <div className="flex-shrink-0 w-96" />}
    </div>
  );
}
