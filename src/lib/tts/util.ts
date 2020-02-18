import QueryString from "querystring";
import uuid from "uuid/v1";

const BAIDU_API_TOKEN = "BAIDU-API-TOKEN";
const baiduAi = {
  token: "/oauth/2.0/token",
  text2audio: "https://tsn.baidu.com/text2audio"
};
export type TOKEN = {
  // eslint-disable-next-line camelcase
  access_token: string,
  // eslint-disable-next-line camelcase
  expires_in: number,
  // eslint-disable-next-line camelcase
  refresh_token: string,
  scope: string,
  // eslint-disable-next-line camelcase
  session_key: string,
  // eslint-disable-next-line camelcase
  session_secret: string
}

/**
 * 获取鉴权Token
 * @returns {Promise<TOKEN>}
 */
const getToken = (): Promise<TOKEN> => {
  const token = JSON.parse(sessionStorage.getItem(BAIDU_API_TOKEN) || JSON.stringify({ expires_in: 0 }));
  if (token.expires_in > new Date().valueOf()) return Promise.resolve(token);
  return fetch(baiduAi.token).then(res => {
    if (res.status >= 200 && res.status < 300) return res.json();
    else throw res.text();
  }).then(authToken => {
    authToken.expires_in = new Date().valueOf() + authToken.expires_in * 1000;
    sessionStorage.setItem(BAIDU_API_TOKEN, JSON.stringify(authToken));
    return authToken;
  });
};

const defaultBody = {
  cuid: uuid(),
  ctp: 1,
  lan: "zh",
  spd: 3, // 语速
  pit: 6, // 语调
  vol: 15, // 音量
  per: 4 // 基础音库
};

export const tts = async (tex: string) => {
  const tok = (await getToken()).access_token;
  return fetch(baiduAi.text2audio, {
    method: "POST",
    body: QueryString.stringify(Object.assign({}, defaultBody, { tex, tok }))
  }).then((response) => {
    const contentType = response.headers.get("content-type") || "";
    if (contentType.indexOf("audio") !== -1) return response.blob();
    else throw response.json();
  }).then(blob => URL.createObjectURL(blob));
};
