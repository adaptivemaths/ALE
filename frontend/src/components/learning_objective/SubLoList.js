import React from "react";
import PropTypes from "prop-types";
import "./SubLoList.css";

export default class SubLoList extends React.Component {
  static propTypes = {
    subLos: PropTypes.array.isRequired,
  };

  render() {
    return this.props.subLos.map((subLo) => (
      <div className="sublolist-container">
        {subLo.description}
        <br />
      </div>
    ));
  }
}
