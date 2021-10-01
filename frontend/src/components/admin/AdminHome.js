import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import { getAllUsers } from "../../api";
import NavBar from "../navbar/NavBar";

class AdminHome extends Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };
  }

  async componentDidMount() {
    this.setState({
      users: await getAllUsers(),
    });
  }

  render() {
    const {
      props: { cookies },
    } = this;
    if (!cookies.get("isAdmin")) {
      return <Redirect push to="/profile/" />;
    }
    return (
      <div>
        <h1>Admin</h1>
        <h3>Users</h3>
        {this.state.users.map((user) => (
          <>
            {user.first_name} {user.last_name}
            <br />
          </>
        ))}
      </div>
    );
  }
}

export default withCookies(AdminHome);
