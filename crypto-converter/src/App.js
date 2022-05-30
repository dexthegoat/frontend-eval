import { useEffect, useReducer, useState } from 'react';
import './App.css';

const baseURL = 'https://api.frontendeval.com/fake/crypto/';

const initialState = {
  prev: 0,
  curr: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'update':
      return {
        prev: state.curr,
        curr: helper(action.inputVal * action.rate),
      };
    default:
      break;
  }
};

const helper = (n) => {
  return Math.round(n * 100) / 100;
};

function App() {
  const [inputVal, setInputVal] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    let interval;
    const fetchData = async () => {
      const response = await fetch(baseURL + currency);
      const { value } = await response.json();
      dispatch({
        type: 'update',
        inputVal: parseFloat(inputVal),
        rate: value,
      });
    };
    const timer = setTimeout(() => {
      if (inputVal) {
        fetchData();
        interval = setInterval(() => {
          fetchData();
        }, 10000);
      }
    }, 0);
    return () => {
      clearTimeout(timer);
      clearInterval(interval);
    };
  }, [inputVal, currency]);

  const diff = state.curr - state.prev;

  return (
    <div className="Container">
      <div className="converter">
        <input
          type="number"
          required
          onChange={(e) => setInputVal(e.target.value)}
        />
        <select
          name="currency"
          id="currency"
          onChange={(e) => setCurrency(e.target.value)}
          value={currency}
        >
          <option value="USD">USD</option>
          <option value="EUR">EUR</option>
          <option value="GBP">GBP</option>
          <option value="JPY">JPY</option>
          <option value="CNY">CNY</option>
        </select>
        <div className="result">
          <p>{state.curr}</p>
          <p>WUC</p>
          <p className={diff > 0 ? 'positive' : 'negative'}>{helper(diff)}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
