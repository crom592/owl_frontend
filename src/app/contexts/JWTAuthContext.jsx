import jwtDecode from 'jwt-decode';
import React, { createContext, useEffect, useReducer } from 'react';

import axios from '../../axios.js';
import { MatxLoading } from '../components'; // MatxLoading은 예시에서 사용한 컴포넌트로, 실제 프로젝트에 맞게 변경 필요

const initialState = {
  isAuthenticated: false,
  isInitialised: false,
  user: null,
};

const isValidToken = (token) => {
  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (e) {
    return false;
  }
};
const setSession = (accesstoken, refresh) => {
  if (accesstoken) {
    sessionStorage.setItem('accesstoken', accesstoken);
    sessionStorage.setItem('refresh', refresh);
    axios.defaults.headers.common.Authorization = `Bearer ${accesstoken}`;
  } else {
    sessionStorage.removeItem('accesstoken');
    sessionStorage.removeItem('refresh');
    delete axios.defaults.headers.common.Authorization;
  }
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INIT': {
      const { isAuthenticated, role } = action.payload;
      return {
        ...state,
        isAuthenticated,
        isInitialised: true,
        role,
      };
    }
    case 'LOGIN': {
      const { role } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        role: role,
      };
    }
    case 'LOGOUT': {
      return {
        ...state,
        isAuthenticated: false,
        role: [],
      };
    }
    case 'SIGN_UP': {
      const { role } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        role,
      };
    }
    case 'UPDATE_USER': {
      const { user } = action.payload;
      return {
        ...state,
        isAuthenticated: true,
        user,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const AuthContext = createContext({
  ...initialState,
  method: 'JWT',
  login: () => Promise.resolve(),
  logout: () => {},
  register: () => Promise.resolve(),
  updateUser: () => Promise.resolve(),
});

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    initialState,
    role: null,
  });

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/signin/', {
        email,
        password,
      });

      console.log(response);
      // tokens 문자열을 파싱
      const tokenString = response.data.tokens; // 'access=...' 형태
      const tokenArray = tokenString.split('&'); // '&'로 분리
      const tokens = {}; // 토큰 객체 생성

      // 토큰 객체에 access와 refresh 할당
      tokenArray.forEach((token) => {
        const [key, value] = token.split('='); // '='로 분리
        tokens[key] = value; // 객체에 추가
      });

      const { access, refresh } = tokens; // 객체에서 access와 refresh 가져오기

      // JWT 디코딩
      const decodedToken = jwtDecode(access); // 액세스 토큰을 디코딩
      console.log('Decoded Token:', decodedToken);

      // 세션에 토큰 설정
      setSession(access, refresh); // setSession 함수가 정의되어 있어야 함

      // 상태 관리에 로그인 정보 저장
      dispatch({
        type: 'LOGIN',
        payload: {
          id: decodedToken.user_id,
          // role: decodedToken.role,
        },
      });
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (password, email) => {
    try {
      await axios.post('/api/signup/', {
        password: password,
        email: email,
      });
    } catch (error) {
      console.error('Sign-up failed:', error);
      throw error;
    }
  };

  const updateUser = async (updatedData) => {
    dispatch({
      type: 'UPDATE_USER',
      payload: { user: updatedData },
    });
  };

  const logout = async () => {
    try {
      // await axios.get('/v1/auth/logout');
      sessionStorage.removeItem('accesstoken');
      dispatch({ type: 'LOGOUT' });
    } catch (error) {
      console.error('Logout failed:', error);
      throw error;
    }
  };

  const checkToken = async () => {
    try {
      const accessToken = sessionStorage.getItem('accesstoken');
      if (accessToken) {
        if (isValidToken(accessToken)) {
          setSession(accessToken);
          const decodedToken = jwtDecode(accessToken);
          const user = {
            id: decodedToken.id,
            username: decodedToken.username,
          }; // 예시에서는 토큰에서 사용자 정보 추출
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: true,
              user,
            },
          });
        } else {
          console.log('Access token expired');
          dispatch({
            type: 'INIT',
            payload: {
              isAuthenticated: false,
              user: null,
            },
          });
        }
      } else {
        console.log('No access token found');
        dispatch({
          type: 'INIT',
          payload: {
            isAuthenticated: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error('Error checking token:', error);
      dispatch({
        type: 'INIT',
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  useEffect(() => {
    checkToken();
  }, []);

  if (!state.isInitialised) {
    return <MatxLoading />; // 초기화 중일 때 로딩 컴포넌트를 보여줄 수 있습니다.
  }

  return (
    <AuthContext.Provider
      value={{
        ...state,
        method: 'JWT',
        login,
        logout,
        register,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
