import _ from 'lodash';
import Formation from '../models/Formation';
import { generateUrlParams } from '../utils';

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
    queueMax: 12,
    queue: [],
};

const dataset = (state = initialState, action) => {
    // set up url when formation update
    const formation = _.get(action.payload, 'formation');
    if (!_.isUndefined(formation)) {
        window.location.href = generateUrlParams(formation);
    }

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
