import React, { createContext, useContext, useState } from 'react';

const LayoutContext = createContext();

export const LayoutProvider = ({ children }) => {
  // For example, managing current layout state
  const [currentLayout, setCurrentLayout] = useState({ name: 'auth-branded' });

  return (
    <LayoutContext.Provider value={{ currentLayout, setCurrentLayout }}>
      {children}
    </LayoutContext.Provider>
  );
};

// Custom hook to use the layout context easily
export const useLayout = () => {
  const context = useContext(LayoutContext);
  if (!context) {
    throw new Error('useLayout must be used within a LayoutProvider');
  }
  return context;
};
