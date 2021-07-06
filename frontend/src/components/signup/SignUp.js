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
                    <br/>

                    <div className="signup-wrapper">
                        <form className="signup-form">
                            <div className="signup-field">
                                <label className="signup-label">Email address*</label>
                                <input name="email" type="email" placeholder="Your email" />
                            </div>

                            <div className="signup-field">
                                <label className="signup-label">First Name*</label>
                                <input name="firstName" type="text" placeholder="Your name" />
                            </div>

                            <div className="signup-field">
                                <label className="signup-label">Last Name*</label>
                                <input name="lastName" type="text" placeholder="Surname" />
                            </div>


                            <div className="signup-field">
                                <label className="signup-label">Password*</label>
                                <input name="password" type="password" placeholder="Password" />
                            </div>

                            <div className="signup-field">
                                <label className="signup-label">Re-enter Password*</label>
                                <input  name="reenterPassword" type="password" placeholder="Password" />
                            </div>

                            <button id="signup-submit">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
}