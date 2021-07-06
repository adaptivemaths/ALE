import React from "react";
import NavBar from "../navbar/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";

export default class Login extends React.Component {
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
                                <input name="email" type="email" placeholder="Enter email" />
                            </div>

                            <div className="login-field">
                                <label className="login-label">Password</label>
                                <input name="password" type="password" placeholder="Password" />
                            </div>

                            <button id="login-submit">
                                Login
                            </button>
                        </span>
                    </form>
                </div>
            </div>
        );
    }
}