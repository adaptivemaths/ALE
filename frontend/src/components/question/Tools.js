import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Graph from "./Graph";
import Whiteboard from "./Whiteboard";
import "./Tools.css";

class Tools extends Component {
  state = {
    showGraph: false,
    showBoard: false,
  };

  render() {
    return (
      <div>
        <div className="tools">
          <Button
            variant="primary"
            onClick={() => this.setState({ showGraph: !this.state.showGraph })}
          >
            {this.state.showGraph ? "Hide graph" : "Show graph"}
          </Button>

          <Button
            variant="primary"
            onClick={() => this.setState({ showBoard: !this.state.showBoard })}
          >
            {this.state.showBoard ? "Hide whiteboard" : "Show whiteboard"}
          </Button>

          {this.state.showGraph && <Graph />}
          {this.state.showBoard && <Whiteboard />}
        </div>
      </div>
    );
  }
}

export default Tools;
