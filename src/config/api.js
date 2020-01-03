// using online api to know how diff is it.
export const APIUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_API_URL
  : process.env.REACT_APP_API_URL;

// origin, cross-origin permission
// const thumbnailUrl = 'https://ic-common.pmang.cloud/static/bdt_book/thumbnail';

export const thumbnailUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_RESOURCE_URL_DEV + '/thumbnail'
  : process.env.REACT_APP_RESOURCE_URL + '/thumbnail';

export const iconlUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_RESOURCE_URL_DEV + '/icon'
  : process.env.REACT_APP_RESOURCE_URL + '/icon';

export const bookDetailUrl = process.env.NODE_ENV === 'development'
  ? process.env.REACT_APP_BOOK_DEV + '/detail.html?id='
  : process.env.REACT_APP_BOOK + '/detail.html?id=';
