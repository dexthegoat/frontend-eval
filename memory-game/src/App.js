import { useEffect, useState } from 'react';
import './App.css';

function randomizer(num) {
  return Math.floor(Math.random() * num) + 1;
}

function getNums() {
  const arr = [];
  for (let i = 0; i < 35; i++) {
    arr.push(randomizer(18));
  }
  return arr;
}

function cardBuilder(n, idx) {
  return (
    <div className="card" key={`${n}-${idx}`}>
      <span>{n}</span>
    </div>
  );
}

function App() {
  const [numbers, setNumbers] = useState([]);

  useEffect(() => {
    setNumbers(getNums());
  }, []);

  return (
    <div className="App">
      <header>Memory Game</header>
      <main className="game-board">
        {numbers.map((n, idx) => cardBuilder(n, idx))}
      </main>
    </div>
  );
}

export default App;
