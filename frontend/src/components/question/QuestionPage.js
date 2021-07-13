import React from "react";
import NavBar from "../navbar/NavBar";
import { getQuestions } from "../../api";

export default class QuestionPage extends React.Component {
    constructor() {
        super();
        this.state = {
            paperName: "",
            questions: [],
            currentQuestion: 0
        }
    }
    
    async componentDidMount() {
        this.setState({paperName: this.props.match.params.paperName}, async () => {
            const questions = await getQuestions({
                GCSE_Paper_Name: this.state.paperName
            });
            this.setState({questions})
        });
    }

    render() {
        return (
            <div>
                {JSON.stringify(this.state.questions[this.state.currentQuestion])}
            </div>
        );
    }
}