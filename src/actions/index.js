export const setLocal = locale => ({
  type: 'SET_LOCALE',
  locale: locale,
});

export const setCharacters = characters => ({
  type: 'SET_CHARACTERS',
  characters: characters,
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
