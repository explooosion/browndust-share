
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
    levelDialog: { show: false, left: 0, top: 0, id: null },
};