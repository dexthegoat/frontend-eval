import { useState } from 'react';
import './App.css';

const dotMap = {
  1: ['middle'],
  2: ['bottom-left', 'top-right'],
  3: ['bottom-left', 'middle', 'top-right'],
  4: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
  5: ['top-left', 'top-right', 'middle', 'bottom-left', 'bottom-right'],
  6: [
    'top-left',
    'top-right',
    'bottom-left',
    'bottom-right',
    'middle-left',
    'middle-right',
  ],
};

const Dice = ({ number }) => {
  const mapValues = dotMap[number];

  return (
    <div className="dice">
      <div className="dots-container">
        {mapValues.map((ele, idx) => {
          return <div key={idx} className={`dot ${ele}`}></div>;
        })}
      </div>
    </div>
  );
};

export default function App() {
  const [diceCounts, setDiceCounts] = useState('');
  const [dotsValues, setDotsValues] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const intDiceCounts = parseInt(diceCounts);
    const valsArr = [...Array(intDiceCounts)].map(() => {
      return Math.floor(Math.random() * 6) + 1;
    });
    setDotsValues(valsArr);
  };

  return (
    <div className="App">
      <section className="form-container">
        <form onSubmit={handleSubmit}>
          <label htmlFor="dice-count">Number of dice</label>
          <input
            type="number"
            id="dice-count"
            required
            min="1"
            max="99"
            onChange={(e) => setDiceCounts(e.target.value)}
          />
          <button type="submit">Roll</button>
        </form>
      </section>
      <section className="dice-container">
        {dotsValues.map((n, idx) => {
          return <Dice number={n} key={idx} />;
        })}
      </section>
    </div>
  );
}
