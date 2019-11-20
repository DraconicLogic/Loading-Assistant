import React, { Component, Fragment } from "react";

class ErrorBoundary extends Component {
  state = {
    err: null,
    info: null
  };

  componentDidCatch(err, info) {
    this.setState({
      err,
      info
    });
  }
  render() {
    const { err } = this.state;
    return <Fragment>{err ? err : this.props.children}</Fragment>;
  }
}

export default ErrorBoundary;
