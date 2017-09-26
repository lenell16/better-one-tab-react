import React, { Component } from 'react';
import Tab from './Tab.js';
import { openLinks } from '../lib/chrome-tabs.js';

class TabGroup extends Component {
  state = {
    isExpanded: false
  }
  toggleIsExpanded = () => {
    this.setState({ isExpanded: !this.state.isExpanded });
  }
  renderTabs = () => {
    const {
      id,
      tabs,
      incognito
    } = this.props;
    return tabs.map((tab, i) => <Tab key={id + i} openLink={openLinks.bind(null, incognito)} {...tab}/>);
  }
  render() {
    const {
      name,
      tabs,
      incognito,
      toggleIncognito
    } = this.props;
    const urls = tabs.map(({ url }) => url);
    return (
      <div>
        <h3>
          <div className="caret" onClick={this.toggleIsExpanded}>
            <i className={'fa fa-caret-' + (this.state.isExpanded ? 'down' : 'right')} aria-hidden="true"></i>
          </div>
          {name}
          <span className="count"> {tabs.length} </span>
          {tabs.length > 1 ? 'Tabs' : 'Tab'}
        </h3>
        <span onClick={() => openLinks(incognito, urls)}>Reopen</span>
        <span onClick={toggleIncognito}>Move to Incognito</span>
        <ul>
          {this.state.isExpanded && this.renderTabs()}
        </ul>
      </div>
    );
  }
}

export default TabGroup;