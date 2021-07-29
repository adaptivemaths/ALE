import React from "react";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import "./ResultsPage.css";
import NavBar from "../navbar/NavBar";

class ResultsPage extends React.Component {
    
    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor() {
        super();
        this.state = {
            paperName: "",
        }
    }

    componentDidMount() {
        this.setState({
            paperName: this.props.match.params.paperName,
        });
    }

    render() {
        return (
            <div>
                <NavBar/>
                <h1>Results for {this.state.paperName}</h1>
            </div>
        )
    }
}

export default withCookies(ResultsPage);