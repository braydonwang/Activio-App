import axios from "axios";

const API_URL = "/users/";

const numberOfUsers = async () => {
  const { data } = await axios.get(API_URL + "numUsers");
  return data;
};

const userService = {
  numberOfUsers,
};

export default userService;
