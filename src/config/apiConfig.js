
//api.js
const API_ENDPOINT = "https://ragapi.meliorus.co.nz/api"
const DEV_API = "http://localhost:3000/api";
console.log(API_ENDPOINT, import.meta.env)

export const BASE_URL = !import.meta.PROD ? API_ENDPOINT : DEV_API;
console.log(BASE_URL)
export const API_ROUTES = {
  register: `${BASE_URL}/auth/register`,
  login: `${BASE_URL}/auth/login`,
  profile: `${BASE_URL}/auth/profile`,
  uploadDocument: `${BASE_URL}/documents`,
  chat: `${BASE_URL}/chat`,
};
