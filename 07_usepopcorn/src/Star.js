import React, { useState } from "react";
import StarRating from "./StarRating";

export default function Star() {
  const [movieRating, setMovieRating] = useState(0);

  return (
    <div>
      <StarRating
        maxRating={5}
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
        defaultRating={3}
      />
      <StarRating
        size={48}
        color="green"
        messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      />
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars.</p>
    </div>
  );
}
