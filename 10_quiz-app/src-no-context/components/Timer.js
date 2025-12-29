import React, { useEffect } from "react";

const Timer = ({ dispatch, secondsRemaining }) => {
  const min = Math.floor(secondsRemaining / 60);
  const seconds = secondsRemaining % 60;

  useEffect(() => {
    // Start the interval
    const id = setInterval(() => {
      dispatch({ type: "tick" });
    }, 1000);

    // Cleanup function to clear the interval
    return () => clearInterval(id);
  }, [dispatch]); // Runs once if dispatch doesn't change

  return (
    <div className="timer">
      {min < 10 && "0"}
      {min}:{seconds < 10 && "0"}
      {seconds}
    </div>
  );
};

export default Timer;
