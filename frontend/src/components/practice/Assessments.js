import React from "react";
import NavBar from "../navbar/NavBar";
import { Nav } from "react-bootstrap";
import { getPaperNames } from "../../api";
import "./assessments.css";

class Assessments extends React.Component {
    constructor() {
        super();
        this.state = {
            paperNames: []
        }
    }

    async componentDidMount() {
        const paperNames = await getPaperNames();
        this.setState({
            paperNames: paperNames
        });
    }

    render() {
        return (
            <div>
                <NavBar/><br/>
                <h1>All papers</h1>
                <div className="assessments-container">
                    {this.state.paperNames.map(paper => (
                        <Nav.Link href={`/practice/assessments/${paper.GCSE_Paper_Name}/`}>
                            <div className="assessment-card">
                                {paper.GCSE_Paper_Name}
                            </div>
                        </Nav.Link>
                    ))}
                </div>
            </div>
        );
    }
} 

export default Assessments;