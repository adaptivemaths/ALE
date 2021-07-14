import React from "react";
import NavBar from "../navbar/NavBar";
import { getQuestions } from "../../api";

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
        this.setState({
            currentQuestion: (this.state.currentQuestion - 1) % this.state.questions.length
        });
    }

    render() {
        return (
        this.state.questionsLoaded ? (
                <div>
                    <button onClick={this.previousQuestion}>
                        <span>Back</span> 
                    </button>

                    <button onClick={this.nextQuestion}>
                        <span>Skip</span> 
                    </button>

                    <button onClick={this.nextQuestion}>
                        <span>Next</span> 
                    </button>

                    <button>
                        <span>Submit</span>
                    </button>
                    <div>
                        <div>
                            {this.getCurrentQuestion().QUESTION_NUMBER + '.' + 
                            (this.getCurrentQuestion().SUB_QUESTION_NO ? this.getCurrentQuestion().SUB_QUESTION_NO : "")}
                        </div>

                        <div>
                            {this.getCurrentQuestion().QUESTION_TEXT}
                        </div>

                        <div> 
                            {this.getCurrentQuestion().QUESTION_INSTRUCTIONS}
                        </div>

                        <div>
                            Marks: {this.getCurrentQuestion().QUESTION_MARKS}
                        </div>

                        <div>
                            Difficulty: {this.getCurrentQuestion().GRD_DIFFICULTY}
                        </div>

                        <div>
                            Topic: {this.getCurrentQuestion().TOPIC}
                        </div>
                    </div>

                    <div>
                            <div>
                                {this.getCurrentQuestion().QUESTION_OPTION_1}
                            </div>   
                                        
                            <div>
                                {this.getCurrentQuestion().QUESTION_OPTION_2}
                            </div>

                            <div>
                                {this.getCurrentQuestion().QUESTION_OPTION_3}
                            </div>

                            <div>
                                {this.getCurrentQuestion().QUESTION_OPTION_4}
                            </div>


                    </div> 
                </div>
            )
            : ""
        );
    }
}