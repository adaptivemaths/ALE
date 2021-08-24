import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import "./Recommendations.css";

class Recommendations extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return <></>;
  }
}

export default withCookies(Recommendations);
