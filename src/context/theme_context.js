import React, { createContext, useContext, useState, useEffect } from 'react';

// Context for application theme.
const ThemeContext = createContext();

// Provider for theme data.
export const ThemeProvider = ({ children }) => {
  const [theme, set_theme] = useState(null); 

  // Check localStorage or System Preference on mount.
  useEffect(() => {
    const saved_theme = window.localStorage.getItem('theme');
    const is_dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (saved_theme) {
      set_theme(saved_theme);
    } else if (is_dark) {
      set_theme('dark');
    } else {
      set_theme('light');
    }
  }, []);

  // Update CSS attribute and LocalStorage on change.
  useEffect(() => {
    if (!theme) return;
    
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle_theme = () => {
    set_theme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Render children invisibly until theme is determined to prevent flash.
  if (!theme) return <div style={{ visibility: 'hidden' }}>{children}</div>;

  return (
    <ThemeContext.Provider value={{ theme, toggle_theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to access theme context.
export const use_theme = () => useContext(ThemeContext);
