import React from "react";
import NavBar from "../navbar/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./signup.css";

export default class SignUp extends React.Component {
    render() {
        return (
            <>
                <NavBar/>
                <div className="signup-wrapper">
                    <div className="signup-title">
                        Sign Up
                    </div>


                    <form className="signup-form">
                        <div className="signup-field">
                            <label className="signup-label">First Name*</label>
                            <input type="text" placeholder="Your name" />
                        </div>

                        <div className="signup-field">
                            <label className="signup-label">Last Name*</label>
                            <input type="text" placeholder="Surname" />
                        </div>

                        <div className="signup-field">
                            <label className="signup-label">Email address*</label>
                            <input type="email" placeholder="Enter email" />
                        </div>

                        <div className="signup-field">
                            <label className="signup-label">Password*</label>
                            <input type="password" placeholder="Password" />
                        </div>

                        <div className="signup-field">
                            <label className="signup-label">Re-enter Password*</label>
                            <input type="password" placeholder="Password" />
                        </div>

                        <div className="signup-field">
                                <button id="submit">
                                    Submit
                                </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}