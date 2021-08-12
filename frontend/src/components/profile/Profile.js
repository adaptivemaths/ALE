import React from "react";
import { getUserDetails, deleteAccount, getSubmittedTests } from "../../api";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import NavBar from "../navbar/NavBar";
import { Redirect } from "react-router-dom";
import { Nav } from "react-bootstrap";
import "./profile.css";

class Profile extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            userDetails: "",
            signedIn: true,
            loading: true,
            submittedTests: []
        }

        this.signOutUser = this.signOutUser.bind(this);
        this.deleteUserAccount = this.deleteUserAccount.bind(this);
    }

    async componentDidMount() {
        const userId = this.props.cookies.get("userId");
        const submittedTests = await 
        getSubmittedTests({
            userId,
        })
        .then(res => {
            console.log('submittedTests', res);
            this.setState({
                submittedTests: res
            })
        });

        const details = await 
        getUserDetails({
            userId,
        })
        .then(res => {
            this.setState({
                userDetails: res,
                loading: false,
            })
        });

    }

    signOutUser(event) {
        this.props.cookies.remove("userId", {path: '/'});
        this.setState({
            userDetails: "You are signed out",
            signedIn: false
        })
    }

    deleteUserAccount(event) {
        const userId = this.props.cookies.get('userId');
        deleteAccount({
            userId,
        });
        this.signOutUser();
    }

    submittedTests() {
        const papers = this.state.submittedTests.map((paper) => (
            <div>
                <Nav.Link href={`/practice/assessments/${paper.GCSE_Paper_Name}`}>
                    <span>{paper.GCSE_Paper_Name}</span>
                </Nav.Link>
            </div>
        ));

        return (
            <div>
                {papers}
            </div>
        )
    }

    render() {
        if (!this.state.signedIn) {
            return <Redirect push to="/"/>;
        }
        return (
            <div>
                <NavBar/>
                {this.state.loading ?
                    <>
                        Loading...
                    </> 
                    :  
                    <>
                    <div className="profile-container">
                        <div className="profile-title">
                            Profile
                        </div>
                        <label>
                            Email: {this.state.userDetails.username}
                        </label><br/>
                        <label>
                            First name: {this.state.userDetails.first_name}
                        </label><br/>
                        <label>
                            Last name: {this.state.userDetails.last_name}
                        </label><br/>

                        <br/>
                        <label>
                            Tests completed:
                            {this.submittedTests()}
                        </label>
                        <br/>
                        <br/>
                        <button id="signout-button" onClick={this.signOutUser}>
                            Sign Out
                        </button> 
                        <br/>
                        
                        <button id="delete-account-button" onClick={this.deleteUserAccount}>
                            Delete account
                        </button>
                    </div>
                    </>
                }
            </div>
        );
    }
}

export default withCookies(Profile);