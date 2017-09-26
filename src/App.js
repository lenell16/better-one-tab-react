import React, { Component } from 'react';
import { getChromeTabs, closeTabs } from './lib/chrome-tabs.js';
import { findTabGroupById, toggleIncognito, updateTabGroup } from './lib/tabGroupHelpers.js';
import fire from './fire.js';
import TabGroup from './components/TabGroup.js';

import 'font-awesome/css/font-awesome.css';
import 'shoelace-css/dist/shoelace.css';
import './App.css';

const tabDB = fire.database().ref('test');

const getGroups = (cb) =>
  tabDB
    .orderByChild('date')
    .on('child_added', cb);

const isWindowIncognito = tabs => tabs.every(tab => tab.incognito);
const extractUrlTitle = tabs => tabs.map(({ url, title }) => ({ url, title }));

const createTabGroup = tabs => ({
  tabs: extractUrlTitle(tabs),
  name: 'Untitled',
  date: Date.now(),
  incognito: isWindowIncognito(tabs)
});

class App extends Component {
  constructor() {
    super()
    this.state = {
      tabGroups: [],
      showIncognito: false
    }
  }
  componentDidMount() {
    getGroups((snap) => {
      this.setState({ tabGroups: [{ id: snap.key, ...snap.val() }, ...this.state.tabGroups] })
    })
  }
  async saveTabs(type) {
    const tabs = await getChromeTabs[type]();
    if (tabs.length) {
      closeTabs(tabs);
      const group = createTabGroup(tabs);
      tabDB.push(group);
    }
  }
  toggleWindowType = (id) => {
    const group = findTabGroupById(this.state.tabGroups, id);
    const updatedGroup = toggleIncognito(group);
    const newGroups = updateTabGroup(this.state.tabGroups, updatedGroup);
    this.setState({ tabGroups: newGroups });
  }
  renderGroups() {
    const { tabGroups, showIncognito } = this.state;
    return tabGroups
      .filter(({ incognito }) => incognito === showIncognito)
      .map(group => <TabGroup key={group.id} {...group} toggleIncognito={() => this.toggleWindowType(group.id)}/>);
  }
  render() {
    const groups = this.renderGroups();
    const tabTotal = this.state.tabGroups.reduce(((sum, { tabs }) => sum + tabs.length), 0);
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Better One Tab</h2>
            </div>
            <div className="col">
              <span className="incog" onClick={() => this.setState({ showIncognito: !this.state.showIncognito })}>
                <i className={'fa fa-eye' + (this.state.showIncognito ? '' : '-slash')} aria-hidden="true"></i>
              </span>
            </div>
          </div>
          <div className="row">
            <div className="col tab-buttons">
              <button className="tab-button" onClick={this.saveTabs.bind(this, 'all')}>Save All</button>       
              <button className="tab-button" onClick={this.saveTabs.bind(this, 'left')}>Save Left</button>
              <button className="tab-button" onClick={this.saveTabs.bind(this, 'right')}>Save Right</button>
              <button className="tab-button" onClick={this.saveTabs.bind(this, 'one')}>Save One</button>
              <button className="tab-button" onClick={this.saveTabs.bind(this, 'allButOne')}>Save All except this tab</button>
            </div>
          </div>
          <div className="row">
            <div className="col">
              {groups}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
