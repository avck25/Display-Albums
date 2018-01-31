import React, { Component } from 'react';
import './css/Input.css';

export default class Input extends Component {
  render() {
    return (
      <div className="input-group">
        <div className="input-group-prepend">
          <span className="input-group-text" onChange={this.props.onChange}>
            {this.props.prependText}
          </span>
        </div>
        <input
          type="text"
          className="form-control"
          onChange={this.props.onChange}
          value={this.props.value}
        />
      </div>
    );
  }
}
