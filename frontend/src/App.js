import logo from "./logo.svg";
import "./App.css";
import { Helmet } from "react-helmet";
import HomePage from "./components/home_page/HomePage";
import React from "react";
import { config } from "./constants";
import { Route, Switch } from "react-router-dom";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";

import About from "./components/about/About";
import Practice from "./components/practice/Practice";
import TopicsList from "./components/practice/TopicsList";
import Topic from "./components/practice/Topic";
import SignUp from "./components/signup/SignUp";
import Login from "./components/login/Login";
import Profile from "./components/profile/Profile";
import Assessments from "./components/practice/Assessments";
import QuestionPage from "./components/question/QuestionPage";
import ResultsPage from "./components/results/ResultsPage";
import SkillQuestion from "./components/skill_page/SkillQuestion";
import Recommendations from "./components/recommendations/Recommendations";
import LearningOutcome from "./components/learning_outcome/LearningOutcome";
import TopicPerformance from "./components/recommendations/TopicPerformance";
import Teachers from "./components/teachers/Teachers";
import TeacherSignup from "./components/teachers/TeacherSignup";
import AdminHome from "./components/admin/AdminHome";

class App extends React.Component {
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  constructor() {
    super();
    this.state = {};
  }

  async componentDidMount() {}

  render() {
    return (
      <>
        <Helmet>
          <title>AdaptiveMaths</title>
        </Helmet>

        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>

          <Route exact path="/about/">
            <About />
          </Route>

          <Route exact path="/signup/">
            <SignUp />
          </Route>

          <Route exact path="/login/">
            <Login />
          </Route>

          <Route exact path="/profile/">
            <Profile />
          </Route>

          <Route exact path="/practice/">
            <Practice />
          </Route>

          <Route exact path="/practice/topics/">
            <TopicsList />
          </Route>

          <Route exact path="/practice/topics/:topic/" component={Topic} />

          <Route exact path="/practice/assessments/">
            <Assessments />
          </Route>

          <Route
            exact
            path="/practice/assessments/:testId/"
            component={QuestionPage}
          />

          <Route
            exact
            path="/assessments/results/:testId/"
            component={ResultsPage}
          />

          <Route
            exact
            path="/practice/skills/:skillId/"
            component={SkillQuestion}
          />

          <Route exact path="/recommendations/" component={Recommendations} />

          <Route
            exact
            path="/learningOutcome/:lo/"
            component={LearningOutcome}
          />

          <Route
            exact
            path="/topicPerformance/:topic/"
            component={TopicPerformance}
          />

          <Route exact path="/teachers/">
            <Teachers />
          </Route>

          <Route exact path="/teachers/signup/">
            <TeacherSignup />
          </Route>

          <Route exact path="/admin/home">
            <AdminHome />
          </Route>
        </Switch>
      </>
    );
  }
}

export default withCookies(App);
