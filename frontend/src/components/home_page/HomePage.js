import React from "react";
import "./homePage.css";
import NavBar from "../navbar/NavBar";
import laptop from "./laptop.svg";
import MailingListForm from "./MailingListForm";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import { Redirect } from "react-router";

class HomePage extends React.Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
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
        if (this.props.cookies.get('username')) {
            return <Redirect push to="/profile/"/>;
        }
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

export default withCookies(HomePage);