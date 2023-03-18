import axios from 'axios';
import queryString from 'query-string';

import { parse, stringify } from 'qs';

const axiosClient = axios.create({
    baseURL: 'http://localhost:8000',
    headers: {
      'content-type': 'application/json',
    },
    withCredentials: true,
    //query string dung de parse url thanh json thay cho axios (tranh tuong hop null url)
    //paramsSerializer: (params) => queryString.stringify(params),
    // paramsSerializer: {
    //   encode: parse,
    //   serialize: stringify,
    // },
});

// axiosClient.interceptors.request.use(
//     (config) => {
//       return config;
//     },
//     (error) => {
//       throw error;
//     },
// );

// axiosClient.interceptors.response.use(
//     (res) => {
//       return res;
//     },
//     (error) => {
//       throw error;
//     },
//   );
  
  export default axiosClient;
