import React from 'react';
import '../App.css';
import Connections from '../graph/graph';
import Preview from '../components/preview';
import { Container, Box } from '@material-ui/core';

function Explore() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: 'black' }}>Here are your matches</h1>
        <Container maxWidth="sm">
          <Box bgcolor="#def1f7">
            <Connections />
          </Box>
          <Box>
            <Preview id='user1' />
          </Box>
        </Container>
      </header>
    </div>
  );
}

export default Explore;
