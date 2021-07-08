import React from "react";
import NavBar from "../navbar/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";
import { loginUser } from "../../api";
import { Redirect } from "react-router-dom";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            loggedIn: false,
            error: false
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    async handleSubmit(event) {
        event.preventDefault();
        if (await loginUser(this.state)) {
            this.setState({
                loggedIn: true,
                error: false
            })
        } else {
            console.log('error');
            this.setState({
                error: true
            })
        }
    }

    render() {
        if (this.state.loggedIn) {
            return <Redirect push to="/profile"/>;
        }
        return (
           <div>
                <NavBar/>
                
                <div className="login-title">
                    Login
                </div>

                <div className="login-wrapper">
                    <form>
                        <span className="login-form">
                            {this.state.error ? "There was an issue with your username and password" : ""}
                            {this.state.loggedIn ? `You are logged in now!` : ""}
                            <div className="login-field">
                                <label className="login-label">Username</label>
                                <input name="username" type="email" placeholder="Enter email" 
                                value={this.state.username} onChange={this.handleChange}/>
                            </div>

                            <div className="login-field">
                                <label className="login-label">Password</label>
                                <input name="password" type="password" placeholder="Password" 
                                value={this.state.password} onChange={this.handleChange}/>
                            </div>

                            <button id="login-submit" onClick={this.handleSubmit}>
                                Login
                            </button>
                        </span>
                    </form>
                </div>
            </div>
        );
    }
}