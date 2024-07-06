import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import charactersReducer from "./reducers/characters";
import charactersGlobalReducer from "./reducers/charactersGlobal";
import datasetReducer from "./reducers/dataset";
import settingsReducer from "./reducers/settings";

import useGenerateUrlParams from "./middleware/useGenerateUrlParams";

const store = configureStore({
    reducer: {
        characters: charactersReducer,
        charactersGlobal: charactersGlobalReducer,
        dataset: datasetReducer,
        settings: settingsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk, useGenerateUrlParams.middleware),
});

export default store;
