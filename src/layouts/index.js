import React, { useEffect } from 'react';
import { StackProvider, useStack } from '../context/stack_context';
import { ThemeProvider } from '../context/theme_context';
import GardenInterface from '../components/garden_interface';
import '../styles/global.css';
import { MDXProvider } from "@mdx-js/react";
import MdxLink from '../components/mdx_link';
import NoteHeader from '../components/partials/NoteHeader.mdx';
import ThemeToggle from '../components/theme_toggle';

// Component responsible for syncing URL changes with our custom stack logic.
const StackHandler = ({ location, children }) => {
  const { update_stack } = useStack();

  // Extract 'title' from MDX data if it exists in the child component's props.
  let title = null;
  if (children && children.props && children.props.data && children.props.data.mdx) {
    title = children.props.data.mdx.frontmatter.title;
  }

  // useEffect: Runs logic after rendering.
  // Dependencies [location.pathname...]: Re-runs this effect only when the URL or content changes.
  useEffect(() => {
    update_stack(location.pathname, children, title);
  }, [location.pathname, children, update_stack, title]);

  return (
    <div className="app-container">
      {/* Global Header */}
      <header className="global-header">
        <div className="prose max-w-none">
          <MDXProvider components={{ a: MdxLink }}>
            <NoteHeader />
          </MDXProvider>
        </div>
        <ThemeToggle />
      </header>

      {/* Main Garden Area - Takes remaining height */}
      <div className="garden-wrapper">
        <GardenInterface />
      </div>
    </div>
  );
};

// Layout Component: Gatsby wraps every page with this component.
// It serves as the root for global styles and context providers.
export default function Layout({ children, location }) {
  return (
    // Providers: Wrap the app to give all components access to 'theme' and 'stack' state.
    <ThemeProvider>
      <StackProvider>
        <StackHandler location={location}>
          {children}
        </StackHandler>
      </StackProvider>
    </ThemeProvider>
  );
}
