import axios from 'axios';

let MozfinService = axios.create({
    baseURL: 'http://52.168.85.231/',
    timeout: 10000,
  });

export const setClientToken = token => {
    MozfinService.interceptors.request.use(function(config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  };
  
  export default MozfinService;