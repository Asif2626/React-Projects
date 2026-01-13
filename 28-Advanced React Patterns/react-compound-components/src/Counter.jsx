import { createContext, useState, useContext } from "react";

// 1. Create a Context
const CounterContext = createContext();

// 2. Parent component
function Counter({ children }) {
  const [count, setCount] = useState(0);

  const increase = () => setCount((c) => c + 1);
  const decrease = () => setCount((c) => c - 1);

  return (
    <CounterContext.Provider value={{ count, increase, decrease }}>
      <div className="counter">{children}</div>
    </CounterContext.Provider>
  );
}

// 3. Child components
function Count() {
  const { count } = useContext(CounterContext);
  return <span className="count">{count}</span>;
}

function Label({ children }) {
  return <span className="label">{children}</span>;
}

function Increase({ icon = "+" }) {
  const { increase } = useContext(CounterContext);
  return (
    <button className="btn" onClick={increase}>
      {icon}
    </button>
  );
}

function Decrease({ icon = "-" }) {
  const { decrease } = useContext(CounterContext);
  return (
    <button className="btn" onClick={decrease}>
      {icon}
    </button>
  );
}

// 4. Attach child components to parent
Counter.Count = Count;
Counter.Label = Label;
Counter.Increase = Increase;
Counter.Decrease = Decrease;

export default Counter;
