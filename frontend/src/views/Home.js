import React from 'react';
import { Link } from 'react-router-dom'
import { Header, Button, Container } from 'semantic-ui-react'

function Home() {
  return (
    <div className="App-container">
      <Header size='huge'>Find your future collaborator today!</Header>
      <Header size='medium'>Welcome to the Artist Matcher</Header>
      <Button size='large' color='blue' as={Link} to='signup'>Join Now</Button>
    </div>
  );
}
export default Home;