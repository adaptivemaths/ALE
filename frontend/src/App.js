import logo from './logo.svg';
import './App.css';
import { Helmet } from "react-helmet";
import HomePage from "./components/home_page/HomePage";
import React from 'react';
import axios from "axios";
import { config } from "./constants";
import { Route, Switch } from "react-router-dom";
import { instanceOf } from 'prop-types';
import { withCookies, Cookies } from 'react-cookie';

import About from "./components/about/About";
import Practice from "./components/practice/Practice";
import TopicsList from "./components/practice/TopicsList";
import Topic from "./components/practice/Topic";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Assessments from './components/practice/Assessments';
import QuestionPage from './components/question/QuestionPage';
import ResultsPage from './components/results/ResultsPage';


class App extends React.Component {
  
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired
};

  constructor() {
    super();
    this.state = {}
  }

  async componentDidMount() {
    
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

          <Route exact path="/about/">
            <About/>
          </Route>

          <Route exact path="/signup/">
            <SignUp/>
          </Route>

          <Route exact path="/login/">
            <Login/>
          </Route>

          <Route exact path="/profile/">
            <Profile/>
          </Route>

          <Route exact path="/practice/">
            <Practice/>
          </Route>

          <Route exact path="/practice/topics/">
              <TopicsList/>
          </Route>

          <Route exact path="/practice/topics/:topic/" component={Topic}/>

          <Route exact path="/practice/assessments/">
            <Assessments/>
          </Route>

          <Route exact path="/practice/assessments/:paperName/" component={QuestionPage}/>

          <Route exact path="/practice/results/:paperName/" component={ResultsPage}/>

        </Switch>

      </>
    );
  }
}

export default withCookies(App);