import './App.css';

function App() {
  return (
    <div className="container">
      {Array(100)
        .fill(0)
        .map((_, idx) => (
          <div key={`grid${idx + 1}`} className="grid"></div>
        ))}
    </div>
  );
}

export default App;
