import { useEffect, useReducer } from 'react';
import './App.css';

const URL =
  'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new';

const initialState = {
  xValues: [],
  yValues: [],
  maxY: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'setX':
      return {
        ...state,
        xValues: action.payload,
      };
    case 'setY':
      return {
        ...state,
        yValues: action.payload,
      };
    case 'setMaxY':
      return {
        ...state,
        maxY: action.payload,
      };
    default:
      break;
  }
};

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(URL);
      const data = await res.text();
      const numbers = data.split('\n').map((n) => Number(n));
      const map = {};
      for (const n of numbers) {
        map[n] ? map[n]++ : (map[n] = 1);
      }
      const maxX = Math.max(Object.keys(map).map(Number));
      const maxY = Math.max(Object.values(map).map(Number));
      console.log(maxX, maxY);
      dispatch({
        type: 'setMaxY',
        payload: maxY,
      });
    };
    fetchData();
  }, []);
  console.log(state);
  return (
    <div className="App">
      <div className="graph">
        <div class="column">
          <div class="x">1</div>
        </div>
        <div class="column">
          <div class="x">2</div>
        </div>
        <div class="column">
          <div class="x">3</div>
        </div>
      </div>
    </div>
  );
}

export default App;
