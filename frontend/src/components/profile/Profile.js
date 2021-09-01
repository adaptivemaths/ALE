import React from "react";
import {
  getUserDetails,
  deleteAccount,
  getSubmittedTests,
  getPaperInfo,
} from "../../api";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import NavBar from "../navbar/NavBar";
import { Redirect } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./profile.css";

class Profile extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      userDetails: "",
      signedIn: true,
      loading: true,
      submittedTests: [],
    };

    this.signOutUser = this.signOutUser.bind(this);
    this.deleteUserAccount = this.deleteUserAccount.bind(this);
  }

  async componentDidMount() {
    // Get userId from cookies
    const userId = this.props.cookies.get("userId");
    // Get user details from the database
    await getUserDetails({
      userId,
    }).then((res) => {
      this.setState({
        userDetails: res,
        loading: false,
      });
    });
    // Get tests submitted by user from database
    await getSubmittedTests({
      userId,
    }).then(async (res) => {
      this.setState({
        submittedTests: await Promise.all(
          res.map(
            async (paper) =>
              await getPaperInfo({ testId: paper.GCSE_Paper_Name })
          )
        ),
      });
    });
  }

  signOutUser(event) {
    // Remove cookie for userId from all pages
    this.props.cookies.remove("userId", { path: "/" });
    this.setState({
      userDetails: "You are signed out",
      signedIn: false,
    });
  }

  deleteUserAccount(event) {
    // Remove cookie for userId from all pages
    const userId = this.props.cookies.get("userId");
    // Delete account from database
    deleteAccount({
      userId,
    });
    this.signOutUser();
  }

  submittedTests() {
    console.log("submittedTests", this.state.submittedTests);
    return this.state.submittedTests.map((paper) => (
      <div>
        <Nav.Link href={`/practice/assessments/${paper.test_id}`}>
          <span>{paper.title}</span>
        </Nav.Link>
      </div>
    ));
  }

  render() {
    // If user has signed out then redirect back to home page
    if (!this.state.signedIn) {
      return <Redirect push to="/" />;
    }

    return (
      <div>
        <NavBar />
        {this.state.loading ? (
          <>Loading...</>
        ) : (
          <>
            <div className="profile-container">
              <div className="profile-title">Profile</div>
              <label>Email: {this.state.userDetails.username}</label>
              <br />
              <label>First name: {this.state.userDetails.first_name}</label>
              <br />
              <label>Last name: {this.state.userDetails.last_name}</label>
              <br />

              <br />
              <label>
                Tests completed:
                {this.submittedTests()}
              </label>
              <br />
              <br />
              <button id="signout-button" onClick={this.signOutUser}>
                Sign Out
              </button>
              <br />

              <button
                id="delete-account-button"
                onClick={this.deleteUserAccount}
              >
                Delete account
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default withCookies(Profile);
