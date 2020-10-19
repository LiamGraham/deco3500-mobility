import React from 'react';
import { Header, Button } from 'semantic-ui-react'

function Home() {
  return (
    <div>
      <header className="App-header">
        <Header size='huge'>Find your future collaborator today!</Header>
        <Header size='medium'>Welcome to the Artist Matcher</Header>
        <Button size='large' color='blue'>Join Now</Button>
      </header> 
    </div>
  );
}
export default Home;