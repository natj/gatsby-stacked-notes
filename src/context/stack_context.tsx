import React, { createContext, useContext, useState, useRef, ReactNode } from 'react';
import { withPrefix } from 'gatsby'; 

interface StackItem {
  path: string;
  component: ReactNode;
  title: string | null;
}

interface StackContextType {
  stack: StackItem[];
  update_stack: (raw_path: string, page_comp: ReactNode, title: string | null) => void;
  set_source_idx: (idx: number) => void;
  close_note: (idx_to_close: number) => void;
}

// Context allows sharing data globally without passing props down through every component.
const StackContext = createContext<StackContextType | undefined>(undefined);
export const NoteIndexContext = createContext<number>(-1);

interface StackProviderProps {
  children: ReactNode;
}

// Provider component wraps the app to expose 'stack' state to all children.
export const StackProvider: React.FC<StackProviderProps> = ({ children }) => {
  // useState: Creates reactive state 'stack' and a setter 'set_stack'.
  const [stack, set_stack] = useState<StackItem[]>([]);

  // useRef: Persists values between renders without triggering re-renders.
  const source_idx_ref = useRef<number | null>(null);
  const cur_path_ref = useRef<string | null>(null);

  const set_source_idx = (idx: number) => {
    source_idx_ref.current = idx;
  };

  const update_stack = (raw_path: string, page_comp: ReactNode, title: string | null) => {
    // --- 1. CLEAN THE PATH ---
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
      if (source_idx !== null) {
        const new_stack = prev_stack.slice(0, source_idx + 1);
        return [...new_stack, { path, component: page_comp, title }];
      }

      // SCENARIO 2: HISTORY / BACK BUTTON
      const rev_idx = [...prev_stack].reverse().findIndex(item => item.path === path);
      if (rev_idx !== -1) {
        const exist_idx = prev_stack.length - 1 - rev_idx;
        return prev_stack.slice(0, exist_idx + 1);
      }

      // SCENARIO 3: FRESH NOTE
      return [...prev_stack, { path, component: page_comp, title }];
    });
  };

  const close_note = (idx_to_close: number) => {
    set_stack((prev_stack) => {
      if (idx_to_close === 0 && prev_stack.length === 1) {
        return prev_stack;
      }
      return prev_stack.slice(0, idx_to_close);
    });
  };

  return (
    <StackContext.Provider value={{ stack, update_stack, set_source_idx, close_note }}>
      {children}
    </StackContext.Provider>
  );
};

// Custom hooks to consume context values in components.
export const useStack = () => {
  const context = useContext(StackContext);
  if (context === undefined) {
    throw new Error('useStack must be used within a StackProvider');
  }
  return context;
};

export const useNoteIndex = () => useContext(NoteIndexContext);