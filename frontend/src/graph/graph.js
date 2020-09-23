import React from "react";
import Graph from "react-graph-vis";
import Scores from './scores1.json';

// import "./styles.css";
// need to import the vis network css in order to show tooltip
// import "./network.css";

export default function Connections() {
  const threshold = 0.8;
  function buildGraph() {
    const names = Object.keys(Scores);
    console.log(names)

    // write some sort of loop to convert Scores into graph
    const nodes = [];
    const edges = [];
    for (let i = 0; i < names.length; i++) {

      // adding nodes
      const name = names[i]
      const node = { id: name, label: name, color: "#e04141" }
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
  
  const options = {
    layout: {
      hierarchical: false
    },
    edges: {
      color: "#000000"
    },
    height: "500px"
  };
  
  const events = {
    select: function(event) {
      var { nodes, edges } = event;
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
    }
  };

  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      getNetwork={network => {
        //  if you want access to vis.js network api you can set the state in a parent component using this property
      }}
    />
  );
}
