import * as React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import Results from './components/Results';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/results" component={Results} />
          </div>
        </Router>
      </div>
    );
  }
}
