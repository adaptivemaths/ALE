import React, { Component } from "react";
import "./Graph.css";

class Graph extends Component {
  render() {
    return (
      <div>
        <iframe
          src="https://www.desmos.com/calculator"
          title="Graph"
          className="graph"
        ></iframe>
      </div>
    );
  }
}

export default Graph;
