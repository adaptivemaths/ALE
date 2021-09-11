import React from "react";
import NavBar from "../navbar/NavBar";
import Button from "react-bootstrap/Button";
import "./practice.css";
import { Nav } from "react-bootstrap";

export default class Practice extends React.Component {
  // Choose between "By Topic" and "Comprehensive Assessments"
  render() {
    return (
      <div className="practice-wrapper">
        <NavBar />
        <div className="practice-title">Practice</div>
        <br />
        <Button variant="outline-dark" href="/practice/topics" size="lg">
          By Topic
        </Button>
        <br />
        <br />
        <Button variant="outline-dark" href="/practice/assessments/" size="lg">
          Comprehensive Assessment
        </Button>
      </div>
    );
  }
}
