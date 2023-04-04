import md5 from 'md5';
import fetchJSONP from 'fetch-jsonp';

const apiUrl = 'https://fanyi-api.baidu.com/api/trans/vip/translate';
const appid = localStorage.getItem('appid');
const secret = localStorage.getItem('secret');

const requestTranslate = (q, from, to) => {
  const salt = Math.random();
  const sign = md5(appid + q + salt + secret);
  const params = new URLSearchParams({
    q,
    from,
    to,
    salt,
    appid,
    sign,
  });
  return fetchJSONP(`${apiUrl}?${params}`);
};

export default requestTranslate;