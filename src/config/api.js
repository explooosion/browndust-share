export const APIUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_API_URL_DEV
  : process.env.REACT_APP_API_URL;

// origin, cross-origin permission
// const thumbnailUrl = 'https://ic-common.pmang.cloud/static/bdt_book/thumbnail';

// on-line
export const thumbnailUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_RESOURCE_URL_DEV + '/thumbnail'
  : process.env.REACT_APP_RESOURCE_URL + '/thumbnail';

  export const iconlUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_RESOURCE_URL_DEV + '/icon'
  : process.env.REACT_APP_RESOURCE_URL + '/icon';
