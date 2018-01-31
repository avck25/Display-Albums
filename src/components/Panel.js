import React, { Component } from 'react';
import './css/Panel.css';

export default class Panel extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-block">{this.props.text}</div>
      </div>
    );
  }
}
