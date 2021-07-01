import React from "react";
import NavBar from "../navbar/NavBar";
import "./topic.css";

const skills = {
    "Algebra": [
        "Quadratic Equations",
    ],
    "Geometry": [

    ],
    "Trigonometry": [

    ],
    "Probability": [

    ],
    "Statistics": [

    ],
}

export default class Topic extends React.Component {
    constructor() {
        super();
        this.state = {
            topic: ""
        }
    }
    componentDidMount() {
        this.setState({topic: this.props.match.params.topic});
    }

    render() {
        return (
            <div className="topic-wrapper">
                <NavBar/>
                <div className="topic-title">
                    {this.state.topic}
                </div>
            </div>
        )
    }
}