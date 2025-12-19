import { useEffect } from "react";

export function useKey(key, action) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code.toLowerCase() === key.toLowerCase()) {
        action();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    // Cleanup when component unmounts
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [action, key]);
}
