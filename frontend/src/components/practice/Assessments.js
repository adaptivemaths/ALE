import React from "react";
import NavBar from "../navbar/NavBar";
import { Nav } from "react-bootstrap";
import { getPaperNames } from "../../api";

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
                {this.state.paperNames.map(paper => (
                    <Nav.Link href={`/practice/assessments/${paper.GCSE_Paper_Name}/`}>
                        {paper.GCSE_Paper_Name}
                    </Nav.Link>
                ))}
            </div>
        );
    }
} 

export default Assessments;