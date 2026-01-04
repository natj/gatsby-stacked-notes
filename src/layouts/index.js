import React, { useEffect } from 'react';
import { StackProvider, useStack } from '../context/StackContext';
import { ThemeProvider } from '../context/ThemeContext'; // <--- IMPORT
import GardenInterface from '../components/GardenInterface';
import '../styles/global.css';

// This is a special component that receives the page's location and content (children).
// It's responsible for telling the StackContext when the page changes.
const StackHandler = ({ location, children }) => {
  // We get the 'updateStack' function from our StackContext using the useStack hook.
  const { updateStack } = useStack();

  // We try to get the 'title' of the page from its data.
  // This data is passed by Gatsby to page components.
  let title = null;
  if (children && children.props && children.props.data && children.props.data.mdx) {
    title = children.props.data.mdx.frontmatter.title;
  }

  // The 'useEffect' hook is called whenever the values in its dependency array change.
  // Here, whenever the URL path ('location.pathname') changes, we call 'updateStack'.
  useEffect(() => {
    // We pass the current path, the page content (children), and the title to our stack.
    updateStack(location.pathname, children, title);
  }, [location.pathname, children, updateStack, title]); // The dependency array.

  // This component renders the main GardenInterface, which displays the notes.
  return <GardenInterface />;
};

// In Gatsby, a "layout" component is a component that wraps around every page.
// It's a great place to put shared UI elements, like headers, footers, and context providers.
export default function Layout({ children, location }) {
  // 'children' here will be the actual page content (e.g., a blog post).
  // 'location' is an object provided by Gatsby with information about the current URL.
  return (
    // We wrap our entire application with the ThemeProvider and StackProvider.
    // This makes the theme and stack "contexts" available to every component in the application.
    // "Providers" are the components that provide the data.
    <ThemeProvider>
      <StackProvider>
        {/* The StackHandler is inside the providers, so it can access their data. */}
        <StackHandler location={location}>
          {/* We pass the page content down to the StackHandler. */}
          {children}
        </StackHandler>
      </StackProvider>
    </ThemeProvider>
  );
}
