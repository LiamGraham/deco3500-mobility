import React from 'react';
import '../App.css';
import Connections from '../graph/graph';
import Preview from '../components/preview';
import { Container, Box } from '@material-ui/core';
import { Header } from 'semantic-ui-react'

function Explore() {
  return (
    <div className="App-container">
      <Header size='medium'>Here are your matches</Header>
      <Container maxWidth="md">
        <Box bgcolor="white">
          <Connections />
        </Box>

        <Box>
          <Preview id='user1' />
        </Box>
      </Container>
    </div>
  );
}

export default Explore;
