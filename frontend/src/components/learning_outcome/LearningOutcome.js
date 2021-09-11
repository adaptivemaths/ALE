import React, { Component } from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import NavBar from "../navbar/NavBar";
import SubLoList from "./SubLoList";
import "./LearningOutcome.css";
import { getLo } from "../../api";

class LearningObjective extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      lo: "",
      subLos: [],
    };
  }

  async componentDidMount() {
    const lo = this.props.match.params.lo;
    const subLos = await getLo(lo);

    this.setState({
      lo,
      subLos,
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <h1>Learning Outcome - {this.state.lo}</h1>
        <br />
        <SubLoList subLos={this.state.subLos} />
      </div>
    );
  }
}

export default withCookies(LearningObjective);
