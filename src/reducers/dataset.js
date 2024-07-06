import { createSlice } from "@reduxjs/toolkit";

import Dataset from "../models/Dataset";

const initialState = { ...Dataset };

export const DATA_KEYS = [
    "type",
    "backgroundImage",
    "uniqueCode",
    "queue",
    "level",
];

export const datasetSlice = createSlice({
    name: "dataset",
    initialState,
    reducers: {
        setRef: (state, action) => {
            state.ref = action.payload;
        },
        setFormation: (state, action) => {
            state.formation = action.payload;
        },
        setLevelDialog: (state, action) => {
            state.levelDialog = action.payload;
        },
        setMercenarySelected: (state, action) => {
            state.mercenarySelected = action.payload;
        },
        setOptions: (state, action) => {
            state.options = action.payload;
        },
        setQueue: (state, action) => {
            state.queue = action.payload;
        },
        setQueueMode: (state, action) => {
            state.queueMode = action.payload;
        },
        reset() {
            return { ...Dataset };
        },
    },
});

export const {
    setRef,
    setFormation,
    setLevelDialog,
    setMercenarySelected,
    setOptions,
    setQueue,
    setQueueMode,
    reset,
} = datasetSlice.actions;

export default datasetSlice.reducer;
