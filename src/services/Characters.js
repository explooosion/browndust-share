import { APIUrl } from '../config/api';

export const getCharacters = async () => {
  return fetch(APIUrl)
    .then(response => response.ok
      ? response.json()
      : console.warn('Change api url to github.') || fetch(process.env.REACT_APP_API_URL_DEV).then(d => d.json())
    )
    .catch(() =>
      console.warn('Change api url to github.') || fetch(process.env.REACT_APP_API_URL_DEV).then(d => d.json())
    )
}

export const getCharactersGlobal = async () => {
  return fetch(process.env.REACT_APP_API_URL_GLOBAL)
    .then(response => response.ok
      ? response.json()
      : console.warn('Change global api url to github.') || fetch(process.env.REACT_APP_API_URL_GLOBAL_DEV).then(d => d.json())
    )
    .catch(() =>
      console.warn('Change global api url to github.') || fetch(process.env.REACT_APP_API_URL_GLOBAL_DEV).then(d => d.json())
    )
}
