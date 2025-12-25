import { createContext, useContext, useEffect, useState } from "react";

// 1. create context
const CitiesContext = createContext();

const BASE_URL = `http://localhost:8000`;

const CitiesProvider = ({ children }) => {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (err) {
        alert("There was an Error Loading Data...");
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert("There was an Error Loading Data...");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/`, {
        method: "POST",
        body: "JSON.stringify(newCity)",
        headers: { "Context-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
    } catch (err) {
      alert("There was an Error Loading Data...");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    // 2. Provider with value
    <CitiesContext.Provider
      value={{ cities, isLoading, currentCity, getCity, createCity }}
    >
      {children}
    </CitiesContext.Provider>
  );
};

function useCities() {
  // 3. consume context
  const context = useContext(CitiesContext);
  if (!context)
    throw new Error("CitiesContext was used outside of the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
