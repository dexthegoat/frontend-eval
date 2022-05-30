import { useState } from 'react';
import './App.css';

function App() {
  const [payment, setFormPayment] = useState(undefined);

  const handleSubmit = (e) => {
    e.preventDefault();
    const p = document.getElementById('loan').value;
    const rate = document.getElementById('rate').value;
    const length = document.getElementById('length').value;

    const interestRateMonths = (rate * 0.01) / 12;
    const loanLength = length * 12;

    const top =
      interestRateMonths * Math.pow(1 + interestRateMonths, loanLength);
    const bottom = Math.pow(1 + interestRateMonths, loanLength) - 1;
    const res = (p * top) / bottom;
    setFormPayment(Math.trunc(res));
  };

  return (
    <div className="App">
      <form id="form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Mortgage Calculator</legend>
          <div className="row">
            <label htmlFor="loan">Principal loan amout</label>
            <input id="loan" pattern="[0-9]*" required />
          </div>
          <div className="row">
            <label htmlFor="rate">Interest rate</label>
            <input id="rate" required pattern="[0-9]*.?[0-9]*" />%
          </div>
          <div className="row">
            <label htmlFor="length">Length of loan</label>
            <input id="length" required pattern="[0-9]*" />
            Years
          </div>
          <button type="submit">Calculate</button>
        </fieldset>
      </form>
      {payment && <p>{`Your monthly payment is $${payment}`}</p>}
    </div>
  );
}

export default App;
