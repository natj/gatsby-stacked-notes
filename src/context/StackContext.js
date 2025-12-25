import React, { createContext, useContext, useState, useRef } from 'react';

const StackContext = createContext();
export const NoteIndexContext = createContext(-1);

export const StackProvider = ({ children }) => {
  const [stack, setStack] = useState([]);
  const sourceIndexRef = useRef(null);
  const currentPathRef = useRef(null);

  const setSourceIndex = (index) => {
    sourceIndexRef.current = index;
  };

  const updateStack = (path, pageComponent) => {
    // --- GUARD CLAUSE ---
    // We block updates to prevent React Strict Mode from double-firing.
    // BUT: We must allow the update if 'sourceIndexRef' is set.
    // This handles the specific case: [A, B, C] -> Click 'C' from 'A'.
    // The path is already 'C', but we MUST process the cut.
    const isSamePath = path === currentPathRef.current;
    const isExplicitClick = sourceIndexRef.current !== null;

    if (isSamePath && !isExplicitClick) {
      return;
    }
    
    currentPathRef.current = path;
    
    // Capture and reset source index
    const sourceIndex = sourceIndexRef.current;
    sourceIndexRef.current = null;

    setStack((prevStack) => {
      // SCENARIO 1: BRANCHING (User clicked a link explicitly)
      // We prioritize this over everything else. 
      // If we clicked from Note #0, we cut everything after #0, then add the new note.
      if (sourceIndex !== null) {
        const newStack = prevStack.slice(0, sourceIndex + 1);
        return [...newStack, { path, component: pageComponent }];
      }

      // SCENARIO 2: HISTORY / BACK BUTTON
      // Find the last occurrence of this note to determine where to cut.
      // We use [...arr].reverse() to find the LAST index (like lastIndexOf).
      const reversedIndex = [...prevStack].reverse().findIndex(item => item.path === path);
      
      if (reversedIndex !== -1) {
        // Calculate true index from the start
        const existingIndex = prevStack.length - 1 - reversedIndex;
        // Focus on that note (remove everything to the right)
        return prevStack.slice(0, existingIndex + 1);
      }

      // SCENARIO 3: FRESH NOTE
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
