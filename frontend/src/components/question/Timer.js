import React, { Component } from "react";

class Timer extends Component {
  state = {
    startTime: new Date(),
    timeElapsed: "00:00",
  };

  setElapsedTime = () => {
    // Set elapsed time
    if (!this.props.pause) {
      this.setState({
        timeElapsed: getElapsedTime(this.state.startTime),
      });
    }
  };

  componentDidMount() {
    let timerIntervalId = setInterval(this.setElapsedTime, 1000);
    this.setState({
      timerIntervalId,
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.timerIntervalId);
  }

  render() {
    return <div style={{ margin: "5px" }}>🕒 {this.state.timeElapsed}</div>;
  }
}

export default Timer;

// Calculates time elapsed since given start time and returns string
export function getElapsedTime(startTime) {
  startTime = new Date(startTime);
  // Record end time
  let endTime = new Date();

  // Compute time difference in milliseconds
  let timeDiff = endTime.getTime() - startTime.getTime();

  // Convert time difference from milliseconds to seconds
  timeDiff = timeDiff / 1000;

  // Extract integer seconds that dont form a minute using %
  let seconds = Math.floor(timeDiff % 60); //ignoring uncomplete seconds (floor)

  // Pad seconds with a zero if neccessary
  let secondsAsString = seconds < 10 ? "0" + seconds : seconds + "";

  // Convert time difference from seconds to minutes using %
  timeDiff = Math.floor(timeDiff / 60);

  // Extract integer minutes that don't form an hour using %
  let minutes = timeDiff % 60; //no need to floor possible incomplete minutes, becase they've been handled as seconds

  // Pad minutes with a zero if neccessary
  let minutesAsString = minutes < 10 ? "0" + minutes : minutes + "";

  // Convert time difference from minutes to hours
  timeDiff = Math.floor(timeDiff / 60);

  // Extract integer hours that don't form a day using %
  let hours = timeDiff % 24; //no need to floor possible incomplete hours, becase they've been handled as seconds

  // Convert time difference from hours to days
  timeDiff = Math.floor(timeDiff / 24);

  // The rest of timeDiff is number of days
  let days = timeDiff;

  let totalHours = hours + days * 24; // add days to hours
  let totalHoursAsString = totalHours < 10 ? "0" + totalHours : totalHours + "";

  if (totalHoursAsString === "00") {
    return minutesAsString + ":" + secondsAsString;
  } else {
    return totalHoursAsString + ":" + minutesAsString + ":" + secondsAsString;
  }
}
