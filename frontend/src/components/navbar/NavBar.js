import React from "react";
import Navbar from "react-bootstrap/Navbar";
import { Nav } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import "./navbar.css";

export default class NavBar extends React.Component {
    render() {
        return (
            <Navbar bg="light" variant="light" sticky="top">
                <Navbar.Brand href="/" className="brand">Adaptive Learning</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="/about">About</Nav.Link>
                    <Nav.Link href="/practice">Practice</Nav.Link>
                    <Nav.Link href="/login" className="login-btn">Log In</Nav.Link>
                    <Nav.Link href="/signup" className="signup-btn">Sign Up</Nav.Link>
                </Nav>
            </Navbar>
        )
    }
}