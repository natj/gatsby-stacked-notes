import React from 'react';
import { useTheme } from '../context/ThemeContext';

// This is the ThemeToggle component. It renders a button that allows the user to switch between light and dark themes.
const ThemeToggle = () => {
  // "useTheme" is a custom hook that provides the current "theme" and a "toggleTheme" function from our ThemeContext.
  const { theme, toggleTheme } = useTheme();

  // We return a button element.
  return (
    <button
      // The "onClick" event handler is a function that gets called when the user clicks the button.
      // In this case, it calls the "toggleTheme" function to switch the theme.
      onClick={toggleTheme}
      aria-label="Toggle Dark Mode"
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white dark:bg-gray-800 shadow-lg border border-gray-200 dark:border-gray-700 transition-colors duration-200"
      // The "title" attribute provides extra information when the user hovers over the button.
      title={theme === 'light' ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {/* This is a conditional rendering. If the theme is 'light', we show the moon icon. Otherwise, we show the sun icon. */}
      {theme === 'light' ? (
        // MOON ICON (SVG - Scalable Vector Graphics)
        <svg 
          className="w-5 h-5 text-gray-800" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      ) : (
        // SUN ICON (SVG)
        <svg 
          className="w-5 h-5 text-yellow-400" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
