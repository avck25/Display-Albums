import React, { Component } from 'react';
import Input from './Input';
import { connect } from 'react-redux';
import * as actions from '../actions/apiActions';

class Search extends Component {
  changeHandler = e => {
    this.props.setArtist(e.target.value);
    let toRender = '';
    this.setState({ toRender });
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.props.submitHandler}>
          <Input
            value={this.props.artist}
            prependText={this.props.prependText || 'Artist'}
            onChange={this.props.changeHandler || this.changeHandler}
            name={this.props.name || 'artist'}
          />
          <button className="btn btn-primary" type="submit">
            Search
          </button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    artist: state.apiReducer.artist
  };
}

export default connect(mapStateToProps, actions)(Search);
