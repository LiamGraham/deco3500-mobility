import React from 'react';
import '../App.css';
import Connections from '../graph/graph';
import Preview from '../components/preview';
import { Container, Box } from '@material-ui/core';
import userDisplay from '../components/userDisplay';

function Explore() {
  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: 'black' }}>Here are your matches</h1>

        <Container maxWidth="lg">
          <Box bgcolor="#def1f7">
            <Connections />
          </Box>

          <Box>
            {/* {userDisplay()} */}
            <Preview id='user1' />
          </Box>
        </Container>

        
      </header>
    </div>
  );
}

export default Explore;
