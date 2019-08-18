export const setLocal = payload => ({
  type: 'SET_LOCALE',
  payload,
});

export const setCharacters = payload => ({
  type: 'SET_CHARACTERS',
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

// DEMO ===========================
// let nextTodoId = 0
// export const addTodo = text => ({
//   type: 'ADD_TODO',
//   id: nextTodoId++,
//   text,
// })

// export const toggleTodo = id => ({
//   type: 'TOGGLE_TODO',
//   id,
// })
// DEMO ===========================
