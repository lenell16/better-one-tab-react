import React, { Component } from 'react';

class Tab extends Component {
  constructor(props) {
    super(props);
    
  }
  
  render() {
    return (
      <li>
        <a href={this.props.url} target="_blank">{this.props.title}</a>
      </li>
    );
  }
}

export default Tab;