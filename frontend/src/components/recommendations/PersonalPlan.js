import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import "./PersonalPlan.css";

class PersonalPlan extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const userId = this.props.cookies.get("userId");
  }

  render() {
    return (
      <>
        <h2>Personal Plan</h2>
      </>
    );
  }
}

export default withCookies(PersonalPlan);
