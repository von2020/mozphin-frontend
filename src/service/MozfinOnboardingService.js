import axios from 'axios';

let MozfinOnboardingService = axios.create({
    baseURL: 'http://38.242.253.175:44888/',
    timeout: 10000,
  });

export const setClientOnboardToken = token => {
    MozfinOnboardingService.interceptors.request.use(function(config) {
      config.headers.Authorization = `Bearer ${token}`;
      return config;
    });
  };
  
  export default MozfinOnboardingService;