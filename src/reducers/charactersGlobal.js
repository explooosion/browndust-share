import { createSlice } from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  list: [],
};

const charactersGlobalSlice = createSlice({
  name: 'charactersGlobal',
  initialState,
  reducers: {
    setCharactersGlobal(state, action) {
      if (_.isArray(action.payload)) {
        state.list = action.payload;
      }
    },
  },
});

export const { setCharactersGlobal } = charactersGlobalSlice.actions;

export default charactersGlobalSlice.reducer;
