// using online api to know how diff is it.
export const APIUrl =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_API_URL
        : import.meta.env.VITE_API_URL;

// origin, cross-origin permission
// const thumbnailUrl = 'https://ic-common.pmang.cloud/static/bdt_book/thumbnail';

export const thumbnailUrl =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_RESOURCE_URL_DEV + "/thumbnail"
        : import.meta.env.VITE_RESOURCE_URL + "/thumbnail";

export const iconlUrl =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_RESOURCE_URL_DEV + "/icon"
        : import.meta.env.VITE_RESOURCE_URL + "/icon";

export const bookDetailUrl =
    import.meta.env.MODE === "development"
        ? import.meta.env.VITE_BOOK_DEV + "/detail.html?id="
        : import.meta.env.VITE_BOOK + "/detail.html?id=";
