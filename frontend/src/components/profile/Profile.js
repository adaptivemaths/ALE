import React from "react";
import { getUserDetails } from "../../api";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class Profile extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props) {
        super(props);
        this.state = {
            userDetails: ""
        }
    }

    async componentDidMount() {
        const currentUser = this.props.cookies.get("username");
        console.log("username=", currentUser);
        const details = await 
        getUserDetails({
            username: currentUser
        })
        .then(res => {
            this.setState({
                userDetails: JSON.stringify(res)
            })
        });

    }

    render() {
        return (
            <div>
                {this.state.userDetails}
            </div>
        );
    }
}

export default withCookies(Profile);