// src/app/context/aspectsContext.ts
"use client";
import { createContext, useContext, useState, useMemo, ReactNode } from "react";

// Define the shape of an Aspect
export interface Aspect {
  id: string; // Unique identifier
  title: string;
}

// Define the shape of the Context
interface AspectsContextType {
  aspects: Aspect[];
  addAspect: (aspect: Aspect) => void;
  removeAspect: (id: string) => void;
  AllAspects: string[];
}

// Create the Context with undefined as the default value
const AspectsContext = createContext<AspectsContextType | undefined>(undefined);

// Provider component
export const AspectsProvider = ({ children }: { children: ReactNode }) => {
  const [aspects, setAspects] = useState<Aspect[]>([]);
  const [AllAspects, setAllAspects] = useState<string[]>([
    "Readability",
    "Reusability",
    "Maintainability",
    "Performance",
    "Security",
    "Testability",
    "Scalability",
    "Documentation",
    "Error Handling",
    "Code Quality",
    "Best Practices",
    "Accessibility",
  ]);

  // Add a new aspect, preventing duplicates by id
  const addAspect = (aspect: Aspect) => {
    if (aspects.some((a) => a.id === aspect.id)) {
      console.warn(`Aspect with id ${aspect.id} already exists`);
      return;
    }
    setAspects((prev) => [...prev, aspect]);
  };

  // Remove an aspect by id
  const removeAspect = (id: string) => {
    setAspects((prev) => prev.filter((a) => a.id !== id));
  };

  // Memoize the context value to prevent unnecessary re-renders
  const value = useMemo(
    () => ({
      aspects,
      addAspect,
      removeAspect,
      AllAspects,
    }),
    [aspects]
  );

  return (
    <AspectsContext.Provider value={value}>{children}</AspectsContext.Provider>
  );
};

// Custom hook to access the Context
export const useAspects = (): AspectsContextType => {
  const context = useContext(AspectsContext);
  if (!context) {
    throw new Error("useAspects must be used within an AspectsProvider");
  }
  return context;
};
