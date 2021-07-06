import React from "react";
import NavBar from "../navbar/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";
import { loginUser } from "../../api";

export default class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: ""
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    handleSubmit(event) {
        if (loginUser(this.state)) {
            console.log("logged in");
        } else {
            event.preventDefault();
        }
    }

    render() {
        return (
           <div>
                <NavBar/>
                
                <div className="login-title">
                    Login
                </div>

                <div className="login-wrapper">
                    <form>
                        <span className="login-form">
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