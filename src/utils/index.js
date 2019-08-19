/* eslint-disable no-underscore-dangle */
/* eslint-disable no-shadow */
/* eslint-disable no-param-reassign */
import _ from 'lodash';
import { thumbnailUrl } from '../config/api';

export const getThumbnailUrlByImageName = (_uiIconImageName = false) => {
    if (!_uiIconImageName) return null;
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
        // img.crossOrigin = 'anonymous';
        img.crossOrigin = 'use-credentials';
        // document.body.appendChild(img);
    });
}

export const generateUrlParams = (formation = []) => {
    if (formation.length === 0) return false;

    const url = process.env.NODE_ENV === 'development'
        ? 'http://localhost:3000/#/'
        : 'https://robby570.tw/browndust-share/#/';

    // url rule => o{id}o{code}o{queue}
    // each group connect by . => o{id}o{code}o{queue}.o{id}...
    return url + formation
        .filter(f => f.code !== 0) // query exist id
        .map(f => `o${f.id}o${f.code}${f.queue === 0 ? '' : 'o' + f.queue}`)
        .join('.');
}

export const initialFormation = (formation, charactors) => {
    window.location.hash
        .replace('#/', '')
        .split('.')
        .filter(String)
        .map(u => {
            // check url params valid
            const f = u.split('o').filter(String);
            if (f.length === 0 || f.length > 3) { console.error('Invalid url params.', u); return f; }

            // check position id
            const id = String(f[0]);
            const fm = formation.find(({ id }) => id === String(f[0]));
            if (_.isUndefined(fm)) { console.error('Invalid url params.', id); return f; }

            // check charactor by code
            const code = String(f[1]);
            const charactor = charactors.find(({ _code }) => _code === code);
            if (_.isUndefined(charactor)) { console.error('Invalid url params.', code); return f; }

            const type = Number(charactor._type);
            const backgroundImage = `url(${getThumbnailUrlByImageName(charactor._uiIconImageName)})`;
            const queue = Number(f[2]) > 0 && Number(f[2]) <= 12 ? Number(f[2]) : 0;

            // plan to update object by id
            return { id, code, type, backgroundImage, queue }
        })
        .forEach(u => {
            const index = formation.findIndex((f) => f.id === u.id);
            if (index === -1) return;

            formation[index] = { ...formation[index], ...u }
            console.info('Received data:', u.id)
        });
    return formation;
}