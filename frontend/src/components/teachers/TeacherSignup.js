import React from "react";
import NavBar from "../navbar/NavBar";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap-floating-label";
import Button from "react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.css";
import { addUser } from "../../api";
import { Redirect } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

class TeahcerSignup extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      school: "",
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
        [event.target.id]: event.target.value,
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
        <div className="signup-title">Teacher Signup</div>

        <div className="signup-wrapper">
          <Form className="signup-form">
            <Form.Group className="signup-field">
              {/* Input box for email */}
              <FloatingLabel
                label="Email address*"
                className="signup-label"
                inputId="email"
                type="email"
                placeholder="Your email"
                value={this.state.email}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group>
              {/* Input box for email */}
              <FloatingLabel
                label="First Name*"
                className="signup-label"
                name="firstName"
                type="text"
                placeholder="Your name"
                value={this.state.firstName}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="signup-field">
              <FloatingLabel
                label="Last Name*"
                className="signup-label"
                inputId="lastName"
                type="text"
                placeholder="Surname"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="signup-field">
              <FloatingLabel
                label="School"
                className="signup-label"
                inputId="school"
                type="text"
                placeholder="School"
                value={this.state.lastName}
                onChange={this.handleChange}
              />
            </Form.Group>

            <Form.Group className="signup-field">
              <FloatingLabel
                label="Password*"
                className="signup-label"
                inputId="password"
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <Form.Text>
                {!this.state.passwordIsLong &&
                  "Passwords should be at least 8 characters"}
              </Form.Text>
            </Form.Group>

            <Form.Group className="signup-field">
              <FloatingLabel
                label="Re-enter Password*"
                className="signup-label"
                inputId="reenterPassword"
                type="password"
                placeholder="Password"
                value={this.state.reenterPassword}
                onChange={this.handleChange}
              />
              <Form.Text>
                {!this.state.passwordsAreSame && "Passwords are not the same"}
              </Form.Text>
            </Form.Group>

            <Button variant="primary" onClick={this.handleSubmit}>
              Submit
            </Button>
          </Form>
        </div>
      </>
    );
  }
}

export default withCookies(TeacherSignup);
