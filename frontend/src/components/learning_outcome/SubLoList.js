import React from "react";
import PropTypes from "prop-types";
import Button from "react-bootstrap/Button";
import "./SubLoList.css";

export default class SubLoList extends React.Component {
  static propTypes = {
    subLos: PropTypes.array.isRequired,
  };

  render() {
    return (
      <div className="sublolist-container">
        {this.props.subLos.map((subLo) => (
          <>
            <Button
              variant="outline-secondary"
              onClick={() =>
                window.open(
                  `https://www.bossmaths.com/${subLo.sub_lo.toLowerCase()}`,
                  "_blank"
                )
              }
            >
              {subLo.description}
            </Button>
            <br />
            <br />
          </>
        ))}
      </div>
    );
  }
}
