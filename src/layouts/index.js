import React, { useEffect } from 'react';
import { StackProvider, use_stack } from '../context/stack_context';
import { ThemeProvider } from '../context/theme_context';
import GardenInterface from '../components/garden_interface';
import '../styles/global.css';

// Syncs page changes with StackContext.
const StackHandler = ({ location, children }) => {
  const { update_stack } = use_stack();

  // Extract title from MDX data if available.
  let title = null;
  if (children && children.props && children.props.data && children.props.data.mdx) {
    title = children.props.data.mdx.frontmatter.title;
  }

  useEffect(() => {
    update_stack(location.pathname, children, title);
  }, [location.pathname, children, update_stack, title]);

  return <GardenInterface />;
};

// Global layout wrapping every page.
export default function Layout({ children, location }) {
  return (
    // Wrap app with theme and stack providers.
    <ThemeProvider>
      <StackProvider>
        <StackHandler location={location}>
          {children}
        </StackHandler>
      </StackProvider>
    </ThemeProvider>
  );
}
