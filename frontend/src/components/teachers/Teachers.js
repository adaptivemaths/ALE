import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import NavBar from "../navbar/NavBar";

class Teachers extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <h1>Teachers</h1>
        <Button variant="primary" href="/teachers/signup/">
          Signup as a teacher
        </Button>
      </div>
    );
  }
}

export default Teachers;
