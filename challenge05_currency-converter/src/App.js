import React, { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import "./App.css";
// calculator
const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCur, setFromCur] = useState("EUR");
  const [toCur, setToCur] = useState("USD");
  const [converted, setConverted] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const debouncedAmount = useDebounce(amount, 500);

  useEffect(() => {
    if (!debouncedAmount) return;

    if (fromCur === toCur) {
      setConverted(debouncedAmount);
      return;
    }

    const convert = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${debouncedAmount}&from=${fromCur}&to=${toCur}`
        );
        const data = await res.json();
        setConverted(data.rates[toCur]);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    convert();
  }, [debouncedAmount, fromCur, toCur]);

  return (
    <div className="container">
      <h1>Currency Converter</h1>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
        disabled={isLoading}
        placeholder="Amount"
      />

      <select
        value={fromCur}
        onChange={(e) => setFromCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <select
        value={toCur}
        onChange={(e) => setToCur(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>

      <p>{isLoading ? "Converting..." : `${converted} ${toCur}`}</p>
    </div>
  );
};

export default App;
