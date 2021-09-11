import React from "react";
import NavBar from "../navbar/NavBar";
import "./about.css";

export default class About extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="about-title">About</div>

        <div className="about-container">
          You can practice by solving full assessments or by focussing on
          specific skills by solving the template questions.
        </div>
      </>
    );
  }
}
