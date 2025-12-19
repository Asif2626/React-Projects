import { useState } from "react";
import "./App.css";

const App_v2 = () => {
  return (
    <div className="app-container">
      <h1 className="title">Date Counter App</h1>
      <Counter />
    </div>
  );
};

export default App_v2;

function Counter() {
  const [count, setCount] = useState(0);
  const [step, setStep] = useState(1);
  const date = new Date("Decmber 10 2025");
  date.setDate(date.getDate() + count);
  function handleReset() {
    setCount(0);
    setStep(1);
  }
  return (
    <div className="counter-container">
      <div className="step-controls">
        <input
          type="range"
          min="0"
          max="10"
          value={step}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <span className="step-text">{step}</span>
      </div>
      <div className="count-controls">
        <button onClick={() => setCount((c) => c - step)}>-</button>
        <input
          type="text"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
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
      {count !== 0 || step !== 1 ? (
        <div>
          <button onClick={handleReset}>Reset</button>
        </div>
      ) : null}
    </div>
  );
}
