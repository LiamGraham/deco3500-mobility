import React from "react";
import Graph from "react-graph-vis";
import Scores from './scores1.json';
import UserDisplay from '../components/userDisplay';
import { Button, Modal } from 'semantic-ui-react';
import { render, unstable_renderSubtreeIntoContainer } from "react-dom";

const images = [
  'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU',
  'https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70',
  'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5c76b7d331358e35dd2773a9%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D0%26cropX2%3D4401%26cropY1%3D0%26cropY2%3D4401',
  'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5babb7f1a7ea4342a948b79a%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D748%26cropX2%3D3075%26cropY1%3D1753%26cropY2%3D4082'
]

const colors = ["#e04141", "#e09c41", "#e0df41", "#7be041", "#41e0c9" ]
const threshold = 0.8;

let userDisplayId = null

export default function Connections() {
  function buildGraph() {
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

    return { nodes, edges }
  }

  const graph = buildGraph();

  // building a pop up image
  // function popTrial() {
  //   var popup = document.getElementById("myPopup");
  //   popup.classList.toggle("show");
  // }

  // const pop = popTrial();
  
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
    height: "750px"
  };
  
  const events = {
    select: function(event) {
      var { nodes, edges } = event;
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
    },
    showPopup: (id) => {
      console.log("this is a pop up for " + id);
      userDisplayId = id
      // userDisplay(id, true)
      // renderUserProfile(id)   
      // onclick = "ModalExampleShorthand()"   
      //alert("your match is " + id);
      // {userDisplay()}
    }
  };

  // const ModalExampleShorthand = () => (
  //   <Modal
  //     trigger={events}
  //     // trigger={<Button>Show Modal</Button>}
  //     header='Reminder!'
  //     content='Call Benjamin regarding the reports.'
  //     actions={['Snooze', { key: 'done', content: 'Done', positive: true }]}
  //   />
  // )

  // {userDisplay()} 
  
  return (
    <>
      <Graph
        graph={graph}
        options={options}
        events={events}
        getNetwork={network => {
          //  if you want access to vis.js network api you can set the state in a parent component using this property
        }}
      />
      <UserDisplay id={userDisplayId} open={userDisplayId !== null}/>
      {/* <p style={{ color: 'black' }}>{`Threshold: ${threshold}`}</p>
      <p style={{ color: 'black' }}>{`Artists: ${graph.nodes.length}`}</p>
      <p style={{ color: 'black' }}>{`Connections: ${graph.edges.length / 2}`}</p> */}
    </>
  );
}
