import React from "react";
import { getUserDetails } from "../../api";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';
import NavBar from "../navbar/NavBar";
import { Redirect } from "react-router-dom";

class Profile extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            userDetails: "",
            signedIn: true,
            loading: true
        }

        this.signOutUser = this.signOutUser.bind(this);

    }

    async componentDidMount() {
        const currentUser = this.props.cookies.get("username");
        const details = await 
        getUserDetails({
            username: currentUser
        })
        .then(res => {
            this.setState({
                userDetails: res,
                loading: false
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
                        {this.state.signedIn ? 
                            <button onClick={this.signOutUser}>
                                Sign Out
                            </button> : ""
                        }
                    </>
                }
            </div>
        );
    }
}

export default withCookies(Profile);