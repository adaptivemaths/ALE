import React from "react";
import NavBar from "../navbar/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";

export default class Login extends React.Component {
    render() {
        return (
            <>
                <NavBar/>
                <div className="login-wrapper">
                    <div className="login-title">
                        Login
                    </div>
                    <form>
                        <div className="login-field">
                            <label className="login-label">Email address*</label>
                            <input type="email" placeholder="Enter email" />
                        </div>

                        <div className="login-field">
                            <label className="login-label">Password*</label>
                            <input type="password" placeholder="Password" />
                        </div>

                        <div className="login-field">
                                <button id="login-submit">
                                    Login
                                </button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
}