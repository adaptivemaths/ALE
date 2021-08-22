import React from "react";
import NavBar from "../navbar/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./signup.css";
import { addUser } from "../../api";
import { Redirect } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class SignUp extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      password: "",
      reenterPassword: "",
      passwordsAreSame: true,
      passwordIsLong: false,
      signedUp: false,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    // Function to set value of form fields
    this.setState(
      {
        [event.target.name]: event.target.value,
      },
      () => {
        // Checks for password strength
        this.setState({
          passwordsAreSame: this.state.password === this.state.reenterPassword,
          passwordIsLong: this.state.password.length > 7,
        });
      }
    );
  }

  async handleSubmit(event) {
    event.preventDefault(); // To prevent input boxes being reset to empty
    if (this.state.passwordsAreSame && this.state.passwordIsLong) {
      // Add user to database
      const user = await addUser(this.state);

      this.setState(
        {
          signedUp: true,
        },
        () => {
          const { cookies } = this.props;
          // Set cookie for userId for all pages
          cookies.set("userId", this.state.user_id, { path: "/" });
        }
      );
    }
  }

  render() {
    // Redirect to profile page if user has successfully submitted form
    if (this.state.signedUp) {
      return <Redirect push to="/profile/" />;
    }

    return (
      <>
        <NavBar />
        <div className="signup-title">Sign Up</div>

        <div className="signup-wrapper">
          <form className="signup-form">
            <div className="signup-field">
              {/* Input box for email */}
              <label className="signup-label">
                Email address*
                <input
                  name="email"
                  type="email"
                  placeholder="Your email"
                  value={this.state.email}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div className="signup-field">
              {/* Input box for email */}
              <label className="signup-label">
                First Name*
                <input
                  name="firstName"
                  type="text"
                  placeholder="Your name"
                  value={this.state.firstName}
                  onChange={this.handleChange}
                />
              </label>
            </div>

            <div className="signup-field">
              <label className="signup-label">Last Name*</label>
              <input
                name="lastName"
                type="text"
                placeholder="Surname"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </div>

            <div className="signup-field">
              <label className="signup-label">Password*</label>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              {this.state.passwordIsLong
                ? ""
                : "Passwords should be at least 8 characters"}
            </div>

            <div className="signup-field">
              <label className="signup-label">Re-enter Password*</label>
              <input
                name="reenterPassword"
                type="password"
                placeholder="Password"
                value={this.state.reenterPassword}
                onChange={this.handleChange}
              />
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

export default withCookies(SignUp);
