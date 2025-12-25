import React, { createContext, useContext, useState } from 'react';

const StackContext = createContext();

export const StackProvider = ({ children }) => {
  const [stack, setStack] = useState([]);

  // This function is called by Layout whenever Gatsby navigates to a new page
  const updateStack = (path, pageComponent) => {
    setStack((prevStack) => {
      // 1. Check if this page is already active
      const existingIndex = prevStack.findIndex(item => item.path === path);
      
      if (existingIndex !== -1) {
        // If clicking a link to a page already open on the left, 
        // cut the stack to show that page as the active "end"
        return prevStack.slice(0, existingIndex + 1);
      }

      // 2. If it's a new page, add it to the end
      // (Optional: Limit stack size to 5 to prevent memory leaks)
      return [...prevStack, { path, component: pageComponent }];
    });
  };

  return (
    <StackContext.Provider value={{ stack, updateStack }}>
      {children}
    </StackContext.Provider>
  );
};

export const useStack = () => useContext(StackContext);
