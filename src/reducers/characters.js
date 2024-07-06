import { createSlice } from "@reduxjs/toolkit";
import isArray from "lodash/isArray";

const initialState = {
    list: [],
};

const charactersSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        setCharacters(state, action) {
            if (isArray(action.payload)) {
                state.list = action.payload;
            }
        },
    },
});

export const { setCharacters } = charactersSlice.actions;

export default charactersSlice.reducer;
