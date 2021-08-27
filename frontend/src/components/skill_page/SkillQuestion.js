import React from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import parse from "html-react-parser";

import { getSkill } from "../../api";
import templateQuestions from "./template_questions/templateQuestions";
import NavBar from "../navbar/NavBar";
import "./SkillQuestion.css";

class SkillQuestion extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      skillId: 0,
      skillName: "",
      question: {
        text: "",
        values: [],
        answer: {},
        checkAnswer: () => false,
      },
      answer: {},
      newQuestion: () => {},
      showResult: false,
      correct: false,
      revealAnswer: false,
      attempts: 0,
    };

    this.setNewQuestion = this.setNewQuestion.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.checkAnswer = this.checkAnswer.bind(this);
    this.revealAnswer = this.revealAnswer.bind(this);
  }

  async componentDidMount() {
    // Get skillId passed as property
    const skillId = this.props.match.params.skillId;
    // Get information about skill from database
    const skill = await getSkill(skillId);
    const skillName = skill.skill_name;
    // Function to generate template question
    const newQuestion = templateQuestions[skillName];
    // Initial question
    const question = newQuestion();

    this.setState({
      skillId,
      skillName,
      newQuestion,
      question,
    });
  }

  setAnswer(event) {
    this.state.answer[event.target.name] = event.target.value;
  }

  displayQuestion() {
    return (
      <>
        {parse(this.state.question.text)}
        <br />
        {/* If user has clicked the Reveal Answer button then display the correct answer 
                    instead of the input boxes
                */}
        {this.state.revealAnswer ? (
          <>
            Answer:
            <br />
            {this.state.question.values.map((value) => (
              <>
                {value} = {this.state.question.answer[value]}
                <br />
              </>
            ))}
          </>
        ) : (
          <>
            {/* Input boxes for all the values required in the answer */}
            {this.state.question.values.map((val) => (
              <>
                <label>
                  {val}=
                  <input
                    name={val}
                    type="text"
                    value={this.state.answer[val]}
                    onChange={this.setAnswer}
                  ></input>
                </label>
                <br />
              </>
            ))}
          </>
        )}
      </>
    );
  }

  setNewQuestion() {
    // Generate new template question and reset state
    const question = this.state.newQuestion();
    this.setState({
      showResult: false,
      question,
      revealAnswer: false,
      attempts: 0,
      correct: false,
    });
  }

  checkAnswer(event) {
    // Use the checkAnswer function in the template question to check if the answer is correct
    // Increment attempts
    event.preventDefault();
    this.setState({
      showResult: true,
      correct: this.state.question.checkAnswer(this.state.answer),
      attempts: this.state.attempts + 1,
    });
  }

  revealAnswer(event) {
    event.preventDefault();
    this.setState({
      revealAnswer: true,
    });
  }

  render() {
    return (
      <>
        <NavBar />
        <div className="skill-container">
          <h1>{this.state.skillName}</h1>

          <form>
            {this.displayQuestion()}
            <br />
            {this.state.showResult
              ? "Your answer was " +
                (this.state.correct ? "correct" : "incorrect")
              : ""}
            <br />
            <br />
            {this.state.revealAnswer ? (
              <br />
            ) : (
              <>
                <button onClick={this.checkAnswer}>Check answer</button>
                <br />
              </>
            )}

            <button type="submit" onClick={this.componentDidMount}>
              New question
            </button>
          </form>

          {this.state.revealAnswer ? (
            <br />
          ) : (
            <>
              <button onClick={this.revealAnswer}>Reveal answer</button>
              <br />
            </>
          )}
        </div>
      </>
    );
  }
}

export default withCookies(SkillQuestion);
