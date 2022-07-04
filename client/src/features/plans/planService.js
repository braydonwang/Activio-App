import axios from "axios";

const API_URL = "/plans/";

const numberOfPlans = async () => {
  const { data } = await axios.get(API_URL + "numPlans");
  return data;
};

const planService = {
  numberOfPlans,
};

export default planService;
