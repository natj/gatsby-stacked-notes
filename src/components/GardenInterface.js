import React from 'react';
import { useStack, NoteIndexContext } from '../context/StackContext';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from './MdxLink';
import { Link } from 'gatsby';
import useWindowWidth from '../hooks/useWindowWidth'; // <--- Import the hook
import ThemeToggle from './ThemeToggle'; // <--- IMPORT BUTTON

// A "component" is a reusable piece of UI. This is the NoteCard component.
// It receives "props" (properties) like children, index, title, etc.
// These props are used to customize the component's output.
// The syntax used here is JSX, which looks like HTML but is actually JavaScript.
const NoteCard = ({ children, index, title, slug, isStacked, isMobile }) => (
  // The "className" is similar to HTML's "class" attribute, used for styling.
  <div 
    className="note-card"
    // The "style" prop allows for inline CSS styling.
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
    {/* This is a conditional rendering. The part inside the parentheses will only be rendered if !isMobile is true. */}
    {!isMobile && (
      <div className={`note-spine ${isStacked ? 'visible' : ''}`}>
        {/* The "Link" component is from Gatsby and is used for internal navigation. */}
        <Link to={slug} className="spine-text">
          {title || slug}
        </Link>
      </div>
    )}

    {/* CONTENT */}
    <div className="note-content">
      <div className="prose max-w-none">
        {/* MDXProvider allows us to specify how markdown elements are rendered. */}
        {/* Here, we are saying that all `<a>` tags in the MDX content should be rendered using our custom MdxLink component. */}
        <MDXProvider components={{ a: MdxLink }}>
          {/* "children" is a special prop that contains whatever is passed between the opening and closing tags of this component. */}
          {children}
        </MDXProvider>
      </div>
    </div>
  </div>
);

// This is the main component for the garden interface.
export default function GardenInterface() {
  // "hooks" are special functions that let you "hook into" React features.
  // "useStack" is a custom hook that provides the "stack" of notes.
  const { stack } = useStack();
  // "useWindowWidth" is another custom hook that returns the current window width.
  const width = useWindowWidth();
  // Based on the window width, we determine if the view is mobile.
  const isMobile = width <= 768;

  // If there are no notes in the stack, we render nothing.
  if (!stack || stack.length === 0) return null;

  // On mobile, we only want to show the latest note. On desktop, we show all notes in the stack.
  const notesToShow = isMobile ? [stack[stack.length - 1]] : stack;

  return (
    <div className="garden-layout relative"> {/* Added relative for positioning context if needed */}
      
      {/* This is the theme toggle button component. */}
      <ThemeToggle />

      {/* We are "mapping" over the notesToShow array. For each item in the array, we render a NoteCard component. */}
      {notesToShow.map((item, i) => {
        // ... (existing mapping logic) ...
        const realIndex = isMobile ? stack.length - 1 : i;
        const isStacked = !isMobile && realIndex < stack.length - 1;
        const cleanTitle = item.path === '/' ? 'Home' : item.path.replace(/^\//, '').replace(/-/g, ' ');

        return (
          // NoteIndexContext.Provider provides the "realIndex" value to all components inside it.
          <NoteIndexContext.Provider value={realIndex} key={item.path}>
             {/* We are rendering the NoteCard component with the necessary props. */}
             <NoteCard 
              index={realIndex} 
              title={cleanTitle} 
              slug={item.path}
              isStacked={isStacked}
              isMobile={isMobile}
            >
              {/* The "item.component" is the actual content of the note. */}
              {item.component}
            </NoteCard>
          </NoteIndexContext.Provider>
        );
      })}
      
      {/* This is a spacer div that is only shown on desktop. */}
      {!isMobile && <div className="flex-shrink-0 w-96" />}
    </div>
  );
}
