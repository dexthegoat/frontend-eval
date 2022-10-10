import './App.css';

function getArr() {
  const arr = [];
  for (let i = 0; i < 100; i++) {
    arr.push(i + 1);
  }
  return arr;
}

function App() {
  return (
    <div className="container">
      {getArr().map((_, idx) => (
        <div key={`grid${idx + 1}`} className="grid"></div>
      ))}
    </div>
  );
}

export default App;
