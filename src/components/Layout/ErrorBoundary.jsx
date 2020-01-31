import { Component } from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node)
    ]).isRequired,
    render: PropTypes.func.isRequired
  };

  state = {
    hasError: false,
    error: null,
    errorMessage: null
  };

  componentDidCatch(error, errorMessage) {
    this.setState({
      hasError: true,
      error,
      errorMessage
    });
  }

  render() {
    const { hasError, error, errorMessage } = this.state;

    if (hasError) {
      return this.props.render(error, errorMessage);
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
