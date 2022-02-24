// 本地存储模块
export const getItem = key => {
  const data = window.sessionStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch {
    return data
  }
}
// 在localStorage设置item
export const setItem = (key, value) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    window.sessionStorage.setItem(key, value)
  }
}
export const removeItem = key => {
  try {
    window.sessionStorage.removeItem(key)
  } catch {
    return null
  }
}
