import React from 'react';
import { useStack, NoteIndexContext } from '../context/StackContext';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from './MdxLink';
import { Link } from 'gatsby';

const NOTE_WIDTH = '576px'; // 576px is standard Tailwind 'max-w-xl'

const NoteCard = ({ children, index, title, slug, obstructed }) => (
  <div 
    className="flex-shrink-0 bg-white border-r border-gray-200 shadow-xl h-full transition-transform duration-300 overflow-y-auto"
    style={{
      width: NOTE_WIDTH,
      position: 'sticky',
      left: index * 40, // The visible spine width
      zIndex: index,    // Ensures the next note covers this one
    }}
  >
    {/* 1. SPINE TITLE (Only visible when obstructed) 
        - hidden: by default
        - block: when obstructed
    */}
    <div 
      className={`absolute top-0 left-0 bottom-0 w-[40px] z-20 flex flex-col items-center pt-4 ${
        obstructed ? 'block' : 'hidden'
      }`}
    >
      <Link 
        to={slug} 
        className="transform -rotate-90 origin-bottom-left translate-y-[900px] translate-x-[210px] text-xl font-bold text-gray-200 no-underline"
        style={{ width: '400px' }} // Ensure text doesn't wrap
      >
        {title || slug}
      </Link>
    </div>

    {/* 2. MAIN CONTENT 
        - We removed opacity-0/opacity-100 logic.
        - When 'obstructed' is true, this content is simply covered 
          by the white background of the NEXT note in the stack.
    */}
    <div className="p-12">
      <div className="prose prose-lg text-gray-700 max-w-none">
        <MDXProvider components={{ a: MdxLink }}>
          {children}
        </MDXProvider>
      </div>
    </div>
    
    {/* 3. CLICK OVERLAY 
        - Allows clicking the spine to focus the note 
    */}
    {obstructed && (
      <Link 
        to={slug}
        className="absolute inset-0 z-10 cursor-pointer"
        aria-label={`Focus on ${title}`}
      />
    )}
  </div>
);

export default function GardenInterface() {
  const { stack } = useStack();

  return (
    <div className="flex flex-row h-screen w-full overflow-x-auto bg-gray-100">
      {stack.map((item, index) => {
        const isObstructed = index < stack.length - 1;
        
        // Simple title cleanup
        const cleanTitle = item.path === '/' ? 'Home' : item.path.replace(/^\//, '').replace(/-/g, ' ');

        return (
          <NoteIndexContext.Provider value={index} key={item.path}>
            <NoteCard 
              index={index} 
              title={cleanTitle} 
              slug={item.path}
              obstructed={isObstructed}
            >
              {item.component}
            </NoteCard>
          </NoteIndexContext.Provider>
        );
      })}
      
      {/* Spacer for scrolling */}
      <div className="flex-shrink-0 w-96" />
    </div>
  );
}
