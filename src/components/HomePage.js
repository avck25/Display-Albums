import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Panel from './Panel';
import Search from './Search';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';

import './css/HomePage.css';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toRender: ''
    };
  }

  //button click function

  submitHandler = e => {
    e.preventDefault();
    let toRender = '';
    if (this.props.artist === '') {
      toRender = <Panel text="Please enter a search term and retry" />;
    } else {
      toRender = <Redirect to={'/results'} />;
    }

    this.setState({ toRender });
  };

  render() {
    return (
      <div className="App">
        <Panel text="Enter an artist in the search box to find the albums linked to that artist" />
        <Search submitHandler={this.submitHandler} />
        {this.state.toRender}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    artist: state.apiReducer.artist
  };
}

export default connect(mapStateToProps, actions)(HomePage);
