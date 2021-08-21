import React from "react";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import parse from "html-react-parser";

import { getSkill } from "../../api";
import templateQuestions from "./template_questions/templateQuestions";
import NavBar from "../navbar/NavBar";
import "./SkillQuestion.css";

class SkillQuestion extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            skillId: 0,
            skillName: '',
            question: {
                text: '',
                values: [],
                checkAnswer: () => false,
            },
            answer: {},
            newQuestion: () => {},
            showResult: false,
            correct: false,
        }

        this.setNewQuestion = this.setNewQuestion.bind(this);
        this.setAnswer = this.setAnswer.bind(this);
        this.checkAnswer = this.checkAnswer.bind(this);
    }

    async componentDidMount() {
        const skillId = this.props.match.params.skillId;
        const skill = await getSkill(skillId);
        const skillName = skill.skill_name;
        const newQuestion = templateQuestions[skillName];
        const question = newQuestion();

        this.setState({
            skillId,
            skillName,
            newQuestion,
            question,
        });

    }

    setAnswer(event) {
        if (this.state.showResult) {
            return;
        }
        this.state.answer[event.target.name] = event.target.value;
    }

    displayQuestion() {
        
        return (
            <>
                {parse(this.state.question.text)}<br/>
                {this.state.question.values.map((val) => (
                    <>  
                        <label>
                            {val}=
                            <input 
                                name={val} 
                                type='text' 
                                value={this.state.answer[val]}
                                onChange={this.setAnswer}
                            >
                            </input>
                        </label>
                        <br/>
                    </>
                ))}
            </>
        )
    }

    setNewQuestion() {
        const question = this.state.newQuestion();
        this.setState({
            showResult: false,
            question,
        });
        
    }

    checkAnswer(event) {
        event.preventDefault();
        this.setState({
            showResult: true,
            correct: this.state.question.checkAnswer(this.state.answer),
        })
    }

    render() {
        return (
            <>
                <NavBar/>
                <div className="skill-container">
                    <h1>{this.state.skillName}</h1>
                    <form>
                        {this.displayQuestion()}
                        {this.state.showResult ? 
                            'Your answer was ' + (this.state.correct ? 'correct' : 'incorrect') : ''}
                        <br/>
                        <button onClick={this.checkAnswer}>Check answer</button>
                        <br/>
                        <button type="submit" onClick={this.setNewQuestion}>New question</button>
                    </form>
                </div>
            </>
        )
    }
}

export default withCookies(SkillQuestion);