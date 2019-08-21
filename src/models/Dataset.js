
import Formation from './Formation';

export default {
    formation: Formation,
    options: {
        type: true,
        backcolor: true,
        backimage: true,
        queue: true,
        reverse: false,
    },
    ref: null,
    queueMode: false,
    queueMax: 12,
    queue: [],
};