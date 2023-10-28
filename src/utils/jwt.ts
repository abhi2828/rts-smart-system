import jwtDecode from 'jwt-decode';

import axios from './axios';
const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const setSession = (accessToken: string | null) => {
  if (accessToken) {
    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    // const { exp } = jwtDecode(accessToken);
    // handleTokenExpired(exp);
  } else {
    delete axios.defaults.headers.common.Authorization;
  }
};

const removeServerSession = () => {
  delete axios.defaults.headers.common.Authorization;
};

export { isValidToken, removeServerSession, setSession };
