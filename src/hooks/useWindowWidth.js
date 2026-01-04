import { useState, useEffect } from 'react';

// This is a helper function to get the window width.
// It checks if 'window' is defined. 'window' is a global object in browsers, but it doesn't exist in server-side environments.
// This prevents errors when the code is run on a server (e.g., during the Gatsby build process).
const getWindowWidth = () => {
  return typeof window === 'undefined' ? 0 : window.innerWidth;
};

// This is a "custom hook". Custom hooks are a way to reuse stateful logic between components.
// Their names always start with "use".
// This hook, `useWindowWidth`, will provide the current width of the browser window to any component that uses it.
export default function useWindowWidth() {
  // "useState" is a React hook that lets you add state to a component.
  // "width" is our state variable, and "setWidth" is the function to update it.
  // We initialize the width with the current window width.
  const [width, setWidth] = useState(getWindowWidth());

  // "useEffect" is a hook that lets you perform "side effects" in your components.
  // Here, we're using it to listen for changes in the window size.
  useEffect(() => {
    // This function will be called whenever the window is resized.
    function handleResize() {
      // It updates the 'width' state with the new window width.
      setWidth(getWindowWidth());
    }

    // We add an "event listener" to the window. This tells the browser to call our 'handleResize' function whenever the 'resize' event occurs.
    window.addEventListener('resize', handleResize);
    
    // The function returned by useEffect is a "cleanup" function.
    // React will run this function when the component is "unmounted" (removed from the screen).
    // This is important to prevent memory leaks by removing the event listener when it's no longer needed.
    return () => window.removeEventListener('resize', handleResize);
  }, []); // The empty array means this effect runs only once when the component mounts.

  // The hook returns the current width.
  return width;
}
