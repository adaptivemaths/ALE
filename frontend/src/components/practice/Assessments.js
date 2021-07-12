import React from "react";
import NavBar from "../navbar/NavBar";

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
                    <div>
                        {paper.GCSE_Paper_Name}
                    </div>
                ))}
            </div>
        );
    }
} 

export default Assessments;