import axios from "axios";

const API_URL = "/auth/";

const signup = async (userData) => {
  const res = await axios.post(API_URL + "register", userData.formData);
  localStorage.setItem("user", JSON.stringify(res.data));
  userData.navigate("/");
  return res.data;
};

const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData.formData);
  localStorage.setItem("user", JSON.stringify(res.data));
  userData.navigate("/");
  return res.data;
};

const logout = async () => {
  localStorage.removeItem("user");
};

const authService = {
  signup,
  login,
  logout,
};

export default authService;
