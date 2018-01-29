import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Panel from "./Panel";
import Input from "./Input";
import { connect } from "react-redux";
import * as actions from "../actions/apiActions";

import "./css/SearchPage.css";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toRender: ""
    };
  }
  onChange = e => {
    this.props.setArtist(e.target.value);
    let toRender = "";
    this.setState({ toRender });
  };

  //button click function

  clickHandler = () => {
    let toRender;
    if (this.props.artist === "")
      toRender = <Panel text="Please enter a search term and retry" />;
    else {
      toRender = <Redirect to={"/results"} />;
    }
    this.setState({ toRender });
  };

  render() {
    return (
      <div className="App">
        <Panel text="Enter an artist in the search box to find the albums linked to that artist" />
        <Input
          value={this.props.artist}
          prependText="Artist"
          onChange={this.onChange}
          name="theArtist"
        />
        <button className="btn btn-primary" onClick={this.clickHandler}>
          Search
        </button>
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

export default connect(mapStateToProps, actions)(SearchPage);
