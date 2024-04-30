export const get = (key) => JSON.parse(localStorage.getItem(key)) || []

export const create = (key, newData) => {
  const storageData = JSON.parse(localStorage.getItem(key)) || []
  localStorage.setItem(key, JSON.stringify([...storageData, newData]))
}

export const remove = (key, targetId) => {
  const storageData = JSON.parse(localStorage.getItem(key)) || []
  const removedData = storageData.filter((storageData) => storageData.id !== targetId)

  localStorage.setItem(key, JSON.stringify(removedData))
}

export const update = (key, targetId, updateText) => {
  const storageData = JSON.parse(localStorage.getItem(key)) || []

  const updatedData = storageData.map((storageData) => {
    if (storageData.id === targetId) {
      return { ...storageData, content: updateText }
    }

    return storageData
  })

  localStorage.setItem(key, JSON.stringify(updatedData))
}
