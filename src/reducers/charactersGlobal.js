import _ from 'lodash';

export default (state = [], action) => {
    switch (action.type) {
        case 'SET_CHARACTERS_GLOBAL':
            return _.isArray(action.payload) ? action.payload : state;
        default:
            return state;
    }
}
