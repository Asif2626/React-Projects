import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DarkModeContext = createContext(undefined);

// Safe initial value helper
function getInitialDarkMode() {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function DarkModeProvider({ children }) {
  const [isDarkMode, setIsDarkMode] = useLocalStorageState(
    getInitialDarkMode(),
    "isDarkMode",
  );

  // Sync class with state
  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add("dark-mode");
      root.classList.remove("light-mode");
    } else {
      root.classList.add("light-mode");
      root.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  function toggleDarkMode() {
    setIsDarkMode((isDark) => !isDark);
  }

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

function useDarkMode() {
  const context = useContext(DarkModeContext);

  if (context === undefined)
    throw new Error("useDarkMode must be used within DarkModeProvider");

  return context;
}

export { DarkModeProvider, useDarkMode };
