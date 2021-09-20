import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Bar } from "react-chartjs-2";
import { learningOutcomeRankings } from "../../api";
import "./styles.css";

class PerformanceChart extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      data: {},
      topics: [],
    };
  }

  async componentDidMount() {
    const userId = this.props.cookies.get("userId");
    const byTopic = true;
    const topic = undefined;
    const topicsAccuracy = await learningOutcomeRankings(
      userId,
      topic,
      byTopic
    );

    const topics = [];
    const accuracy = [];
    topicsAccuracy.forEach((topic) => {
      topics.push(topic.topic);
      accuracy.push(topic.score * 10);
    });
    const data = {
      labels: topics,
      datasets: [
        {
          label: "Accuracy",
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 2,
          data: accuracy,
        },
      ],
    };

    this.setState({
      data,
      topics,
    });
  }
  render() {
    return (
      <div className="info-section">
        <h2>Performance</h2>
        <div>
          <Bar
            data={this.state.data}
            width={500}
            height={400}
            options={{
              responsive: false,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: "Average Rainfall per month",
                fontSize: 20,
              },
              legend: {
                display: true,
                position: "right",
              },
            }}
          />
        </div>
        {this.state.topics.map((topic) => (
          <Button
            href={`/topicPerformance/${topic}/`}
            style={{ margin: "5px" }}
          >
            {topic}
          </Button>
        ))}
      </div>
    );
  }
}

export default withCookies(PerformanceChart);
