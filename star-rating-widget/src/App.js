import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './App.css';

function App() {
  const [rating, setRating] = useState();
  const [hover, setHover] = useState();

  return (
    <div className="App">
      {[...Array(5)].map((star, index) => {
        const ratingVal = index + 1;

        return (
          <label key={index} htmlFor={index}>
            <input
              id={index}
              type="radio"
              name="rating"
              value={ratingVal}
              onClick={() => setRating(ratingVal)}
            />
            <FaStar
              className="star"
              color={ratingVal <= (hover || rating) ? 'yellow' : 'grey'}
              size={100}
              onMouseEnter={() => setHover(ratingVal)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <br />
      <p>Click Rating is {rating}</p>
      <p>Hover Rating is {hover}</p>
    </div>
  );
}

export default App;
