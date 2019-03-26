import axios from 'axios'


export const axiosGithub = axios.create({
  baseURL: 'https://api.github.com',
  headers: {
    'Accept': 'application/json'
  }
})

export const axiosJSON = axios.create({
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export const queryParse = (search = window.location.search) => {
  if (!search) return {}
  const queryString = search[0] === '?' ? search.substring(1) : search
  const query = {}
  queryString
    .split('&')
    .forEach(queryStr => {
      const [key, value] = queryStr.split('=')
      /* istanbul ignore else */
      if (key) query[decodeURIComponent(key)] = decodeURIComponent(value)
    })
  return query
}

export const transCode = (str) =>{
  return window.btoa(unescape(encodeURIComponent(str)));
}

export const deCode = (str) => {
  return decodeURIComponent(escape(window.atob(str)));
}