import React, { createContext, useContext, useState, useRef } from 'react';
import { withPrefix } from 'gatsby'; 

// "Context" is a way to pass data through the component tree without having to pass props down manually at every level.
// We are creating a "StackContext" to hold the state of our notes stack.
const StackContext = createContext();
// We are creating a "NoteIndexContext" to hold the index of a note.
export const NoteIndexContext = createContext(-1);

// The "StackProvider" is a component that will wrap our application and provide the stack data to all components inside it.
export const StackProvider = ({ children }) => {
  // "useState" is a React hook that lets you add state to a component.
  // "stack" is our state variable, and "setStack" is the function to update it. We initialize it as an empty array.
  const [stack, setStack] = useState([]);
  // "useRef" is a hook that lets you create a reference to a value that's not needed for rendering.
  // We use it to keep track of the index of the note that a link was clicked from.
  const sourceIndexRef = useRef(null);
  // We use another ref to keep track of the current path to prevent duplicate entries.
  const currentPathRef = useRef(null);

  // This function allows other components to set the source index.
  const setSourceIndex = (index) => {
    sourceIndexRef.current = index;
  };

  // This is the main function for updating the stack of notes.
  const updateStack = (rawPath, pageComponent) => {
    // --- 1. CLEAN THE PATH ---
    // Gatsby may add a path prefix in production builds (e.g., "/my-site").
    // We need to remove this prefix to get the actual path of the note (e.g., "/my-note").
    let path = rawPath;
    const prefix = withPrefix('/');

    if (prefix !== '/') {
      if (path.startsWith(prefix)) {
        path = path.slice(prefix.length);
        if (!path.startsWith('/')) {
          path = '/' + path;
        }
      } 
      else if (path === prefix.slice(0, -1)) {
        path = "/";
      }
    }
    
    // --- 2. GUARD CLAUSE ---
    // This prevents adding the same note to the stack multiple times, for example, due to React's Strict Mode.
    const isSamePath = path === currentPathRef.current;
    const isExplicitClick = sourceIndexRef.current !== null;

    if (isSamePath && !isExplicitClick) {
      return;
    }
    
    currentPathRef.current = path;
    const sourceIndex = sourceIndexRef.current;
    sourceIndexRef.current = null; // Reset the ref after using it.

    // "setStack" can take a function as an argument. This function receives the previous state and returns the new state.
    setStack((prevStack) => {
      // SCENARIO 1: BRANCHING
      // If a sourceIndex is set, it means a link was clicked inside a note.
      // We "branch" off from that note by removing all notes after it in the stack.
      if (sourceIndex !== null) {
        const newStack = prevStack.slice(0, sourceIndex + 1);
        return [...newStack, { path, component: pageComponent }];
      }

      // SCENARIO 2: HISTORY / BACK BUTTON
      // If the user navigates using the browser's back/forward buttons, we check if the note already exists in the stack.
      const reversedIndex = [...prevStack].reverse().findIndex(item => item.path === path);
      if (reversedIndex !== -1) {
        // If it exists, we truncate the stack to that point.
        const existingIndex = prevStack.length - 1 - reversedIndex;
        return prevStack.slice(0, existingIndex + 1);
      }

      // SCENARIO 3: FRESH NOTE
      // If it's a new note, we simply add it to the end of the stack.
      return [...prevStack, { path, component: pageComponent }];
    });
  };

  // The Provider component makes the "value" available to all child components.
  return (
    <StackContext.Provider value={{ stack, updateStack, setSourceIndex }}>
      {children}
    </StackContext.Provider>
  );
};

// These are custom hooks that make it easier to use our context in other components.
// "useContext" is a hook that lets you read and subscribe to context from your component.
export const useStack = () => useContext(StackContext);
export const useNoteIndex = () => useContext(NoteIndexContext);
