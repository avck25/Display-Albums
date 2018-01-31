import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Panel from './Panel';
import Search from './Search';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';

class Results extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toRender: ''
    };
  }

  componentWillMount() {
    this.props.getResults(this.props.state.artist);
  }

  HomePageClickHandler = () => {
    this.props.resetState();
    let toRender;
    toRender = <Redirect to={'/'} />;
    this.setState({ toRender });
  };

  submitHandler = e => {
    e.preventDefault();
    if (this.props.state.artist !== '') {
      this.props.getResults(this.props.state.artist);
    }
  };

  render() {
    let display;
    let resultToRender;
    let errDisplay;
    // in case of error
    if (this.props.state.error) {
      errDisplay = <Panel text={this.props.state.errMessage} />;
    } else if (this.props.state.results.length === 0) {
      // let the user know his search term came back with no results
      errDisplay = (
        <Panel text={`No albums to display for ${this.props.state.artist}`} />
      );
    } else {
      // filtering the array to remove duplicates
      let display = this.props.state.results
        .filter((elem, index, arr) => {
          return (
            index ===
              arr.findIndex(obj => {
                return elem.collectionId === obj.collectionId;
              }) && elem.collectionName // make sure there is an album
          );
        })
        .map((result, index) => {
          // mapping the array to display fields I want
          return (
            <tr key={result.collectionId}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={result.artworkUrl100}
                  alt="album cover"
                  className="img-responsive"
                />
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
      resultToRender = <tbody>{display}</tbody>;
    }

    return (
      <div className="results">
        <div className="search">
          <Search submitHandler={this.submitHandler} />
        </div>
        <button className="btn btn-default" onClick={this.HomePageClickHandler}>
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
          {resultToRender}
        </table>
        {errDisplay}
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
