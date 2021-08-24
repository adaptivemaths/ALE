import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import "./LearningObjective.css";

class LearningObjective extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      lo: "",
    };
  }

  componentDidMount() {
    this.setState({
      lo: this.props.match.params.lo,
    });
  }

  render() {
    return <>{this.state.lo}</>;
  }
}

export default withCookies(LearningObjective);
