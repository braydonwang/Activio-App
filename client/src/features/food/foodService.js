import axios from "axios";

const API_URL = "/food/";

const getFood = async (username) => {
  const { data } = await axios.get(API_URL + username.username);

  return data;
};

const addFood = async (foodData) => {
  const { data } = await axios.post(API_URL, foodData);

  return data;
};

const foodService = {
  getFood,
  addFood,
};

export default foodService;
