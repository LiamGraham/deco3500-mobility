import React, { Component } from "react";
import Graph from "react-graph-vis";
import Scores from './scores1.json';
import UserDisplay from '../components/userDisplay';
import { Button, Modal } from 'semantic-ui-react';
import { render, unstable_renderSubtreeIntoContainer } from "react-dom";
import { collapseTextChangeRangesAcrossMultipleVersions } from "typescript";
const axios = require('axios')

const images = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  'https://images.pexels.com/photos/2078265/pexels-photo-2078265.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260',
  'https://images.pexels.com/photos/4580470/pexels-photo-4580470.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/2802811/pexels-photo-2802811.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://images.pexels.com/photos/3992656/pexels-photo-3992656.png?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/5149881/pexels-photo-5149881.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
  'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
  'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5c76b7d331358e35dd2773a9%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D4401%26cropY1%3D0%26cropY2%3D4401',
  'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5babb7f1a7ea4342a948b79a%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D748%26cropX2%3D3075%26cropY1%3D1753%26cropY2%3D4082'
]

const colors = ["#e04141", "#e09c41", "#e0df41", "#7be041", "#41e0c9" ]
const threshold = 0.8;

class Connections extends Component {
  constructor(props) {
    super(props)

    this.state = {
      nodes: null,
      edges: null,
      collaborator: null,
      displayedSecondDegree: false,
    }
  }

  componentDidMount() {
    this.buildGraph2()
  }
  
  getRandomImage = (i) => {
    if (!i) {
      return images[Math.floor(Math.random() * images.length)]
    }
    return images[(i+1)%images.length]
  }

  getRandomColour = () => {
    return colors[Math.floor(Math.random() * colors.length)]
  }

  displaySecondDegreeConnections = () => {
    if (this.state.displayedSecondDegree) {
      return
    }
    this.setState({ displayedSecondDegree: true })
    this.buildGraph2(true)
  }

  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }

  buildGraph2(displaySecondDegreeConnections) {
    const { user } = this.props
    const matches = user.matches

    const nodes = [{
      size: 50,
      id: user.username,
      label: `${user.firstName} (you)`,
      color: colors[Math.floor(Math.random() * colors.length)],
      image: images[0]
    }]
    const edges = []

    for (let i = 0; i < matches.length; i++) {

      // adding nodes
      const name = matches[i]
      const randomColor = this.getRandomColour();
      const randomImage = this.getRandomImage(i);

      const node = { id: name, label: name, color: randomColor, image: randomImage }
      nodes.push(node);

      // adding node edges
      edges.push({ from: name, to: this.props.user.username })
    }


    if (displaySecondDegreeConnections) {
      const newlyAdded = []
      console.log('user.matchesOfMatches', user.matchesOfMatches)
      const pairs = []
      user.matchesOfMatches.map((obj) => {
        obj.value.forEach((match) => {
          pairs.push({ key: obj.key, value: match })
        })
      })

      const shuffled = this.shuffle(pairs)

      shuffled.forEach((element) => {
        const { key, value } = element
        if (nodes.some(obj => obj.id === value)) {
          console.log(`${value} already in nodes`)
        } else {
          console.log(`${value} not in nodes. adding.`)
          newlyAdded.push(value)
          nodes.push({ id: value, label: value, color: this.getRandomColour(), image: this.getRandomImage() })
          edges.push({ from: key, to: value })
        }
      })


      // user.matchesOfMatches.forEach((element) => {
      //   const { key, value } = element
      //   console.log(newlyAdded)
      //   newlyAdded.forEach((newlyAddedId) => {
      //     if (value.includes(newlyAddedId)) {
      //       // edges.push({ from: key, to: newlyAddedId })
      //     }
      //   })
      // })
    }

    console.log(nodes, edges)
    this.setState({
      nodes,
      edges
    })
  }

  buildGraph() {
    const names = Object.keys(Scores);
    console.log(names)

    // write some sort of loop to convert Scores into graph
    const nodes = [];
    const edges = [];
    for (let i = 0; i < names.length; i++) {

      // adding nodes
      const name = names[i]
      const randomColor = colors[Math.floor(Math.random() * colors.length)];
      const randomImage = images[Math.floor(Math.random() * images.length)];

      const node = { id: name, label: name, color: randomColor, image: randomImage }
      nodes.push(node);

      // adding node edges
      const compatibilities = Scores[name]
      const compatibilitiesKeys = Object.keys(compatibilities)

      for (let j = 0; j < compatibilitiesKeys.length; j++) {
        const neighbourName = compatibilitiesKeys[j];
        const score = compatibilities[neighbourName];
        if (score >= threshold) {
          edges.push({ from: name, to: neighbourName})
        }
      }
    }

    console.log(nodes, edges)
    this.setState({
      nodes,
      edges
    })
  }
  
  render() {
    const events = {
      select: function(event) {
        var { nodes, edges } = event;
        console.log("Selected nodes:");
        console.log(nodes);
        console.log("Selected edges:");
        console.log(edges);
      },
      showPopup: async (id) => {
        console.log("this issa pop up for " + id);
        if (id === this.props.user.username) {
          console.log('selected self')
        } else {
          console.log(`selected collaborator with id ${id}`)
          let res
          try {
            res = await axios.get(`https://cadence-ycbhlxrlga-uc.a.run.app/api/profiles/${id}`)
            if (res) {
              console.log(`Got collaborator user as ${res.data.data}`)
              this.setState({ collaborator: res.data.data })
            } else {
              alert('Failed to get collaborator\'s details. Please try again later.')
            }
          } catch (error) {
            alert('Failed to get collaborator\'s details. Please try again later.')
          }
        }
        // userDisplay(id, true)
        // renderUserProfile(id)   
        // onclick = "ModalExampleShorthand()"   
        //alert("your match is " + id);
        // {userDisplay()}
      }
    }

    const options = {
      layout: {
        hierarchical: false
      },
      edges: {
        color: "#000000"
      },
      physics: {
        enabled: true
      },
      nodes: {
        shape: "circularImage",
        chosen: {
          node: (values, id, selected, hovering) => {
            values.value = 2;
          }
        },
        title: 'foo'
      },
      height: "750px",
    }
    const graph = { nodes: this.state.nodes, edges: this.state.edges }

    console.log(this.state.collaborator)
  
    if (!this.state.nodes || !this.state.edges) {
      return (
        <div>
          <p>You have no matches yet...</p>
        </div>
      )
    }

    return (
      <div className='graph-div'>
        <Button onClick={this.displaySecondDegreeConnections} >Display second degree connections</Button>
        <Graph
          graph={graph}
          options={options}
          events={events}
          getNetwork={network => {
            //  if you want access to vis.js network api you can set the state in a parent component using this property
          }}
        />
        {this.state.collaborator && <UserDisplay user={this.props.user} collaborator={this.state.collaborator} open={this.state.collaborator !== null} close={() => { this.setState({ collaborator: null })}}/>}
      </div>
    )
  }
}

export default Connections
