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
            question.correct = false;
            if (question.answer == question.QUESTION_ANSWER) {
                correct++;
                question.correct = true;
            }
        }

        this.setState({correct});
    }

    topicsAccuracy() {
        const questions = this.state.questions;
        const topics = []
        const accuracy = {}
        for (let question of questions) {
            if (!topics.includes(question.TOPIC)) {
                topics.push(question.TOPIC);
                accuracy[question.TOPIC] = {
                    correct: 0,
                    total: 0,
                }
            }
            let correct = accuracy[question.TOPIC].correct;
            if (question.correct) {
                correct++;
            }
            let total = accuracy[question.TOPIC].total;
            total++;
            accuracy[question.TOPIC] = {
                correct,
                total,
            }
        }
        return (
            <>
                <h3>Accuracy by topic</h3><br/>
                {topics.map((topic) => (
                    <div>
                        {topic}: {(100 * accuracy[topic].correct / accuracy[topic].total).toFixed(2)}%<br/>
                    </div>
                ))}
            </>  
        );
    }

    render() {
        return (
            <>
                <NavBar/>
                <div className="results-container">
                    <h1>Results for {this.state.paperName}</h1>
                    <br/>
                    <h2>{`You got ${(100 * this.state.correct / this.state.questions.length).toFixed(2)}% overall`}</h2><br/>
                    {this.topicsAccuracy()}
                </div>
            </>
        )
    }
}

export default withCookies(ResultsPage);