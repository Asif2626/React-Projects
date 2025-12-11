import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <h1 className="title">Date Counter App</h1>
      <Counter />
    </div>
  );
}

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const date = new Date("Decmber 10 2025");
  date.setDate(date.getDate() + count);
  return (
    <div className="counter-container">
      <div className="step-controls">
        <button onClick={() => setStep((c) => c - 1)}>-</button>
        <span className="step-text">Step:{step}</span>
        <button onClick={() => setStep((c) => c + 1)}>+</button>
      </div>
      <div className="count-controls">
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <span className="count-text">Count:{count}</span>
        <button onClick={() => setCount((c) => c + step)}>+</button>
      </div>
      <p className="result-text">
        <span className="result-text">
          {count === 0
            ? `Today is `
            : count > 0
            ? `${count} days from today is `
            : `${Math.abs(count)} days ago was `}
        </span>
        <span className="date">{date.toDateString()}</span>
      </p>
    </div>
  );
}
