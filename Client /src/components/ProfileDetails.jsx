import React, { createContext, useState, useContext } from "react";

const SavedContext = createContext();

export const useSavedProperties = () => useContext(SavedContext);

export const SavedProvider = ({ children }) => {
  const [savedProperties, setSavedProperties] = useState([]);

  const toggleSaveProperty = (property) => {
    setSavedProperties((prev) => {
      // Assuming each property has a unique 'id'
      const isSaved = prev.some((p) => p.id === property.id); 
      
      if (isSaved) {
        return prev.filter((p) => p.id !== property.id); // Remove
      } else {
        return [...prev, property]; // Add
      }
    });
  };

  const isPropertySaved = (id) => {
    return savedProperties.some((p) => p.id === id);
  };

  return (
    <SavedContext.Provider value={{ savedProperties, toggleSaveProperty, isPropertySaved }}>
      {children}
    </SavedContext.Provider>
  );
};