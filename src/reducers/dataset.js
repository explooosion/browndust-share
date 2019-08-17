import Formation from '../models/Formation';

const initialState = {
    formation: Formation,
    options: {
        type: true,
        backcolor: true,
        backimage: true,
        queue: true,
    },
    ref: null,
    queueMode: false,
    queueMax: 9,
    queue: [],
};

const dataset = (state = initialState, action) => {
    switch (action.type) {
        case 'RESET_FORMATION':
            return { ...state, ...action.payload };
        case 'UPDATE_FORMATION':
            return { ...state, ...action.payload };
        default:
            return state;
    }
}

export default dataset;
