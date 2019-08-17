/* eslint-disable no-underscore-dangle */
const http = require('http');
const Stream = require('stream').Transform;
const fs = require('fs');

const URL = 'http://ic-common.pmang.cloud/static/bdt_book/thumbnail/';

const thumbnails = require('./getAllCharacters.json');
const icons = require('./getIconCharType.json');

thumbnails
    .map(d => {
        return {
            url: `${URL}${d._uiIconImageName.split('*')[1]}.png`,
            name: `${d._uiIconImageName.split('*')[1]}.png`,
        }
    })
    .forEach(({ url, name }, index, arr) => {
        http.request(url, response => {
            const data = new Stream();
            console.log(`parse:${url}`);
            response.on('data', chunk => data.push(chunk));
            response.on('end', () => fs.writeFileSync(`./public/resource/thumbnail/${name}`, data.read()));
        }).end();
    });

icons.forEach(({ url, name }, index, arr) => {
    http.request(url, response => {
        const data = new Stream();
        console.log(`parse:${url}`);
        response.on('data', chunk => data.push(chunk));
        response.on('end', () => fs.writeFileSync(`./public/resource/icon/${name}`, data.read()));
    }).end();
});