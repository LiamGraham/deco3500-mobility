import React, { Component } from 'react';
import '../App.css';
import Connections from '../graph/graph';
import Preview from '../components/preview';
import { Container, Box } from '@material-ui/core';
import { Header } from 'semantic-ui-react'
const axios = require('axios')

class Explore extends Component {
  constructor(props) {
    super(props)

    this.state = {
      matches: null
    }
  }

  componentDidMount() {
    this.getMatches()
  }

  getMatches = async () => {
    if (!this.props.user || !this.props.user.username) {
      return null
    }
    let res
    try {
      res = await axios.get(`https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/${this.props.user.username}/matches?threshold=0.5`)
    } catch (error) {
      console.error(error)
      alert(`Failed to get matches for ${this.props.user.username}`)
    }
    console.log(res.data.data)
    this.setState({ matches: res.data.data })
  }

  render() {
    if (this.props.user) {
      if (this.state.matches) {
        return (
          <div className="App-container">
            <Header size='medium'>Hi {this.props.user.username}! Here are your matches</Header>
            <Container maxWidth="md">
              <Box bgcolor="white">
                <Connections user={this.props.user} matches={this.state.matches} />
              </Box>
            </Container>        
          </div>
        );
      }else {
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
