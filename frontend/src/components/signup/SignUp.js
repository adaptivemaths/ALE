import React from "react";
import NavBar from "../navbar/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./signup.css";
import { addUser } from "../../api";

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            email: "",
            firstName: "",
            lastName: "",
            password: "",
            reenterPassword: "",
            passwordsAreSame: true,
            passwordIsLong: false,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
        }, () => {
                this.setState({
                    passwordsAreSame: this.state.password ===  this.state.reenterPassword,
                    passwordIsLong: this.state.password.length > 7
                });
            }
        );

    }

    handleSubmit(event) {
        if (this.state.passwordsAreSame && 
            this.state.passwordIsLong) {
            addUser(this.state);
        }
        event.preventDefault();
    }

    render() {
        return (
            <>
                <NavBar/>
                    <div className="signup-title">
                        Sign Up
                    </div>

                    <div className="signup-wrapper">
                        <form className="signup-form">
                            <div className="signup-field">
                                <label className="signup-label">Email address*</label>
                                <input name="email" type="email" placeholder="Your email" 
                                    value={this.state.email} onChange={this.handleChange}/>
                            </div>

                            <div className="signup-field">
                                <label className="signup-label">First Name*</label>
                                <input name="firstName" type="text" placeholder="Your name" 
                                value={this.state.firstName} onChange={this.handleChange}/>
                            </div>

                            <div className="signup-field">
                                <label className="signup-label">Last Name*</label>
                                <input name="lastName" type="text" placeholder="Surname" 
                                value={this.state.lastName} onChange={this.handleChange}/>
                            </div>


                            <div className="signup-field">
                                <label className="signup-label">Password*</label>
                                <input name="password" type="password" placeholder="Password" 
                                value={this.state.password} onChange={this.handleChange}/>
                                {this.state.passwordIsLong ? "" : "Passwords should be at least 8 characters"}
                            </div>
                            

                            <div className="signup-field">
                                <label className="signup-label">Re-enter Password*</label>
                                <input  name="reenterPassword" type="password" placeholder="Password" 
                                value={this.state.reenterPassword} onChange={this.handleChange}/>
                                {this.state.passwordsAreSame ? "" : "Passwords are not the same"}
                            </div>

                            

                            <button id="signup-submit" onClick={this.handleSubmit}>
                                Submit
                            </button>
                        </form>
                    </div>
            </>
        );
    }
}