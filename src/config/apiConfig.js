export const BASE_URL = "http://localhost:3000/api";

export const API_ROUTES = {
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  profile: `${BASE_URL}/auth/profile`,
  uploadDocument: `${BASE_URL}/documents`,
  chat: `${BASE_URL}/chat`,
};
