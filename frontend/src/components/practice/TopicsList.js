import React from "react";
import NavBar from "../navbar/NavBar";
import "./topics.css";
import { Nav } from "react-bootstrap";

const topics = [
    "Algebra",
    "Geometry",
    "Numbers",
    "Probability",
    "Statistics",
    "Ratios"
]


export default class TopicsList extends React.Component {
    render() {
        return (
            <div className="topics-wrapper">
                <NavBar/>
                <div className="topics-title">
                        Topics
                </div>
                <br/>
                <div>
                    {topics.map((topic) => (
                        <Nav.Link href={`/practice/topics/${topic}`} className="topics-link">
                            <span className="topics-btn">{topic}</span>
                        </Nav.Link>
                    ))}
                </div>
            </div>
        );
    }
}