import { APIUrl } from '../config/api';

const getCharacters = async () => fetch(APIUrl).then(data => data.json() || [])

export { getCharacters };
