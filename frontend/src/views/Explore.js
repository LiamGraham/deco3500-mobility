import React, { Component } from 'react';
import '../App.css';
import Connections from '../graph/graph';
import Preview from '../components/preview';
import { Container, Box, Button } from '@material-ui/core';
import { Header } from 'semantic-ui-react'
const axios = require('axios')

class Explore extends Component {
  setThreshold = () => {

  }

  render() {
    if (this.props.user) {
      if (this.props.user.matches) {
        return (
          <div className="App-container">
            <Header size='medium'>Hi {this.props.user.firstName}! Here are your matches.</Header>
            <Header size='small'>You can click on another musicians picture to get to know them better.</Header>
            <Button active={true} >More users</Button>
            <Container maxWidth="md">
              <Box bgcolor="white">
                <Connections user={this.props.user} />
              </Box>
            </Container>        
          </div>
        );
      } else {
        return (
          <div className="App-container">
            <Header size='medium'>Retrieving matches...</Header>      
          </div>
        )
      }
    } else {
      return <div className="App-container">
        <Header size='medium'>Please log in to view your matches!</Header>   
      </div>
    }
  }
}

export default Explore;
