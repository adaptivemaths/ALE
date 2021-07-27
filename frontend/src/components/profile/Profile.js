import React from "react";
import { getUserDetails, deleteAccount, getSubmittedTests } from "../../api";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import NavBar from "../navbar/NavBar";
import { Redirect } from "react-router-dom";
import { Nav } from "react-bootstrap";

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
        const currentUser = this.props.cookies.get("username");
        const username = {
            username: currentUser
        };
        const submittedTests = await 
        getSubmittedTests(username)
        .then(res => {
            console.log('submittedTests', res);
            this.setState({
                submittedTests: res
            })
        });

        const details = await 
        getUserDetails(username)
        .then(res => {
            this.setState({
                userDetails: res,
                loading: false,
            })
        });

    }

    signOutUser(event) {
        this.props.cookies.remove("username", {path: '/'});
        this.setState({
            userDetails: "You are signed out",
            signedIn: false
        })
    }

    deleteUserAccount(event) {
        deleteAccount({
            username: this.props.cookies.get('username')
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
        console.log("papers", papers);
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

                        <button onClick={this.signOutUser}>
                            Sign Out
                        </button> 

                        
                        <button onClick={this.deleteUserAccount}>
                            Delete account
                        </button>
                    </>
                }
            </div>
        );
    }
}

export default withCookies(Profile);