import { createSlice } from "@reduxjs/toolkit";
import isArray from "lodash/isArray";

const initialState = {
    list: [],
};

const charactersGlobalSlice = createSlice({
    name: "charactersGlobal",
    initialState,
    reducers: {
        setCharactersGlobal(state, action) {
            if (isArray(action.payload)) {
                state.list = action.payload;
            }
        },
    },
});

export const { setCharactersGlobal } = charactersGlobalSlice.actions;

export default charactersGlobalSlice.reducer;
