import { Notifier } from "@airbrake/browser";
import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
    this.airbrake = new Notifier({
      projectId: process.env.REACT_APP_AIRBRAKE_ID,
      projectKey: process.env.REACT_APP_AIRBRAKE_KEY,
    });
  }
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // Send error to Airbrake
    this.airbrake.notify({
      error: error,
      params: { info: info },
    });
  }
  render() {
    if (this.state.hasError) {
      return (
        <main
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <header>
            <h1>
              An error just occurred, analytics report has been received and it
              is being worked on
            </h1>
            <p>
              Please Refresh <a href="/">Home</a>
            </p>
          </header>
        </main>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
