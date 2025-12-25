import React from 'react';
import { StackProvider } from '../context/StackContext';
import '../styles/global.css';

// Simple stack implementation for the README
export default function Layout({ children }) {
  return (
    <StackProvider>
      <div className="flex flex-row h-screen w-full overflow-x-auto bg-gray-50 px-4 py-4 gap-4">
        {/* In a real stack, previous pages would be rendered here */}
        <div className="w-[600px] flex-shrink-0 bg-white shadow-lg rounded-xl p-8 overflow-y-auto border border-gray-200">
           {children}
        </div>
        
        {/* Placeholder for where the "Next" pages would slide in */}
        <div className="w-12 flex-shrink-0"></div>
      </div>
    </StackProvider>
  );
}
