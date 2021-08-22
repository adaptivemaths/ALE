import React from "react";
import NavBar from "../navbar/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./login.css";
import { getUserDetails, loginUser } from "../../api";
import { Redirect } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class Login extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      loggedIn: false,
      error: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  async handleSubmit(event) {
    event.preventDefault();

    if (await loginUser(this.state)) {
      const { cookies } = this.props;
      // Get stored details about user from database using email as username
      const user = await getUserDetails({
        username: this.state.username,
      });
      // Set cookie for userId for all pages
      cookies.set("userId", user.user_id, { path: "/" });

      this.setState({
        loggedIn: true,
        error: false,
      });
    } else {
      this.setState({
        error: true,
      });
    }
  }

  render() {
    // If user has logged in successfully redirect them to their profile page
    if (this.state.loggedIn) {
      return <Redirect push to="/profile/" />;
    }
    return (
      <div>
        <NavBar />

        <div className="login-title">Login</div>

        <div className="login-wrapper">
          <form>
            <span className="login-form">
              {this.state.error
                ? "There was an issue with your username and password"
                : ""}
              {this.state.loggedIn ? `You are logged in now!` : ""}
              <div className="login-field">
                <label className="login-label">Username</label>
                <input
                  name="username"
                  type="email"
                  placeholder="Enter email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </div>

              <div className="login-field">
                <label className="login-label">Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
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

export default withCookies(Login);
