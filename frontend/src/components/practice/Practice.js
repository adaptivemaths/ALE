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
                    <div className="btn">By Topic</div>
                </Nav.Link>
                <Nav.Link href="/practice/assessment">
                    <div className="btn">Comprehensive Assessment</div>
                </Nav.Link>
            </div>
        )
    }
}