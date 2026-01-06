import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define the shape of the theme context.
interface ThemeContextType {
  theme: string | null;
  toggle_theme: () => void;
}

// Shared state for application theme (light/dark).
// Default values provided to prevent destructuring errors.
const ThemeContext = createContext<ThemeContextType>({ 
  theme: 'light', 
  toggle_theme: () => {} 
});

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [theme, set_theme] = useState<string | null>(null); 

  // useEffect: Runs side-effects (DOM access, APIs) after rendering.
  // Empty dependency array [] means this runs only once on mount.
  useEffect(() => {
    // Check local storage or system preferences.
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

  // Dependency array [theme]: Runs this effect whenever 'theme' state changes.
  useEffect(() => {
    if (!theme) return;
    
    // Direct DOM manipulation to set CSS variable/attribute for styling.
    document.documentElement.setAttribute('data-theme', theme);
    // Persist choice to browser storage.
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggle_theme = () => {
    set_theme((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  // Prevent flash of unstyled content by waiting for theme determination.
  if (!theme) return <div style={{ visibility: 'hidden' }}>{children}</div>;

  return (
    <ThemeContext.Provider value={{ theme, toggle_theme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook to consume the theme state.
export const useTheme = () => useContext(ThemeContext);