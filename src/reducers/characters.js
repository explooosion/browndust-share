import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  list: [],
};

const charactersSlice = createSlice({
  name: 'characters',
  initialState,
  reducers: {
    setCharacters(state, action) {
      if (_.isArray(action.payload)) {
        state.list = action.payload;
      }
    },
  },
});

export const { setCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;
