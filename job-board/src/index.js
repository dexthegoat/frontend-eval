import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
// In the strict mode of React 18 an effect with useEffect seems to be called twice.
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
