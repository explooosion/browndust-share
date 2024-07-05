import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import charactersReducer from "./reducers/characters";
import charactersGlobalReducer from "./reducers/charactersGlobal";
import datasetReducer from "./reducers/dataset";
import settingsReducer from "./reducers/settings";

const store = configureStore({
    reducer: {
        characters: charactersReducer,
        charactersGlobal: charactersGlobalReducer,
        dataset: datasetReducer,
        settings: settingsReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
    devTools: true, // import.meta.MODE !== 'production',
});

export default store;
