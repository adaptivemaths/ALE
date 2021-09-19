import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import PersonalPlan from "./PersonalPlan";
import NavBar from "../navbar/NavBar";
import Performance from "./Performance";
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
        <div className="dashboard">
          <div className="recommendations">
            <div className="flex-container">
              <PersonalPlan />
            </div>
          </div>
          <div className="recommendations">
            <div className="flex-container">
              <Performance />
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default withCookies(Recommendations);
