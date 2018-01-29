import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Panel from "./Panel";
import { connect } from "react-redux";
import * as actions from "../actions/apiActions";

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toRender: ""
    };
  }

  componentWillMount() {
    this.props.getResults(this.props.state.artist);
  }

  clickHandler = () => {
    let toRender;

    toRender = <Redirect to={"/"} />;

    this.setState({ toRender });
  };

  render() {
    let resultToRender;
    // in case of error
    if (this.props.state.error) {
      resultToRender = <Panel text={this.props.state.errMessage} />;
    } else if (this.props.state.results.length === 0) {
      // let the user know his search term came back with no results
      resultToRender = (
        <Panel text={`No albums to display for ${this.props.state.artist}`} />
      );
    } else {
      // filtering the array to remove duplicates
      resultToRender = this.props.state.results
        .filter((elem, index, arr) => {
          return (
            index ===
              arr.findIndex(obj => {
                return elem.collectionId === obj.collectionId;
              }) && elem.collectionName // make sure there is an album
          );
        })
        // mapping the array to display fields I want
        .map((result, index) => {
          return (
            <tr key={result.collectionId}>
              <td>{index + 1}</td>
              <td>
                <img src={result.artworkUrl100} className="img-responsive" />
              </td>
              <td>{result.collectionName}</td>
              <td>{result.artistName}</td>
              <td>{result.trackCount}</td>
              <td>{result.primaryGenreName}</td>
              <td>{`$${result.collectionPrice}`}</td>
              <td>
                <a target="_blank" href={result.collectionViewUrl}>
                  Preview Album
                </a>
              </td>
            </tr>
          );
        });
    }
    return (
      <div className="results">
        <button className="btn btn-default" onClick={this.clickHandler}>
          Home Page
        </button>
        {this.state.toRender}
        <table className="table table-striped">
          <thead>
            <tr>
              <th>#</th>
              <th>Album Cover</th>
              <th>Album</th>
              <th> Artist</th>
              <th># Songs</th>
              <th>Genre</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>{resultToRender}</tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    state: state.apiReducer
  };
}

export default connect(mapStateToProps, actions)(Results);
