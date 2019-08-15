const URL = 'https://browndust-global-api.pmang.cloud/book/getAllCharacters';

const getCharacters = async () => fetch(URL).then(data => data.json() || [])

export { getCharacters };
