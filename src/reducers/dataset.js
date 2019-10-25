import _ from 'lodash';
import Dataset from '../models/Dataset';
import { generateUrlParams } from '../utils';

export default (state = Dataset, action) => {
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
