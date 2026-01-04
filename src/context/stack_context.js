import React, { createContext, useContext, useState, useRef } from 'react';
import { withPrefix } from 'gatsby'; 

// Context allows sharing data globally without passing props down through every component.
const StackContext = createContext();
export const NoteIndexContext = createContext(-1);

// Provider component wraps the app to expose 'stack' state to all children.
export const StackProvider = ({ children }) => {
  // useState: Creates reactive state 'stack' and a setter 'set_stack'.
  // Re-renders components using this context when state changes.
  const [stack, set_stack] = useState([]);

  // useRef: Persists values between renders without triggering re-renders.
  const source_idx_ref = useRef(null);
  const cur_path_ref = useRef(null);

  const set_source_idx = (idx) => {
    source_idx_ref.current = idx;
  };

  const update_stack = (raw_path, page_comp, title) => {
    // --- 1. CLEAN THE PATH ---
    // Remove Gatsby's production prefix to normalize note paths.
    let path = raw_path;
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
    // Prevent double-fires (common in React Strict Mode) from adding duplicates.
    const is_same_path = path === cur_path_ref.current;
    const is_explicit_click = source_idx_ref.current !== null;

    if (is_same_path && !is_explicit_click) {
      return;
    }
    
    cur_path_ref.current = path;
    const source_idx = source_idx_ref.current;
    source_idx_ref.current = null;

    // Updates state based on previous state to ensure accuracy.
    set_stack((prev_stack) => {
      // SCENARIO 1: BRANCHING
      // If clicked from a note (source_idx set), discard all subsequent notes (branch off).
      if (source_idx !== null) {
        const new_stack = prev_stack.slice(0, source_idx + 1);
        return [...new_stack, { path, component: page_comp, title }];
      }

      // SCENARIO 2: HISTORY / BACK BUTTON
      // If note exists in history, revert stack to that point.
      const rev_idx = [...prev_stack].reverse().findIndex(item => item.path === path);
      if (rev_idx !== -1) {
        const exist_idx = prev_stack.length - 1 - rev_idx;
        return prev_stack.slice(0, exist_idx + 1);
      }

      // SCENARIO 3: FRESH NOTE
      // Append new note to the stack.
      return [...prev_stack, { path, component: page_comp, title }];
    });
  };

  return (
    <StackContext.Provider value={{ stack, update_stack, set_source_idx }}>
      {children}
    </StackContext.Provider>
  );
};

// Custom hooks to consume context values in components.
export const useStack = () => useContext(StackContext);
export const useNoteIndex = () => useContext(NoteIndexContext);
