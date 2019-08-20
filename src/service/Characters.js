import { APIUrl } from '../config/api';

export const getCharacters = async () => fetch(APIUrl).then(data => data.json() || [])
