import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./navbar.css";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

class NavBar extends React.Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };


    render() {
        return (
            <Navbar bg="light" variant="light" sticky="top">
                <Navbar.Brand href="/" className="brand">Adaptive Learning</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/about">About</Nav.Link>

                    {this.props.cookies.get("username") ? 
                        <>
                            <Nav.Link href="/profile">Profile</Nav.Link> 
                            <Nav.Link href="/practice">Practice</Nav.Link>
                        </>
                        : 
                        <>
                            <Nav.Link href="/login" className="hollow-btn">Log In</Nav.Link>
                            <Nav.Link href="/signup" className="filled-btn">Sign Up</Nav.Link>
                        </>
                        }
                </Nav>
            </Navbar>
        )
    }
}

export default withCookies(NavBar);