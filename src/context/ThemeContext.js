import React, { createContext, useContext, useState, useEffect } from 'react';

// "Context" is a way to pass data through the component tree without having to pass props down manually at every level.
// We are creating a "ThemeContext" to hold the state of our application's theme (light or dark).
const ThemeContext = createContext();

// The "ThemeProvider" is a component that will wrap our application and provide the theme data to all components inside it.
export const ThemeProvider = ({ children }) => {
  // "useState" is a React hook that lets you add state to a component.
  // "theme" is our state variable, and "setTheme" is the function to update it.
  // We initialize it to "null" to prevent a "flash of wrong theme" when the page first loads.
  const [theme, setTheme] = useState(null); 

  // "useEffect" is a hook that lets you perform "side effects" in your components.
  // This first useEffect runs only once when the component is first rendered (thanks to the empty dependency array []).
  useEffect(() => {
    // We check if a theme is saved in the browser's localStorage.
    const savedTheme = window.localStorage.getItem('theme');
    // We check if the user's operating system is set to dark mode.
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme) {
      // If a theme is saved, we use that.
      setTheme(savedTheme);
    } else if (systemPrefersDark) {
      // Otherwise, if the system prefers dark mode, we use that.
      setTheme('dark');
    } else {
      // Otherwise, we default to 'light'.
      setTheme('light');
    }
  }, []); // The empty array means this effect runs only once.

  // This second useEffect runs whenever the "theme" state changes.
  useEffect(() => {
    if (!theme) return; // Don't do anything if the theme hasn't been determined yet.
    
    // We set a 'data-theme' attribute on the main HTML element. CSS can use this to change colors.
    document.documentElement.setAttribute('data-theme', theme);
    // We save the current theme to localStorage so it persists between visits.
    window.localStorage.setItem('theme', theme);
  }, [theme]); // The [theme] array means this effect runs whenever 'theme' changes.

  // This function toggles the theme between 'light' and 'dark'.
  const toggleTheme = () => {
    setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // To prevent the "flash of wrong theme", we render the children invisibly until the theme is determined.
  if (!theme) return <div style={{ visibility: 'hidden' }}>{children}</div>;

  // The Provider component makes the "value" (the current theme and the toggle function) available to all child components.
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// This is a custom hook that makes it easier to use our context in other components.
// "useContext" is a hook that lets you read and subscribe to context from your component.
export const useTheme = () => useContext(ThemeContext);
