import { useEffect, useState } from 'react';
import './App.css';

function randomizer(num) {
  return Math.floor(Math.random() * num) + 1;
}

function getNums() {
  const arr = [];
  for (let i = 0; i < 36; i++) {
    arr.push(randomizer(18));
  }
  return arr;
}

const GAME_PHASE = {
  PRE_START: 'PRE_START',
  STARTED: 'STARTED',
  END: 'END',
};

function App() {
  const [numbers, setNumbers] = useState([]);
  const [gamePhase, setGamePhase] = useState(GAME_PHASE.PRE_START);
  const [flipped, setFlipped] = useState(null);
  const [solved, setSolved] = useState([]);

  const handleGameStart = () => {
    setNumbers(getNums());
    setGamePhase(GAME_PHASE.STARTED);
    setSolved([]);
  };

  const handleFlipCard = (n, idx) => {
    if (flipped && Object.values(flipped).length === 2) return;
    if (!flipped) {
      setFlipped({ [idx]: n });
    } else if (Object.values(flipped)[0] === n) {
      setFlipped((prev) => ({ ...prev, [idx]: n }));
      setTimeout(() => {
        setSolved((prev) => [...prev, n]);
        setFlipped(null);
      }, 3000);
    } else {
      setFlipped((prev) => ({ ...prev, [idx]: n }));
      setTimeout(() => {
        setFlipped(null);
      }, 3000);
    }
  };

  const getClassName = (n, idx) => {
    if (flipped && flipped[idx] === n) {
      return 'flipped';
    } else if (solved.includes(n)) {
      return 'done';
    } else {
      return '';
    }
  };

  useEffect(() => {
    if (solved.length === 18) {
      setGamePhase(GAME_PHASE.END);
    }
  }, [solved]);

  return (
    <div className="App">
      <header>Memory Game</header>
      <main className="game-container">
        {gamePhase === GAME_PHASE.PRE_START && (
          <div className="start-button">
            <button onClick={handleGameStart}>Play</button>
          </div>
        )}
        {gamePhase === GAME_PHASE.STARTED && (
          <div className="cards">
            {numbers.map((n, idx) => {
              return (
                <div
                  key={`${n}-${idx}`}
                  className={`card ${getClassName(n, idx)}`}
                  onClick={() => handleFlipCard(n, idx)}
                >
                  <span>{n}</span>
                </div>
              );
            })}
          </div>
        )}
        {gamePhase === GAME_PHASE.END && (
          <div className="play-again">
            <button onClick={handleGameStart}>Play Again</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
