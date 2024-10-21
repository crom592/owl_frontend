import axios from 'axios';
import jwtDecode from 'jwt-decode';

const REDIRECT_PAGE = '/';
const apiBaseURL = import.meta.env.VITE_API_URL;
const axiosInstance = axios.create({
  baseURL: apiBaseURL,
  withCredentials: true, // 쿠키를 포함하는 설정
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const isValidToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (e) {
    return false;
  }
};

let lock = false;
let subscribers = []; // 콜백함수를 담는 큐

function subscribeTokenRefresh(cb) {
  subscribers.push(cb);
}

function onRefreshed(token) {
  subscribers.forEach((cb) => cb(token));
  subscribers = [];
}

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem('accesstoken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalConfig = error.config;

    if (originalConfig.url !== '/v1/auth/login' && error.response) {
      // Access Token was expired
      if (error.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;

        if (lock) {
          return new Promise((resolve) => {
            subscribeTokenRefresh((token) => {
              originalConfig.headers.Authorization = `Bearer ${token}`;
              resolve(axiosInstance(originalConfig));
            });
          });
        }

        lock = true;

        try {
          // 여기서 쿠키에서 refreshToken을 읽어오는 방식으로 구현
          const refreshToken = document.cookie.replace(
            /(?:(?:^|.*;\s*)refreshtoken\s*=\s*([^;]*).*$)|^.*$/,
            '$1'
          );

          const rs = await axiosInstance.post('/v1/auth/refresh', { refresh: refreshToken });

          const { accessToken } = rs.data;
          sessionStorage.setItem('accesstoken', accessToken);
          axiosInstance.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
          originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          lock = false;
          onRefreshed(accessToken);

          return axiosInstance(originalConfig);
        } catch (_error) {
          lock = false;
          subscribers = [];
          sessionStorage.removeItem('accesstoken');
          window.alert('토큰이 만료되었습니다. 다시 로그인 하세요.');
          window.location.replace(REDIRECT_PAGE);
          return Promise.reject(_error);
        }
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
