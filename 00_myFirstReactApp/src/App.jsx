import React, { useEffect, useState } from "react";

const App = () => {
  const [advice, setAdvice] = useState("");
  const [count, setCount] = useState(0);
  async function getAdvice() {
    const res = await fetch("https://api.adviceslip.com/advice");
    const data = await res.json();
    setAdvice(data.slip.advice);
    setCount((a) => a + 1);
  }

  useEffect(function () {
    getAdvice();
  }, []);

  return (
    <>
      <h1>{advice}</h1>
      <button onClick={getAdvice}>Get Advice</button>
      <Message count={count} />
    </>
  );
};

export default App;

function Message(props) {
  return (
    <>
      <p>
        you have red <strong>{props.count}</strong> pices of advice
      </p>
    </>
  );
}
