import axios from './_axios';
import { Constants } from '../helpers';

const {
  login_api,
  signup_api,
  // admin_login_api
  refresh_token_api,
  google_auth_api,
} = Constants;

export const signUp = async (user, callback) => {
  try {
    const { data } = await axios.post(signup_api, user);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const logIn = async (auth, callback) => {
  try {
    const { data } = await axios.post(login_api, auth);
    callback(null, data);
  } catch (error) {
    callback(error);
  }
};

export const refreshToken = async () => {
  const { data } = await axios.get(refresh_token_api);
  return { ...data, status: 'success' };
};

