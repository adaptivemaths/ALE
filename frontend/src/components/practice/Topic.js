import React from "react";
import NavBar from "../navbar/NavBar";
import "./topic.css";

export default class Topic extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            learningObjective: this.props.learningObjective,
            question: {

            },
        }
    }
    
    componentDidMount() {
        
    }

    render() {
        return (
            <div className="topic-wrapper">
                <NavBar/>
                <div className="topic-title">
                    {this.state.topic}
                </div>
            </div>
        );
    }
}