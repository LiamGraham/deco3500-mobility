import React from 'react';
// import '../App.css';
import signUp from '../components/signUp';
import 'semantic-ui-react'


function Home() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: 'black' }}>Home Page</h1>
        <h2>Welcome to Artist Matcher</h2>
         {/* {signUp()} */}
      </header>
    </div>
  );
}
export default Home;
