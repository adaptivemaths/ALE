import React from "react";
import NavBar from "../navbar/NavBar";
import { Nav } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { getPaperNames } from "../../api";
import "./Assessments.css";

class Assessments extends React.Component {
  constructor() {
    super();
    this.state = {
      papers: [],
    };
  }

  async componentDidMount() {
    // Get test paper codes from the database
    const papers = await getPaperNames();

    this.setState({
      papers,
    });
  }

  render() {
    return (
      <div>
        <NavBar />
        <br />
        <h1>All papers</h1>
        <br />
        <div className="assessments-container">
          {/* Add link for each test paper */}
          {this.state.papers.map((paper) => (
            <div className="assessment-card">
              <Button
                variant="outline-secondary"
                href={`/practice/assessments/${paper.test_id}/`}
                size="lg"
              >
                {paper.title}
              </Button>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default Assessments;
