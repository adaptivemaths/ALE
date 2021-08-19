import React from "react";
import NavBar from "../navbar/NavBar";
import "./topic.css";
import { getSkillsForTopic } from "../../api";

export default class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topic: "",
            skills: [],
        }
    }
    
    async componentDidMount() {
        this.setState({
            topic: this.props.match.params.topic,
        }, async () => {
            console.log('topic', this.state.topic);
            this.setState({
                skills: await getSkillsForTopic(this.state.topic),
            });
        });
    }

    skillsList() {
        return (
            <>
                {this.state.skills.map((skill) => (
                    <>
                        {skill.skill_name}<br/>
                    </>
                ))}
            </>
        )
    }

    render() {
        return (
            <div className="topic-wrapper">
                <NavBar/>
                <div className="topic-title">
                    {this.state.topic}
                </div>
                <br/>
                <div>
                    {this.skillsList()}
                </div>
            </div>
        );
    }
}