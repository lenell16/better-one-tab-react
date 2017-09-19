import React, { Component } from 'react';
import Tab from './Tab.js';

class TabGroup extends Component {
  constructor() {
    super();
    this.state = {
      isExpanded: true
    }
  }
  toggleIsExpanded = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }
  renderTabs = () => {
    return this.props.tabs.map((tab, i) => <Tab key={this.props.id + i} {...tab}/>);
  }
  render() {
    return (
      <div>
        <h3>
          <div className="caret" onClick={this.toggleIsExpanded}>
            <i className={'fa fa-caret-' + (this.state.isExpanded ? 'down' : 'right')} aria-hidden="true"></i>
          </div>
          {this.props.name}
          <span className="count">{' ' + this.props.tabs.length + ' '}</span>
          {this.props.tabs.length > 1 ? 'Tabs' : 'Tab'}
        </h3>
        <ul>
          {this.state.isExpanded && this.renderTabs()}
        </ul>
      </div>
    );
  }
}

export default TabGroup;