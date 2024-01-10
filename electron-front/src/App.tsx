import React from 'react';
import logo from './logo.svg';
import './App.css';
import { JSONRPCClient } from 'json-rpc-2.0';

interface IProps {
  api: JSONRPCClient,
}

function App(props: IProps) {
  const handler = async () => {
    console.log('before');
    const result = await props.api.request('Pong', {value: 'test'});
    console.log(result);
  };
  return (
    <div className="App">
      <button onClick={handler}>
        Test JSON RPC
      </button>

    </div>
  );
}

export default App;
