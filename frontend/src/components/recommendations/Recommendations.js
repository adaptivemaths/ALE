import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import PersonalPlan from "./PersonalPlan";
import NavBar from "../navbar/NavBar";
import "./Recommendations.css";

class Recommendations extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  render() {
    return (
      <>
        <NavBar />
        <div className="recommendations-title">
          <h1>Recommendations</h1>
        </div>
        <br />
        <div className="recommendations-container">
          <PersonalPlan />
        </div>
      </>
    );
  }
}

export default withCookies(Recommendations);
