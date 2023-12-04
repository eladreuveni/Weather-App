import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const container = document.getElementById('root')!;
const root = createRoot(container);

export const setVHVW = () => {
  document.documentElement.style.setProperty('--vh', `${(document.documentElement.clientHeight) / 100}px`);
  document.documentElement.style.setProperty('--vw', `${(document.documentElement.clientWidth) / 100}px`);
}
setVHVW(); // first

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
