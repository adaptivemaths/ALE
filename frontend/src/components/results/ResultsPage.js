import React from "react";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import "./ResultsPage.css";
import NavBar from "../navbar/NavBar";
import { getAnswers } from "../../api";

class ResultsPage extends React.Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor() {
        super();
        this.state = {
            paperName: "",
            correct: 0,
            questions: []
        }
    }

    componentDidMount() {
        const username = this.props.cookies.get('username');
        this.setState({
            paperName: this.props.match.params.paperName,
        }, () => this.loadAnswers(username));
    }

    async loadAnswers(username) {
        this.setState({paperName: this.props.match.params.paperName}, async () => {
            const questions = await getAnswers({
                username,
                GCSE_Paper_Name: this.state.paperName
            });
            console.log('questions', questions);
            this.setState({
                questions,
                questionsLoaded: true,
                showResults: true,
            },  () => this.calculateCorrectAnswers())
        });
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
            <div>
                <NavBar/>
                <h1>Results for {this.state.paperName}</h1>

                <h2>{`You got ${this.state.correct} out of ${this.state.questions.length} correct`}</h2>
                    
            </div>
        )
    }
}

export default withCookies(ResultsPage);