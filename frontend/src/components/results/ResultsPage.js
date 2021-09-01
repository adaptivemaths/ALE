import React from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import "./ResultsPage.css";
import NavBar from "../navbar/NavBar";
import { getAnswers, getPaperInfo } from "../../api";

class ResultsPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor() {
    super();
    this.state = {
      paper: {
        testId: "",
        title: "",
      },
      correct: 0,
      questions: [],
      questionsLoaded: false,
    };
  }

  async componentDidMount() {
    // Get userId of current user and call loadAnswers
    const userId = this.props.cookies.get("userId");
    await this.loadAnswers(userId);
  }

  async loadAnswers(userId) {
    const testId = this.props.match.params.testId;
    const paper = await getPaperInfo({
      testId,
    });
    this.setState(
      {
        paper: {
          testId,
          title: paper.title,
        },
      },
      async () => {
        // getAnswers returns array of questions with user's answer
        const questions = await getAnswers({
          userId,
          testId,
        });
        this.setState(
          {
            questions,
            questionsLoaded: true,
            showResults: true,
          },
          () => this.calculateCorrectAnswers()
        );
      }
    );
  }

  calculateCorrectAnswers() {
    let correct = 0;
    for (let question of this.state.questions) {
      question.correct = false;
      // Multiple possible solutions are separated by semi-colon
      if (question.QUESTION_ANSWER.split(";").includes(question.answer)) {
        correct++;
        // Set correct property to true if user's answer was correct
        question.correct = true;
      }
    }

    this.setState({
      correct,
    });
  }

  topicsAccuracy() {
    const questions = this.state.questions;
    const topics = [];
    const accuracy = {};

    for (let question of questions) {
      // Add new topic to array
      if (!topics.includes(question.TOPIC)) {
        topics.push(question.TOPIC);
        accuracy[question.TOPIC] = {
          correct: 0,
          total: 0,
        };
      }

      let correct = accuracy[question.TOPIC].correct;
      if (question.correct) {
        correct += question.QUESTION_MARKS;
      }

      let total = accuracy[question.TOPIC].total;
      total += question.QUESTION_MARKS;

      accuracy[question.TOPIC] = {
        correct,
        total,
      };
    }

    return (
      <>
        <h3>Accuracy by topic</h3>
        <br />
        {topics.map((topic) => (
          <div>
            {topic}:{" "}
            {((100 * accuracy[topic].correct) / accuracy[topic].total).toFixed(
              2
            )}
            %<br />
          </div>
        ))}
      </>
    );
  }

  marksScore() {
    // Calculate marks for answers
    let correct = 0;
    let total = 0;
    for (let question of this.state.questions) {
      total += question.QUESTION_MARKS;
      if (question.correct) {
        correct += question.QUESTION_MARKS;
      }
    }
    // Round to 2 decimal places
    let score = ((100 * correct) / total).toFixed(2);
    return (
      <>
        <h2>{`You got ${score}% overall`}</h2>
        <br />
      </>
    );
  }

  render() {
    if (!this.state.questionsLoaded) {
      return <div>Loading...</div>;
    } else if (this.state.questions.length === 0) {
      return <div>This test has no questions</div>;
    }
    return (
      <>
        <NavBar />
        <div className="results-container">
          <h1>Results for {this.state.paper.title}</h1>
          <br />
          {this.marksScore()}
          {this.topicsAccuracy()}
        </div>
      </>
    );
  }
}

export default withCookies(ResultsPage);
