import { APIUrl } from '../config/api';

export const getCharacters = async () => {
    return fetch(APIUrl)
        .then(data => data.json())
        .catch(e => {
            console.log('error', e);
            console.log('change API url to dev');
            return fetch(process.env.REACT_APP_API_URL_DEV).then(d => d.json())
        })
}

export const getCharactersGlobal = async () => {
    return fetch(process.env.REACT_APP_API_URL_GLOBAL)
        .then(data => data.json())
        .catch(e => {
            console.log('error', e);
            console.log('change API url to dev');
            return fetch(process.env.REACT_APP_API_URL_DEV).then(d => d.json())
        })
}