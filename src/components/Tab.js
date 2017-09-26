import React, { Component } from 'react';

class Tab extends Component {
  constructor(props) {
    super(props); 
  }
  render() {
    return (
      <li>
        <a onClick={this.props.openLink.bind(null, this.props.url)}>{this.props.title}</a>
      </li>
    );
  }
}

export default Tab;