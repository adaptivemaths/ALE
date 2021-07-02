import React from "react";
import NavBar from "../navbar/NavBar";
import "./practice.css";
import { Nav } from "react-bootstrap";

export default class Practice extends React.Component {
    render() {
        return (
            <div className="practice-wrapper">
                <NavBar/>
                <div className="practice-title">
                    Practice
                </div>
                <br/>
                <Nav.Link href="/practice/topics">
                    <span className="practice-btn">By Topic</span>
                </Nav.Link>
                <Nav.Link href="/practice/assessment">
                    <span className="practice-btn">Comprehensive Assessment</span>
                </Nav.Link>
            </div>
        )
    }
}