import React, { Component } from 'react';
// import {getChromeTabs} from './chrome-tabs.js';
import fire from './fire.js';
import TabGroup from './TabGroup.js';

import 'font-awesome/css/font-awesome.css';
import 'shoelace-css/dist/shoelace.css';
import './App.css';

const tabDB = fire.database().ref('test');

// const sortBy = child => ({ [child]: a }, { [child]: b }) =>  b - a;

// const getGroups = (limit, child) =>
//   tabDB
//     .orderByChild(child)
//     .limitToLast(limit)
//     .once('value')
//     .then(snap => snap.val())
//     .then(groupsObject => Object.entries(groupsObject))
//     .then(groups => groups.map(([id, group]) => ({ id, ...group })))
//     .then(groups => groups.sort(sortBy(child)));


const getGroups = (cb) =>
  tabDB
    .orderByChild('date')
    .on('child_added', cb);
// const isWindowIncognito = tabs => tabs.every(tab => tab.incognito);
// const extractUrlTitle = tabs => tabs.map(({ url, title }) => ({ url, title }));

// const createTabGroup = tabs => ({
//   tabs: extractUrlTitle(tabs),
//   name: 'Untitled',
//   date: Date.now(),
//   incognito: isWindowIncognito(tabs)
// });

class App extends Component {
  constructor() {
    super()
    this.state = {
      limit: 5,
      tabGroups: []
    }
  }
  componentDidMount() {
    getGroups((snap) => {
      this.setState({ tabGroups: [{ id: snap.key, ...snap.val() }, ...this.state.tabGroups] })
    })
    // getGroups(this.state.limit, 'date')
    //   .then(tabGroups => this.setState({ tabGroups }));
  }
  // getMoreGroups() {
  //   const limit = this.state.limit + 5;
  //   getGroups(limit, 'date')
  //     .then(tabGroups => this.setState({
  //       limit,
  //       tabGroups
  //     }));
  // }
  saveTabs(type) {
    // getChromeTabs[type]()
    //   .then(createTabGroup)
    //   .then(group => tabDB.push(group))
  }
  renderGroups() {
    const { tabGroups } = this.state;
    return tabGroups.map(group => <TabGroup key={group.id} {...group}/>);
  }
  renderLoadMore() {
    return (
      <button onClick={this.getMoreGroups.bind(this)}>Load More</button>
    )
  }
  render() {
    const groups = this.renderGroups();
    console.log(this.state.tabGroups);
    return (
      <div className="App">
        <div className="container">
          <div className="row">
            <div className="col">
              <h2>Better One Tab</h2>
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
              {/* {groups.length && groups.length % 5 === 0 && this.renderLoadMore()} */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
