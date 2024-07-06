import { createListenerMiddleware } from "@reduxjs/toolkit";

import { setFormation } from "../reducers/dataset";
import { generateUrlParams } from "../utils";

const listenerMiddleware = createListenerMiddleware();

const formationEffect = async (_, listenerApi) => {
    const state = listenerApi.getState();
    const url = generateUrlParams(state.dataset.formation);
    if (url !== window.location.href) {
        window.history.replaceState({}, "", url);
    }
};

listenerMiddleware.startListening({
    actionCreator: setFormation,
    effect: formationEffect,
});

export default listenerMiddleware;
