import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

const btn = document.createElement('button');
btn.innerText = 'Click me';
btn.onclick = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};
document.body.appendChild(btn);