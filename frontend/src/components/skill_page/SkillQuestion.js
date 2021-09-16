import React from "react";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import parse from "html-react-parser";
import Button from "react-bootstrap/Button";

import { addAnswerToPoints, getSkill } from "../../api";
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
      skill: null,
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
      skill,
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
      <div className="skill-question">
        {parse(this.state.question.text.replaceAll("\n", "<br/>"))}
        <br />
        {/* If user has clicked the Reveal Answer button then display the correct answer 
                    instead of the input boxes
                */}
        {this.state.revealAnswer ? this.correctAnswer() : this.answerInput()}
      </div>
    );
  }

  answerInput() {
    return (
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
    );
  }

  correctAnswer() {
    return (
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
    const userId = this.props.cookies.get("userId");
    this.setState(
      {
        showResult: true,
        correct: this.state.question.checkAnswer(this.state.answer),
        attempts: this.state.attempts + 1,
      },
      async () =>
        await addAnswerToPoints(userId, this.state.skill.lo, this.state.correct)
    );
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

          {this.state.skill && (
            <>
              Learning outcome:&nbsp;
              <Button
                variant="outline-secondary"
                onClick={() =>
                  window.open(
                    `https://www.bossmaths.com/${this.state.skill.sub_lo.toLowerCase()}`,
                    "_blank"
                  )
                }
              >
                {this.state.skill.sub_lo}
              </Button>
              <br />
              <br />
            </>
          )}

          <form>
            {this.displayQuestion()}
            <br />

            {this.state.showResult &&
              "Your answer is " +
                (this.state.correct ? "correct :)" : "incorrect :(")}
            <br />
            <br />
            {!this.state.revealAnswer && (
              <>
                <Button variant="outline-success" onClick={this.checkAnswer}>
                  Check answer
                </Button>
              </>
            )}

            <Button
              variant="primary"
              type="submit"
              onClick={this.componentDidMount}
            >
              New question
            </Button>

            {!this.state.revealAnswer && (
              <>
                <Button variant="outline-warning" onClick={this.revealAnswer}>
                  Reveal answer
                </Button>
              </>
            )}
          </form>
        </div>
      </>
    );
  }
}

export default withCookies(SkillQuestion);
