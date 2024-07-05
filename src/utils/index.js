import _ from "lodash";
import { thumbnailUrl, iconlUrl } from "../config/api";

/**
 * Get the icon URL based on the character type ID.
 * @param {number} type - The character type ID.
 * @returns {string} The icon URL.
 */
export const getIconUrlByTypeId = (type) => {
    switch (type) {
        case 0:
            return "";
        case 1:
            return "";
        case 2:
            return `url(${iconlUrl}/icon_charType__legend.png)`;
        case 3:
            return `url(${iconlUrl}/icon_charType__warrior.png)`;
        case 4:
            return `url(${iconlUrl}/icon_charType__defender.png)`;
        case 5:
            return `url(${iconlUrl}/icon_charType__magician.png)`;
        case 6:
            return `url(${iconlUrl}/icon_charType__supporter.png)`;
        case 7:
            return "";
        default:
            return "";
    }
};

/**
 * Get the thumbnail URL based on the image name.
 * @param {string} _uiIconImageName - The image name.
 * @returns {string|null} The thumbnail URL or null if the image name is falsy.
 */
export const getThumbnailUrlByImageName = (_uiIconImageName = false) => {
    if (!_uiIconImageName) return null;
    const id = _uiIconImageName.split("*")[1];
    return `${thumbnailUrl}/${id}.png`;
};

/**
 * Resize an image URL.
 * @param {string} datas - The image data.
 * @param {number|null} w - The width of the resized image. If null, the width will be calculated based on the height.
 * @param {number|null} h - The height of the resized image. If null, the height will be calculated based on the width.
 * @returns {Promise<string>} A promise that resolves to the data URI of the resized image.
 */
export const resizeImageURL = (datas, w = null, h = w / 2) => {
    return new Promise((resolve) => {
        const img = document.createElement("img");
        img.onload = () => {
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            if (w !== null) canvas.width = w;
            if (h !== null) canvas.height = h;
            ctx.drawImage(img, 0, 0, w, h);
            const dataURI = canvas.toDataURL();
            resolve(dataURI);
        };
        img.src = datas;
        // img.crossOrigin = 'anonymous';
        img.crossOrigin = "use-credentials";
        // document.body.appendChild(img);
    });
};

/**
 * Generate URL parameters based on the formation.
 * @param {Array} formation - The formation array.
 * @returns {string|boolean} The generated URL parameters or false if the formation is empty.
 */
export const generateUrlParams = (formation = []) => {
    if (formation.length === 0) return false;

    const url =
        import.meta.env.MODE === "development"
            ? import.meta.env.VITE_WEB_URL_DEV
            : import.meta.env.VITE_WEB_URL;

    // url rule => o{id}o{uniqueCode}o{queue}o{level}
    // each group connect by . => o{id}o{uniqueCode}o{queue}.o{level}...
    return (
        url +
        formation
            .filter((f) => f.uniqueCode !== 0) // query exist id
            .map(
                (f) =>
                    `o${f.id}o${f.uniqueCode}o${f.queue === 0 ? "" : f.queue}o${
                        f.level === 0 ? "" : f.level
                    }`,
            )
            .join(".")
    );
};

/**
 * Initialize the formation based on the URL parameters.
 * @param {Array} formation - The formation array.
 * @param {Array} charactors - The charactors array.
 * @returns {Array} The updated formation array.
 */
export const initialFormation = (formation = [], charactors = []) => {
    window.location.hash
        .replace("#/", "")
        .split(".")
        .filter(String)
        .map((u) => {
            // check url params valid
            const f = u.split("o");
            f.shift();
            if (f.length === 0) {
                console.warn("Invalid url params.", u);
                return f;
            }

            // check position id
            const id = String(f[0]);
            const fm = formation.find(({ id }) => id === String(f[0]));
            if (_.isUndefined(fm)) {
                console.warn("Invalid url param: id", id);
                return f;
            }

            // check charactor by uniqueCode
            const uniqueCode = String(f[1]);
            const charactor = charactors.find(
                ({ _uniqueCode }) => String(_uniqueCode) === uniqueCode,
            );
            if (_.isUndefined(charactor)) {
                console.warn("Invalid url params: uniqueCode", uniqueCode);
                return f;
            }

            const type = Number(charactor._type);
            const backgroundImage = `url(${getThumbnailUrlByImageName(
                charactor._uiIconImageName,
            )})`;
            const queue =
                Number(f[2]) > 0 && Number(f[2]) <= 12 ? Number(f[2]) : 0;

            let level =
                Number(f[3]) > 15 || Number(f[3]) < 1 ? 0 : Number(f[3]);
            level = _.isNaN(level) ? 0 : level;
            // plan to update object by id
            return { id, uniqueCode, type, backgroundImage, queue, level };
        })
        .forEach((u) => {
            const index = formation.findIndex((f) => f.id === u.id);
            if (index === -1) return;

            formation[index] = { ...formation[index], ...u };
            console.info("Received data:", u.id, u.uniqueCode);
        });
    return formation;
};
