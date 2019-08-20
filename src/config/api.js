export const APIUrl = process.env.NODE_ENV === 'development'
  ? 'https://raw.githubusercontent.com/explooosion/browndust-share/master/pre-work/getAllCharacters.json'
  : 'https://browndust-global-api.pmang.cloud/book/getAllCharacters';

// origin, cross-origin permission
// const thumbnailUrl = 'https://ic-common.pmang.cloud/static/bdt_book/thumbnail';

// on-line
export const thumbnailUrl = process.env.NODE_ENV === 'development'
  ? '/resource/thumbnail'
  : 'https://robby570.tw/browndust-share/resource/thumbnail';
