import { thumbnailUrl } from '../config/api';

const getThumbnailUrlByImageName = (_uiIconImageName = '') => {
    const id = _uiIconImageName.split('*')[1];
    return `${thumbnailUrl}/${id}.png`;
}

export {
    getThumbnailUrlByImageName,
}