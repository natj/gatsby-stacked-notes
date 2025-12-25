import React from 'react';
import { useStack } from '../context/StackContext';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from './MdxLink';

// The container for a single note
const NoteCard = ({ children, index, title }) => (
  <div 
    className="flex-shrink-0 w-[550px] bg-white border-r border-gray-200 shadow-xl h-full overflow-y-auto transition-all duration-300"
    style={{
      position: 'sticky',
      left: index * 40, // 40px visible spine for stacked notes
      zIndex: index,
    }}
  >
    <div className="p-12 min-h-screen">
      <div className="prose prose-lg text-gray-700">
        {/* We wrap every note in MDXProvider so links inside it work */}
        <MDXProvider components={{ a: MdxLink }}>
          {children}
        </MDXProvider>
      </div>
    </div>
  </div>
);

export default function GardenInterface() {
  const { stack } = useStack();

  return (
    <div className="flex flex-row h-screen w-full overflow-x-auto bg-gray-100 items-start">
      {stack.map((item, index) => (
        <NoteCard key={item.path} index={index} title={item.path}>
          {item.component}
        </NoteCard>
      ))}
      
      {/* Spacer to allow scrolling past the last card */}
      <div className="flex-shrink-0 w-96" />
    </div>
  );
}
