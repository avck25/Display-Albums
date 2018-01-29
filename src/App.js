import * as React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import SearchPage from "./components/SearchPage";
import resultsPage from "./components/ResultsPage";

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={SearchPage} />
            <Route exact path="/results" component={resultsPage} />
          </div>
        </Router>
      </div>
    );
  }
}
