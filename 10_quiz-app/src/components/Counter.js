import { useReducer, useState } from "react";

function reducer(state, action) {
  switch (action) {
    case "inc":
      return state + 1;
    case "dec":
      return state - 1;
    default:
      return state;
  }
}

const Counter = () => {
  const [count, dispatch] = useReducer(reducer, 0);
  const [step, setStep] = useState(1);

  const date = new Date("June 21 2027");
  date.setDate(date.getDate() + count);

  return (
    <div className="counter">
      <button onClick={() => dispatch("dec")}>-</button>
      <span>{count}</span>
      <button onClick={() => dispatch("inc")}>+</button>

      <p>{date.toDateString()}</p>
    </div>
  );
};

export default Counter;
