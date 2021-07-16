import React from "react";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import NavBar from "../navbar/NavBar";

class ResultsPage extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            questions: [],
            paperName: ""
        }
    }

    componentDidMount() {
        this.setState({
            questions: this.props.location.state.questions,
            paperName: this.props.location.state.paperName
        });
    }

    correctAnswers() {
        let correct = 0;
        for (let question of this.state.questions) {
            if (question.answer == question.QUESTION_ANSWER) {
                correct++;
            }
        }

        return correct;
    }

    render() {
        return (
            <div>
                <NavBar/>

                <h1>Results for {this.state.paperName}</h1>

                You got {this.correctAnswers()} / {this.state.questions.length} correct<br/>

                {this.state.questions.map((question, index) => (
                    (question.answer != question.QUESTION_ANSWER) ? 
                    <>
                        Question {index + 1}:<br/>
                        Your answer: {question.answer}<br/>
                        Correct answer: {question.QUESTION_ANSWER}<br/>
                        <br/>
                    </> : ""
                ))}
            </div>
        );
    }
}

export default withCookies(ResultsPage);