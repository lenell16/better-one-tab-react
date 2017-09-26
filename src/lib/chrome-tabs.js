import ChromePromise from 'chrome-promise'

const chromep = new ChromePromise()

export const getChromeTabs = {
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

export function closeTabs (tabs) {
  const tabsToBeRemoved = tabs.filter(({ active }) => !active).map(({ id }) => id);
  return chromep.tabs.remove(tabsToBeRemoved)
    .then(() => tabs);
}


export async function openLinks (windowType, tabURLs) {
  const { incognito, id } = await chromep.windows.getCurrent();
  if (windowType === incognito) {
    if (tabURLs instanceof Array) {   
      Promise.all(tabURLs.map(url => chromep.tabs.create({ url })))
    } else {     
      chromep.tabs.create({ url: tabURLs })
    }
  } else {
    chromep.windows.create({ url: tabURLs, incognito: windowType });
  }
}