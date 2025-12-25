import React, { useEffect } from 'react';
import { StackProvider, useStack } from '../context/StackContext';
import GardenInterface from '../components/GardenInterface';
import '../styles/global.css';

// Internal component to handle the logic hooks
const StackHandler = ({ location, children }) => {
  const { updateStack } = useStack();

  useEffect(() => {
    // Whenever the location changes, push the new 'children' (the page content) to the stack
    updateStack(location.pathname, children);
  }, [location.pathname, children, updateStack]);

  return <GardenInterface />;
};

export default function Layout({ children, location }) {
  return (
    <StackProvider>
      <StackHandler location={location}>
        {children}
      </StackHandler>
    </StackProvider>
  );
}
