import React from "react";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap-floating-label";
import Button from "react-bootstrap/Button";
import NavBar from "../navbar/NavBar";
import "bootstrap/dist/css/bootstrap.css";
import "./Login.css";
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

    this.props.cookies.remove("userId", { path: "/" });
    this.props.cookies.remove("isAdmin", { path: "/" });
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.id]: event.target.value,
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

      const adminUsername = "hello@adaptivemaths.co.uk";
      if (this.state.username === adminUsername) {
        cookies.set("isAdmin", true, { path: "/" });
      }

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
      const { props } = this;
      const { cookies } = props;
      if (cookies.get("isAdmin")) {
        return <Redirect push to="/admin/home" />;
      }
      return <Redirect push to="/profile/" />;
    }
    return (
      <div>
        <NavBar />

        <div className="login-title">Login</div>

        <Form className="login-form">
          <Form.Text>
            {this.state.error &&
              "There was an issue with your username and password"}
            {this.state.loggedIn && `You are logged in now!`}
          </Form.Text>

          <Form.Group className="mb-2">
            <FloatingLabel
              inputId="username"
              label="Username"
              type="email"
              onChange={this.handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <FloatingLabel
              inputId="password"
              type="password"
              label="Password"
              onChange={this.handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-2">
            <Button type="submit" variant="primary" onClick={this.handleSubmit}>
              Login
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

export default withCookies(Login);
