import { useState } from 'react';
import './App.css';

function App() {
  const [value, setValue] = useState(0);

  const handleClick = ({ target: { innerHTML } }) => {
    setValue(value + parseInt(innerHTML));
  };

  return (
    <div className="App">
      <header>
        <h1>Undoable Counter</h1>
      </header>
      <nav>
        <button>Undo</button>
        <button>Redo</button>
      </nav>
      <main>
        <div className="minus">
          <button onClick={handleClick}>-100</button>
          <button onClick={handleClick}>-10</button>
          <button onClick={handleClick}>-1</button>
        </div>
        <div className="value">
          <span>{value}</span>
        </div>
        <div className="add">
          <button onClick={handleClick}>+1</button>
          <button onClick={handleClick}>+10</button>
          <button onClick={handleClick}>+100</button>
        </div>
      </main>
      <footer>
        <h2>History</h2>
        <div className="history-wrapper">
          <div className="history"></div>
        </div>
      </footer>
    </div>
  );
}

export default App;
