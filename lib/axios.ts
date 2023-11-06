import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_AUTH_BASE_URL,
  withCredentials: true,
});

export default instance;
