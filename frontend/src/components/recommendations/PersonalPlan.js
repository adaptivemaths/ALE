import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { learningOutcomeRankings } from "../../api";
import "./styles.css";

class PersonalPlan extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      loRankings: [],
    };
  }

  async componentDidMount() {
    const userId = this.props.cookies.get("userId");
    const loRankings = await learningOutcomeRankings(userId);

    this.setState({
      loRankings,
    });
  }

  render() {
    return (
      <>
        <div className="info-section">
          <h3>Personal Plan</h3>
          Topics to improve:
          <br />
          <br />
          {this.state.loRankings.slice(0, 5).map(({ lo, score }) => (
            <Button variant="outline-dark" href={`/learningOutcome/${lo}`}>
              {lo}
              <br />
            </Button>
          ))}
          <br />
          <small>Click to learn more</small>
        </div>
      </>
    );
  }
}

export default withCookies(PersonalPlan);
