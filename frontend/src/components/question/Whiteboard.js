import React, { Component } from "react";
import "./Whiteboard.css";

class Whiteboard extends Component {
  render() {
    return (
      <div>
        <iframe
          src="https://www.autodraw.com/"
          title="Whiteboard"
          className="whiteboard"
        ></iframe>
      </div>
    );
  }
}

export default Whiteboard;
