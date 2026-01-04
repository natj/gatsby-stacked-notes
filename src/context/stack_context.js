import React, { createContext, useContext, useState, useRef } from 'react';
import { withPrefix } from 'gatsby'; 

// Context for stack state and note index.
const StackContext = createContext();
export const NoteIndexContext = createContext(-1);

// Provider component for stack data.
export const StackProvider = ({ children }) => {
  const [stack, set_stack] = useState([]);
  const source_idx_ref = useRef(null);
  const cur_path_ref = useRef(null);

  const set_source_idx = (idx) => {
    source_idx_ref.current = idx;
  };

  const update_stack = (raw_path, page_comp) => {
    // --- 1. CLEAN THE PATH ---
    // Remove prefix for actual note path.
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
    // Prevent duplicate additions.
    const is_same_path = path === cur_path_ref.current;
    const is_explicit_click = source_idx_ref.current !== null;

    if (is_same_path && !is_explicit_click) {
      return;
    }
    
    cur_path_ref.current = path;
    const source_idx = source_idx_ref.current;
    source_idx_ref.current = null;

    set_stack((prev_stack) => {
      // SCENARIO 1: BRANCHING
      // Remove subsequent notes if source index is set.
      if (source_idx !== null) {
        const new_stack = prev_stack.slice(0, source_idx + 1);
        return [...new_stack, { path, component: page_comp }];
      }

      // SCENARIO 2: HISTORY / BACK BUTTON
      // Truncate stack if note already exists.
      const rev_idx = [...prev_stack].reverse().findIndex(item => item.path === path);
      if (rev_idx !== -1) {
        const exist_idx = prev_stack.length - 1 - rev_idx;
        return prev_stack.slice(0, exist_idx + 1);
      }

      // SCENARIO 3: FRESH NOTE
      // Add new note to stack end.
      return [...prev_stack, { path, component: page_comp }];
    });
  };

  return (
    <StackContext.Provider value={{ stack, update_stack, set_source_idx }}>
      {children}
    </StackContext.Provider>
  );
};

// Hooks to access context.
export const use_stack = () => useContext(StackContext);
export const use_note_idx = () => useContext(NoteIndexContext);
