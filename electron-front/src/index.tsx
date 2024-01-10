import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { JSONRPCClient } from 'json-rpc-2.0';

const ws = new WebSocket('ws://localhost:5013/rpc');

const client = new JSONRPCClient(req => {
  try {
    ws.send(JSON.stringify(req));
  } catch (e) {
    throw e;
  }
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App api={client} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
