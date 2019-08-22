export const setLocal = payload => ({
  type: 'SET_LOCALE',
  payload,
});

export const setCharacters = payload => ({
  type: 'SET_CHARACTERS',
  payload,
});

export const setCharactersGlobal = payload => ({
  type: 'SET_CHARACTERS_GLOBAL',
  payload,
});

export const updateDataset = payload => ({
  type: 'UPDATE_FORMATION',
  payload,
});

export const resetDataset = payload => ({
  type: 'RESET_FORMATION',
  payload,
});
