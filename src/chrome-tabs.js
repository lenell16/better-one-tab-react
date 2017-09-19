import ChromePromise from 'chrome-promise'

const chromep = new ChromePromise()

const getChromeTabs = {
  all() {
    return chromep.tabs.query({ currentWindow: true })
  },
  left() {
    return chromep.tabs.query({ currentWindow: true })
      .then(allTabs => ([allTabs.find(tab => tab.active), allTabs]))
      .then(([currentTab, allTabs]) => allTabs.filter(tab => (tab.index < currentTab.index)))
  },
  right() {
    return chromep.tabs.query({ currentWindow: true })
      .then(allTabs => ([allTabs.find(tab => tab.active), allTabs]))    
      .then(([currentTab, allTabs]) => allTabs.filter(tab => (tab.index > currentTab.index)))
  },
  one() {
    return chromep.tabs.query({ currentWindow: true, active: true })
  },
  allButOne() {
    return chromep.tabs.query({ currentWindow: true })
      .then(allTabs => ([allTabs.find(tab => tab.active), allTabs]))    
      .then(([currentTab, allTabs]) => allTabs.filter(tab => (tab.index !== currentTab.index)))
  }
};

const closeTabs = tabs => chromep.tabs.remove(tabs);

export default {
  getChromeTabs,
  closeTabs
}