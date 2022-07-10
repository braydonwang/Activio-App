import axios from "axios";

const API_URL = "/plans/";

const numberOfPlans = async () => {
  const { data } = await axios.get(API_URL + "numPlans");
  return data;
};

const getPlans = async (search) => {
  const { data } = await axios.get("/plans" + search);
  return data;
};

const planService = {
  numberOfPlans,
  getPlans,
};

export default planService;
