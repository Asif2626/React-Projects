import { createContext, useContext, useEffect, useState } from "react";

// URL
const BASE_URL = `http://localhost:8000`;

// 1. Create context
const CitiesContext = createContext();

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  // Fetch all cities on mount
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was an error loading cities...");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  // Fetch single city by ID
  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch {
      alert("There was an error loading city data...");
    } finally {
      setIsLoading(false);
    }
  }

  // Create a new city
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      // Update cities state with newly added city
      setCities((prevCities) => [...prevCities, data]);
    } catch (err) {
      alert("There was an error creating the city...");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

// Custom hook to use the Cities context
function useCities() {
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("useCities must be used within a CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
