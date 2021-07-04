import React from "react";
import "./homePage.css";
import NavBar from "../navbar/NavBar";
import laptop from "./laptop.svg";
import MailingListForm from "./MailingListForm";

export default class HomePage extends React.Component {
    constructor() {
        super();
        this.state = {
            email: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({email: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    render() {
        return (
            <div className="homepage">
                <NavBar />

                <div className="info">
                    <div className="big-info">
                        We personalise the way students learn Maths
                    </div>
                    <div className="small-info">
                        Our assessment platform learns your ability, creates questions that target your growth areas
                        and provides personalised learning recommendations
                    </div>
                </div>

                <MailingListForm/>
                <footer className="footer">
                    We'd love to talk to you, reach out at hello@adaptivemaths.co.uk
                </footer>
            </div>
        )
    }
}
