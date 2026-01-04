import React, { useEffect } from 'react';
import { StackProvider, useStack } from '../context/stack_context';
import { ThemeProvider } from '../context/theme_context';
import GardenInterface from '../components/garden_interface';
import '../styles/global.css';

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

  return <GardenInterface />;
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
