import React from "react";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import parse from "html-react-parser";

import { getSkill } from "../../api";
import templateQuestions from "./template_questions/templateQuestions";
import NavBar from "../navbar/NavBar";

class SkillQuestion extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            skillId: 0,
            skillName: '',
            question: {},
            answer: {},
            newQuestion: () => {},
        }
    }

    async componentDidMount() {
        const skillId = this.props.match.params.skillId;

        this.setState({
            skillId,
        }, async () => {
            const skill = await getSkill(this.state.skillId);
            const skillName = skill.skill_name;
            const newQuestion = templateQuestions[skill.skill_name];
            const question = newQuestion();
            this.setState({
                skillName,
                newQuestion,
                question,
            });
        });

    }

    render() {
        return (
            <>
                <NavBar/>
                <div>
                    <h1>{this.state.skillName}</h1>
                    {JSON.stringify(this.state.question)}
                </div>
            </>
        )
    }
}

export default withCookies(SkillQuestion);