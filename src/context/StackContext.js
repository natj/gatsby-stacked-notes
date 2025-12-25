import React, { createContext, useContext, useState, useEffect } from 'react';

const StackContext = createContext();

export const StackProvider = ({ children }) => {
  const [stack, setStack] = useState([]);

  // Initialize stack with current URL on load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Default to home "/" if path is empty
      const current = window.location.pathname === '/' ? '/home' : window.location.pathname;
      setStack([current]);
    }
  }, []);

  const openNote = (slug) => {
    // If user clicks a note already in stack, close everything to its right
    // If new, append to end
    setStack((prev) => {
      const index = prev.indexOf(slug);
      return index !== -1 ? prev.slice(0, index + 1) : [...prev, slug];
    });
    
    // Update browser URL without reload
    window.history.pushState({}, '', slug);
  };

  return (
    <StackContext.Provider value={{ stack, openNote }}>
      {children}
    </StackContext.Provider>
  );
};

export const useStack = () => useContext(StackContext);
