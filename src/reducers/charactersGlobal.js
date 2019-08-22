export default (state = [], action) => {
    switch (action.type) {
        case 'SET_CHARACTERS_GLOBAL':
            return action.payload;
        default:
            return state;
    }
}
