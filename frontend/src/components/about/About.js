import React from "react";
import NavBar from "../navbar/NavBar";
import "./about.css";

export default class About extends React.Component {
    render() {
        return (
            <>
                <NavBar/>
                <div className="about">
                    About
                </div>

                <div>
                    text
                </div>
            </>
        )
    }
}