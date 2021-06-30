import logo from './logo.svg';
import './App.css';
import { Helmet } from "react-helmet";
import HomePage from "./components/home_page/HomePage";
import React from 'react';
import axios from "axios";
import { config } from "./constants";
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from "react-router-dom";
import About from "./components/about/About";
import Practice from "./components/practice/Practice";
import Topics from "./components/practice/Topics";

async function test() {
  var result = false;
  console.log(config.API_URL);
  await axios
    .get(`${config.API_URL}/test`)
    .then((res) => {
      const test = res.data.test;
      console.log(res);
      result = test;
      console.log(result);
    })
    .catch((error) => {
      console.log(error);
    });

  return result;
}


export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      test: false
    }
  }

  async componentDidMount() {
    const t = await test();
    this.setState({test: t});
  }

  render() {
    return (
      <>

        <Helmet>
          <title>EdiCat</title>
        </Helmet>
        
        <Switch>
          <Route exact path="/">
            <HomePage/>
          </Route>

          <Route exact path="/about">
            <About/>
          </Route>

          <Route exact path="/practice">
            <Practice/>
          </Route>

          <Route exact path="/practice/topics">
              <Topics/>
          </Route>

          <Route exact path="/practice/topics/:topic">
              <Topics/>
          </Route>

          <Route exact path="/practice/assessment">
          </Route>
        </Switch>

      </>
    );
  }
}