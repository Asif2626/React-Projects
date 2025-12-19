import { useState } from "react";
import "./App.css";
import useGeolocation from "./useGeoloction";

const App = () => {
  const [countClicks, setCountClicks] = useState(0);
  const { isLoading, position, error } = useGeolocation();

  function handleClick() {
    setCountClicks((count) => count + 1);
  }

  return (
    <div className="app">
      <button onClick={handleClick} disabled={isLoading}>
        Get my position
      </button>

      <div className="status">
        {isLoading && <p className="loading">Loading position...</p>}
        {error && <p className="error">{error}</p>}
      </div>

      {!isLoading && !error && position.lat && position.lng && (
        <p className="location">
          Your GPS position:
          <br />
          <a
            target="_blank"
            rel="noreferrer"
            href={`https://www.openstreetmap.org/#map=16/${position.lat}/${position.lng}`}
          >
            {position.lat}, {position.lng}
          </a>
        </p>
      )}

      <p className="counter">You requested position {countClicks} times</p>
    </div>
  );
};

export default App;
