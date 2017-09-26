export const toggleIncognito = (tabGroup) => ({...tabGroup, incognito: !tabGroup.incognito})

export const updateTabGroup = (list, updated) =>  {
  const updatedIndex = list.findIndex(item => item.id === updated.id);
  return [
    ...list.slice(0, updatedIndex),
    updated,
    ...list.slice(updatedIndex + 1)
  ]
}

export const findTabGroupById = (list, id) => list.find(item => item.id === id)




