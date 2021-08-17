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

    async componentDidMount() {
        const userId = this.props.cookies.get('userId');
        await this.loadAnswers(userId);
    }

    async loadAnswers(userId) {
        this.setState({
                paperName: this.props.match.params.paperName
            }, async () => {
            const questions = await getAnswers({
                userId,
                GCSE_Paper_Name: this.state.paperName,
            });
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
            if (question.QUESTION_ANSWER.split(';').includes(question.answer)) {
                correct++;
                question.correct = true;
            }
        }

        this.setState({
            correct,
        });
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
                correct += question.QUESTION_MARKS;
            }
            let total = accuracy[question.TOPIC].total;
            total += question.QUESTION_MARKS;
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

    marksScore() {
        let correct = 0;
        let total = 0;
        for (let question of this.state.questions) {
            total += question.QUESTION_MARKS;
            if (question.correct) {
                correct += question.QUESTION_MARKS;
            }
        }
        let score = (100 * correct / total).toFixed(2)
        return (
            <>
                <h2>{`You got ${score}% overall`}</h2><br/>
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
                    {this.marksScore()}
                    {this.topicsAccuracy()}
                </div>
            </>
        )
    }
}

export default withCookies(ResultsPage);