import React from "react";
import "./homePage.css";
import NavBar from "../navbar/NavBar";
import laptop from "./laptop.svg";

export default class HomePage extends React.Component {

    render() {
        return (
            <div className="homepage">
                <NavBar />

                <div className="wrapper">
                    <div className="info">
                        <div className="big-info">
                            We personalise the way students learn Maths
                        </div>
                        <div className="small-info">
                            Our assessment platform learns your ability, creates questions that target your growth areas
                            and provides personalised learning recommendations
                        </div>
                    </div>

                    <div className="laptop">
                        <img src={laptop}></img>
                    </div>
                </div>

                <footer className="footer">
                    We'd love to talk to you, reach out at hello@adaptivemaths.co.uk
                </footer>
            </div>
        )
    }
}