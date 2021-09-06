import React from "react";
import { Nav } from "react-bootstrap";
import NavBar from "../navbar/NavBar";
import "./Topic.css";
import { getSkillsForTopic } from "../../api";

export default class Topic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topic: "",
      skills: [],
    };
  }

  async componentDidMount() {
    // Get name of topic (URL parameter)
    this.setState(
      {
        topic: this.props.match.params.topic,
      },
      async () => {
        // Get skills associated with current topic from the database
        this.setState({
          skills: await getSkillsForTopic(this.state.topic),
        });
      }
    );
  }

  skillsList() {
    return (
      <>
        {/* Add link for each skill */}
        {this.state.skills.map((skill) => (
          <Nav.Link
            href={`/practice/skills/${skill.skill_id}`}
            style={{ padding: "10px" }}
          >
            <span className="skill-btn">{skill.skill_name}</span>
            <br />
          </Nav.Link>
        ))}
      </>
    );
  }

  render() {
    return (
      <div className="topic-wrapper">
        <NavBar />
        <div className="topic-title">{this.state.topic} Skills</div>
        <br />
        <div>{this.skillsList()}</div>
      </div>
    );
  }
}
