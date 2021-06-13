import logo from './logo.svg';
import './App.css';
import { Helmet } from "react-helmet";
import HomePage from "./home_page/homePage";
import React from 'react';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>

        <Helmet>
          <title>EdiCat</title>
        </Helmet>

        <HomePage />

      </React.Fragment>
    );
  }
}