import { thumbnailUrl } from '../config/api';

export const getThumbnailUrlByImageName = (_uiIconImageName = '') => {
    const id = _uiIconImageName.split('*')[1];
    return `${thumbnailUrl}/${id}.png`;
}

export const resizeImageURL = (datas, w = null, h = w / 2) => {
    return new Promise((resolve) => {
        const img = document.createElement('img');
        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            if (w !== null) canvas.width = w;
            if (h !== null) canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            const dataURI = canvas.toDataURL();
            resolve(dataURI);
        };
        img.src = datas;
        img.crossOrigin = 'Anonymous';
        // document.body.appendChild(img);
    });
}
