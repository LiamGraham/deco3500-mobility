import React from 'react';
import './App.css';
import Connections from './graph/graph';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: 'black' }}>Music Artist Matching</h1>
        <Connections />
      </header>
    </div>
  );
}

export default App;
