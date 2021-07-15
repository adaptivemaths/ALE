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
            questionsLoaded: false
        }

        this.nextQuestion = this.nextQuestion.bind(this);
        this.previousQuestion = this.previousQuestion.bind(this);
    }
    
    async componentDidMount() {
        this.setState({paperName: this.props.match.params.paperName}, async () => {
            const questions = await getQuestions({
                GCSE_Paper_Name: this.state.paperName
            });
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
        this.setState({
            currentQuestion: (this.state.currentQuestion + 1) % this.state.questions.length
        });
    }

    previousQuestion(event) {
        event.preventDefault();
        if (this.state.currentQuestion === 0) 
            return
        this.setState({
            currentQuestion: (this.state.currentQuestion - 1) % this.state.questions.length
        });
    }

    render() {
        return (
        this.state.questionsLoaded ? (
            <div className="question-page-container">
                <h1>{this.state.paperName}</h1> <br/>
                <div className="question-buttons">

                    <button onClick={this.previousQuestion} id="question-back">
                        &lt; Back
                    </button>

                    <button onClick={this.nextQuestion} id="question-skip">
                        Skip
                    </button>

                    <button onClick={this.nextQuestion} id="question-next">
                        Next &gt;
                    </button>

                </div>
                <div className="question-container">
                    <div className="">
                        <div className="question-number">
                            Question:&nbsp;
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

                {this.getCurrentQuestion().QUESTION_TYPE === "MCQ" ?
                        <>
                            <div className="options-container">
                                Options: <br/>
                                <div className="question-option">
                                    {this.getCurrentQuestion().QUESTION_OPTION_1}
                                </div>   
                                            
                                <div className="question-option">
                                    {this.getCurrentQuestion().QUESTION_OPTION_2}
                                </div>

                                <div className="question-option">
                                    {this.getCurrentQuestion().QUESTION_OPTION_3}
                                </div>

                                <div className="question-option">
                                    {this.getCurrentQuestion().QUESTION_OPTION_4}
                                </div>
                            </div> 
                        </> :
                        <>
                            Answer:
                            <input></input>
                            <br/>
                        </>
                }

                <button id="question-submit">
                    Submit
                </button>
            </div>
            )
            : ""
        );
    }
}