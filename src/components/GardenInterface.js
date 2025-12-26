import React from 'react';
import { useStack, NoteIndexContext } from '../context/StackContext';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from './MdxLink';
import { Link } from 'gatsby';

const NoteCard = ({ children, index, title, slug, isStacked }) => (
  <div 
    className="note-card"
    style={{
      // We still need inline styles for dynamic positioning
      left: index * 40, 
      zIndex: index, 
    }}
  >
    {/* 1. SPINE TITLE */}
    <div className={`note-spine ${isStacked ? 'visible' : ''}`}>
      <Link to={slug} className="spine-text">
        {title || slug}
      </Link>
    </div>

    {/* 2. MAIN CONTENT */}
    <div className="note-content">
      <div className="prose max-w-none">
        <MDXProvider components={{ a: MdxLink }}>
          {children}
        </MDXProvider>
      </div>
    </div>
    
    {/* 3. CLICK OVERLAY */}
    {isStacked && (
      <Link 
        to={slug}
        className="absolute inset-0 z-30 cursor-pointer"
        aria-label={`Focus on ${title}`}
      />
    )}
  </div>
);

export default function GardenInterface() {
  const { stack } = useStack();

  return (
    <div className="garden-layout">
      {stack.map((item, index) => {
        const isStacked = index < stack.length - 1;
        const cleanTitle = item.path === '/' ? 'Home' : item.path.replace(/^\//, '').replace(/-/g, ' ');

        return (
          <NoteIndexContext.Provider value={index} key={item.path}>
            <NoteCard 
              index={index} 
              title={cleanTitle} 
              slug={item.path}
              isStacked={isStacked}
            >
              {item.component}
            </NoteCard>
          </NoteIndexContext.Provider>
        );
      })}
      
      {/* Spacer for scrolling past the last card */}
      <div className="flex-shrink-0 w-96" />
    </div>
  );
}
