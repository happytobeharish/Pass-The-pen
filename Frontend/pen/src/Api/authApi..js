import axios from "axios";

export const signup = async (payload) => {
  const res = await axios.post("/api/auth/signup", payload);
  return res.data;
};

export const login = async (payload) => {
  const res = await axios.post("/api/auth/login", payload);
  return res.data;
}; 