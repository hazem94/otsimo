/** @format */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types"

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = { remainingTime: 0 }; // in seconds
  }

  tick = () => {
    const updatedTime = this.state.remainingTime - 1; // time after a second passed
    this.setState({ remainingTime: updatedTime });
    // check if time if over
    if (this.state.remainingTime <= 0) {
      clearInterval(this.interval);
      this.props.history.push("/gameOver");
    }
  };

  componentDidMount() {
    this.setState({ remainingTime: this.props.remainingTime });
    this.interval = setInterval(() => this.tick(), 1000);
  }

  UNSAFE_componentWillMount() {
    clearInterval(this.interval);
  }

  render() {
    return <>Remaining Time: {this.state.remainingTime}</>;
  }
}
export default withRouter(Countdown);

// PropTypes
Countdown.propTypes = {
  remainingTime: PropTypes.number
};
