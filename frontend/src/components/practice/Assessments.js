import React from "react";
import NavBar from "../navbar/NavBar";
import { Nav } from "react-bootstrap";
import { getPaperInfo, getPaperNames } from "../../api";
import "./assessments.css";

class Assessments extends React.Component {
    constructor() {
        super();
        this.state = {
            papers: []
        }
    }

    async componentDidMount() {
        const papers = await getPaperNames();

        this.setState({
            papers
        });
    }

    render() {
        return (
            <div>
                <NavBar/><br/>
                <h1>All papers</h1>
                <div className="assessments-container">
                    {this.state.papers.map((paper) => (
                            <Nav.Link href={`/practice/assessments/${paper.test_id}/`}>
                                <div className="assessment-card">
                                    {paper.title}
                                </div>
                            </Nav.Link>
                    ))}
                </div>
            </div>
        );
    }
} 

export default Assessments;