import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { learningOutcomeRankings } from "../../api";
import NavBar from "../navbar/NavBar";

class TopicPerformance extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      learningOutcomes: [],
    };
  }

  async componentDidMount() {
    const userId = this.props.cookies.get("userId");
    const topic = this.props.match.params.topic.replaceAll("%20", " ");
    const learningOutcomes = await learningOutcomeRankings(userId, topic);
    this.setState({
      topic,
      learningOutcomes,
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <h1>{this.state.topic} Performance</h1>
        <div style={{ textAlign: "center" }}>
          {this.state.learningOutcomes.map((lo) => (
            <>
              <Button
                href={`/learningOutcome/${lo.lo}/`}
                style={{ margin: "10px" }}
              >
                {lo.lo} : {lo.score * 100}
              </Button>
              <br />
            </>
          ))}
        </div>
      </div>
    );
  }
}

export default withCookies(TopicPerformance);
