const useLocalStorageValue = (key) => {
  const item = window.localStorage.getItem(key)
  return item ? JSON.parse(item) : null
}

export default useLocalStorageValue