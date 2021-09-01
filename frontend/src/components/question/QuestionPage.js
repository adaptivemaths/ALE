import React from "react";
import { Redirect } from "react-router";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { Nav } from "react-bootstrap";
import NavBar from "../navbar/NavBar";
import {
  getQuestions,
  addAnswer,
  getSubmittedTests,
  getAnswers,
  deleteAnswers,
  getPaperInfo,
} from "../../api";
import "./question.css";
import parse from "html-react-parser";
import Timer from "./Timer";
import Graph from "./Graph";

class QuestionPage extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      testId: "",
      questions: [],
      currentQuestion: 0,
      questionsLoaded: false,
      currentAnswer: "",
      showResults: false,
    };

    this.nextQuestion = this.nextQuestion.bind(this);
    this.previousQuestion = this.previousQuestion.bind(this);
    this.skipQuestion = this.skipQuestion.bind(this);
    this.setAnswer = this.setAnswer.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.redoTest = this.redoTest.bind(this);
  }

  async resetState() {
    this.setState({
      testId: "",
      paper: {
        title: "",
      },
      questions: [],
      currentQuestion: 0,
      questionsLoaded: false,
      currentAnswer: "",
      showResults: false,
    });
  }

  async componentDidMount() {
    // Get current userId
    const userId = this.props.cookies.get("userId");
    // Get codes of submitted tests
    const completedTests = await getSubmittedTests({
      userId,
    });
    // Get code of current paper (url parameter)
    const testId = this.props.match.params.testId;
    const paper = await getPaperInfo({
      testId,
    });
    this.setState(
      {
        testId,
        paper,
      },
      async () => {
        // If paper has already been submitted then load the answers for reviewing
        if (
          !completedTests
            .map((paper) => paper.GCSE_Paper_Name)
            .includes(this.state.testId)
        ) {
          await this.loadQuestions();
        } else {
          await this.loadAnswers(userId);
        }
      }
    );
  }

  componentWillUnmount() {
    clearInterval(this.state.timerIntervalId);
  }

  async loadQuestions() {
    const testId = this.props.match.params.testId;
    this.setState(
      {
        testId,
      },
      async () => {
        const questions = await getQuestions({
          testId,
        });
        console.log("questions", questions);
        questions.forEach((q) => {
          q.answer = "";
        });
        this.setState({
          questions,
          questionsLoaded: true,
        });
      }
    );
  }

  async loadAnswers(userId) {
    const testId = this.props.match.params.testId;
    this.setState(
      {
        testId,
      },
      async () => {
        const questions = await getAnswers({
          userId,
          testId,
        });
        console.log("questions", questions);
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

  getCurrentQuestion() {
    return this.state.questions[this.state.currentQuestion];
  }

  nextQuestion(event) {
    event.preventDefault();
    // Sets answer for current question in array
    this.state.questions[this.state.currentQuestion].answer =
      this.state.currentAnswer;
    // Increment index of current question (wraps to first question)
    this.setState(
      {
        currentQuestion:
          (this.state.currentQuestion + 1) % this.state.questions.length,
      },
      () => {
        // User's answer for new question
        this.setState({
          currentAnswer: this.getCurrentQuestion().answer,
        });
      }
    );
  }

  previousQuestion(event) {
    event.preventDefault();
    // Sets answer for current question in array
    this.state.questions[this.state.currentQuestion].answer =
      this.state.currentAnswer;

    if (this.state.currentQuestion === 0) return;
    // Decrement index of current question (wraps to end)
    this.setState(
      {
        currentQuestion:
          (this.state.currentQuestion - 1) % this.state.questions.length,
      },
      () => {
        // User's answer for new question
        this.setState({
          currentAnswer: this.getCurrentQuestion().answer,
        });
      }
    );
  }

  skipQuestion(event) {
    // Reset user's answer for current question and go to next question
    this.setState(
      {
        currentAnswer: "",
      },
      () => this.nextQuestion(event)
    );
  }

  setAnswer(event) {
    this.setState({
      currentAnswer: event.target.value,
    });
  }

  onSubmit(event) {
    event.preventDefault();
    // Set answer for current question object in array
    this.state.questions[this.state.currentQuestion].answer =
      this.state.currentAnswer;

    // Set showResults to true
    this.setState({
      showResults: true,
    });

    this.calculateCorrectAnswers();

    const userId = this.props.cookies.get("userId");

    this.state.questions.forEach((question) => {
      const answer = {
        userId,
        question_id: question.question_id,
        answer: question.answer,
      };
      // Add each answer to the database
      addAnswer(answer);
    });

    // clear timer interval
    clearInterval(this.state.timerIntervalId);
  }

  buttons() {
    return (
      <div className="question-buttons">
        <button onClick={this.previousQuestion} id="question-back">
          &lt; Back
        </button>

        {this.state.showResults ? (
          ""
        ) : (
          <button onClick={this.skipQuestion} id="question-skip">
            Skip
          </button>
        )}

        <button onClick={this.nextQuestion} id="question-next">
          Next &gt;
        </button>
      </div>
    );
  }

  displayQuestion() {
    // Display information about the question
    return (
      <div className="question-container">
        <div className="">
          <div className="question-number">
            Question&nbsp;
            {this.getCurrentQuestion().QUESTION_NUMBER +
              "." +
              (this.getCurrentQuestion().SUB_QUESTION_NO
                ? this.getCurrentQuestion().SUB_QUESTION_NO
                : "")}
          </div>

          <div className="question-text">
            {parse(
              this.getCurrentQuestion().QUESTION_TEXT.replaceAll("\n", "<br/>")
            )}
          </div>

          <div className="question-instructions">
            <i>
              {this.getCurrentQuestion().QUESTION_INSTRUCTIONS.replaceAll(
                "\n",
                "<br/>"
              )}
            </i>
          </div>

          <div className="question-marks">
            Marks: {this.getCurrentQuestion().QUESTION_MARKS}
          </div>

          <div className="question-difficulty">
            Difficulty: {this.getCurrentQuestion().GRD_DIFFICULTY}
          </div>

          <div className="question-topic">
            Topic: {this.getCurrentQuestion().TOPIC}
          </div>
        </div>
      </div>
    );
  }

  answerInput() {
    // If question type is multiple choice then use radio buttons
    // Otherwise use one input box
    return this.getCurrentQuestion().QUESTION_TYPE === "MCQ" ? (
      <>
        <div className="options-container">
          Options: <br />
          <div className="option-container">
            <input
              name="answer"
              type="radio"
              value={this.getCurrentQuestion().QUESTION_OPTION_1}
              checked={
                this.state.currentAnswer ===
                this.getCurrentQuestion().QUESTION_OPTION_1
              }
              onChange={this.setAnswer}
            ></input>
          </div>
          <div className="question-option">
            {this.getCurrentQuestion().QUESTION_OPTION_1}
            <br />
          </div>
          <input
            name="answer"
            type="radio"
            id="question-option2"
            value={this.getCurrentQuestion().QUESTION_OPTION_2}
            checked={
              this.state.currentAnswer ===
              this.getCurrentQuestion().QUESTION_OPTION_2
            }
            onChange={this.setAnswer}
          ></input>
          <div className="question-option">
            {this.getCurrentQuestion().QUESTION_OPTION_2}
            <br />
          </div>
          <input
            name="answer"
            type="radio"
            id="question-option3"
            value={this.getCurrentQuestion().QUESTION_OPTION_3}
            checked={
              this.state.currentAnswer ===
              this.getCurrentQuestion().QUESTION_OPTION_3
            }
            onChange={this.setAnswer}
          ></input>
          <div className="question-option">
            {this.getCurrentQuestion().QUESTION_OPTION_3}
            <br />
          </div>
          <input
            name="answer"
            type="radio"
            id="question-option4"
            value={this.getCurrentQuestion().QUESTION_OPTION_4}
            checked={
              this.state.currentAnswer ===
              this.getCurrentQuestion().QUESTION_OPTION_4
            }
            onChange={this.setAnswer}
          ></input>
          <div className="question-option">
            {this.getCurrentQuestion().QUESTION_OPTION_4}
            <br />
          </div>
        </div>
      </>
    ) : (
      <>
        Answer:
        <input
          value={this.state.currentAnswer}
          onChange={this.setAnswer}
        ></input>
        <br />
        <br />
      </>
    );
  }

  calculateCorrectAnswers() {
    let correct = 0;
    for (let question of this.state.questions) {
      if (question.QUESTION_ANSWER.split(";").includes(question.answer)) {
        correct++;
      }
    }

    this.setState({
      correct,
    });
  }

  async redoTest(event) {
    event.preventDefault();
    const userId = this.props.cookies.get("userId");
    const testId = this.state.testId;
    // Delete all user answers for current test paper from database
    await deleteAnswers({
      userId,
      testId,
    });
    // Reset state
    await this.resetState().then(() =>
      this.setState({ testId }, () => this.componentDidMount())
    );
  }

  checkAnswer(userAnswer, correctAnswer) {
    // Display message when user reviews answers
    if (userAnswer === "") {
      return (
        <div>
          You skipped this question
          <br />
          The correct answer was
          <br />
          {parse(correctAnswer.split(";")[0])}
        </div>
      );
    }
    // Multiple valid solutions separated by semi-colon(s)
    if (correctAnswer.split(";").includes(userAnswer)) {
      return (
        <div>
          You gave the right answer:
          <br />
          {parse(userAnswer)}
        </div>
      );
    }
    return (
      <div>
        Your answer was incorrect
        <br />
        The correct answer was
        <br />
        {parse(correctAnswer)}
      </div>
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
        <h1>
          {this.state.showResults ? "Review your answers for " : ""}
          {this.state.paper.title}
        </h1>{" "}
        <br />
        <div className="question-page-container">
          {this.state.showResults ? (
            <div>
              <h2>
                You got {this.state.correct} / {this.state.questions.length}
                &nbsp; correct
              </h2>
              <Nav.Link href={`/assessments/results/${this.state.testId}`}>
                See detailed results
                <br />
              </Nav.Link>
            </div>
          ) : (
            ""
          )}

          {!this.state.showResults ? <Timer /> : ""}

          {this.buttons()}

          {this.displayQuestion()}
          <br />

          {this.state.showResults ? (
            <>
              {this.checkAnswer(
                this.getCurrentQuestion().answer,
                this.getCurrentQuestion().QUESTION_ANSWER
              )}
              <br />
              <div>
                <button onClick={this.redoTest}>Redo Test</button>
              </div>
            </>
          ) : (
            <>
              {this.answerInput()}

              <button id="question-submit" onClick={this.onSubmit}>
                Submit all
              </button>
            </>
          )}
        </div>
        <Graph />
      </>
    );
  }
}

export default withCookies(QuestionPage);
