import React from "react";
import NavBar from "../navbar/NavBar";
import { getQuestions } from "../../api";
import "./question.css";

export default class QuestionPage extends React.Component {
    constructor() {
        super();
        this.state = {
            paperName: "",
            questions: [],
            currentQuestion: 0,
            questionsLoaded: false,
            currentAnswer: "",
            showResults: false
        }

        this.nextQuestion = this.nextQuestion.bind(this);
        this.previousQuestion = this.previousQuestion.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    async componentDidMount() {
        this.setState({paperName: this.props.match.params.paperName}, async () => {
            const questions = await getQuestions({
                GCSE_Paper_Name: this.state.paperName
            });
            questions.forEach(q => {q.answer = ""})
            this.setState({
                questions,
                questionsLoaded: true
            })
        });
    }

    getCurrentQuestion() {
        return this.state.questions[this.state.currentQuestion];
    }

    nextQuestion(event) {
        event.preventDefault();
        this.state.questions[this.state.currentQuestion].answer = this.state.currentAnswer;
        console.log(this.getCurrentQuestion().answer)
        this.setState({
            currentQuestion: (this.state.currentQuestion + 1) % this.state.questions.length
        }, () => {
            this.setState({
                currentAnswer: this.getCurrentQuestion().answer
            })
        });
    }

    previousQuestion(event) {
        event.preventDefault();
        this.state.questions[this.state.currentQuestion].answer = this.state.currentAnswer;

        if (this.state.currentQuestion === 0) 
            return

        this.setState({
            currentQuestion: (this.state.currentQuestion - 1) % this.state.questions.length
        }, () => {
            this.setState({
                currentAnswer: this.getCurrentQuestion().answer
            })
        });


    }

    setAnswer(event) {
        this.setState({
            currentAnswer: event.target.value
        }, () => console.log(this.state.currentAnswer));
    }

    onSubmit(event) {
        event.preventDefault()
        this.state.questions[this.state.currentQuestion].answer = this.state.currentAnswer;

        this.setState({
            showResults: true
        });
        this.calculateCorrectAnswers()
    }

    buttons() {
        return (
            <div className="question-buttons">

                <button onClick={this.previousQuestion} id="question-back">
                    &lt; Back
                </button>
                {this.state.showResults ? "" :
                <button onClick={this.nextQuestion} id="question-skip">
                    Skip
                </button>
                }

                <button onClick={this.nextQuestion} id="question-next">
                    Next &gt;
                </button>

            </div>
        );
    }

    displayQuestion() {
        return (
            <div className="question-container">
                <div className="">
                    <div className="question-number">
                        Question&nbsp;
                        {this.getCurrentQuestion().QUESTION_NUMBER + '.' + 
                        (this.getCurrentQuestion().SUB_QUESTION_NO ? 
                        this.getCurrentQuestion().SUB_QUESTION_NO : "")}
                    </div>

                    <div className="question-text">
                        {this.getCurrentQuestion().QUESTION_TEXT}
                    </div>

                    <div className="question-instructions"> 
                        {this.getCurrentQuestion().QUESTION_INSTRUCTIONS}
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
        return this.getCurrentQuestion().QUESTION_TYPE === "MCQ" ? 
                <>
                    <div className="options-container">
                        Options: <br/>
                        <div className="option-container">
                            <input name="answer" type="radio"
                                    value={this.getCurrentQuestion().QUESTION_OPTION_1}
                                    checked={this.state.currentAnswer === this.getCurrentQuestion().QUESTION_OPTION_1}
                                    onChange={this.setAnswer}>
                            </input>
                        </div>
                        <div className="question-option">
                                {this.getCurrentQuestion().QUESTION_OPTION_1}<br/>
                        </div>
                        

                        <input name="answer" type="radio" id="question-option2"
                                value={this.getCurrentQuestion().QUESTION_OPTION_2}
                                checked={this.state.currentAnswer === this.getCurrentQuestion().QUESTION_OPTION_2}
                                onChange={this.setAnswer}>
                        </input>
                        <div className="question-option">
                            {this.getCurrentQuestion().QUESTION_OPTION_2}<br/>
                        </div>

                        <input name="answer" type="radio" id="question-option3" 
                                value={this.getCurrentQuestion().QUESTION_OPTION_3}
                                checked={this.state.currentAnswer === this.getCurrentQuestion().QUESTION_OPTION_3}
                                onChange={this.setAnswer}>
                        </input>
                        <div className="question-option">
                            {this.getCurrentQuestion().QUESTION_OPTION_3}<br/>
                        </div>

                        <input name="answer" type="radio" id="question-option4"
                                value={this.getCurrentQuestion().QUESTION_OPTION_4}
                                checked={this.state.currentAnswer === this.getCurrentQuestion().QUESTION_OPTION_4}
                                onChange={this.setAnswer}>
                        </input>
                        <div className="question-option">
                            {this.getCurrentQuestion().QUESTION_OPTION_4}<br/>
                        </div>

                    </div> 
                </>
            
                 :
                    <>
                        Answer:
                        <input value={this.state.currentAnswer} onChange={this.setAnswer}></input>
                        <br/>
                        <br/>
                    </>

        ;
    }

    calculateCorrectAnswers() {
        let correct = 0;
        for (let question of this.state.questions) {
            if (question.answer == question.QUESTION_ANSWER) {
                correct++;
            }
        }

        this.setState({correct});
    }

    render() {
        return (
        this.state.questionsLoaded ? (
            <>
                <NavBar/>
                <h1>{this.state.showResults ? "Results for " : ""}{this.state.paperName}</h1> <br/>
                <div className="question-page-container">
                    {this.state.showResults ? 
                    <h2>{`You got ${this.state.correct} out of ${this.state.questions.length} correct`}</h2> : ""}
                    {this.buttons()}

                    {this.displayQuestion()}

                    {this.answerInput()}
                    
                    {this.state.showResults ?
                    <>
                        Correct answer: {this.getCurrentQuestion().QUESTION_ANSWER}
                    </>
                    :
                    <button id="question-submit" onClick={this.onSubmit}>
                        Submit all
                    </button>
                    }
                </div>
            </>
            )
            : ""
        );
    }
}