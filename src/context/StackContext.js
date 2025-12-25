import React, { createContext, useContext, useState, useRef } from 'react';

const StackContext = createContext();
// Default to -1 so we know if a component is outside the stack
export const NoteIndexContext = createContext(-1);

export const StackProvider = ({ children }) => {
  const [stack, setStack] = useState([]);
  
  // 1. Tracks where the click came from (Index 0, 1, 2...)
  const sourceIndexRef = useRef(null);
  
  // 2. Tracks the last processed URL to prevent React Strict Mode double-firing
  const currentPathRef = useRef(null);

  const setSourceIndex = (index) => {
    sourceIndexRef.current = index;
  };

  const updateStack = (path, pageComponent) => {
    // --- STRICT MODE FIX START ---
    // If this function fires twice for the exact same path, ignore the second run.
    if (path === currentPathRef.current) {
      return; 
    }
    currentPathRef.current = path;
    // --- STRICT MODE FIX END ---

    // Now it is safe to consume the ref
    const sourceIndex = sourceIndexRef.current;
    sourceIndexRef.current = null; // Reset for next time

    setStack((prevStack) => {
      // SCENARIO A: BRANCHING (Clicking a link)
      // If we know exactly which note (index) triggered this, trust it.
      if (sourceIndex !== null) {
        // Cut the stack immediately after the source note.
        // If source is 0 (First Note), slice(0, 1) keeps just the first note.
        const newStack = prevStack.slice(0, sourceIndex + 1);
        return [...newStack, { path, component: pageComponent }];
      }

      // SCENARIO B: BACK BUTTON / HISTORY TRAVERSAL
      // We don't have a source index, so we check if this page exists in history.
      // We look for the LAST occurrence to handle cycles like A -> B -> A.
      // (Using reverse() to simulate lastIndexOf for wider compatibility)
      const reversedIndex = [...prevStack].reverse().findIndex(item => item.path === path);
      
      if (reversedIndex !== -1) {
        // Calculate the actual index from the start
        const existingIndex = prevStack.length - 1 - reversedIndex;
        
        // "Focus" that note by removing everything after it
        return prevStack.slice(0, existingIndex + 1);
      }

      // SCENARIO C: FRESH PAGE
      // Not in stack, no source index? Append to the end.
      return [...prevStack, { path, component: pageComponent }];
    });
  };

  return (
    <StackContext.Provider value={{ stack, updateStack, setSourceIndex }}>
      {children}
    </StackContext.Provider>
  );
};

export const useStack = () => useContext(StackContext);
export const useNoteIndex = () => useContext(NoteIndexContext);
