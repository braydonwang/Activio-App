import axios from "axios";

const API_URL = "/plans/";

const numberOfPlans = async () => {
  const { data } = await axios.get(API_URL + "numPlans");
  return data;
};

const createPlan = async (planData) => {
  const { data } = await axios.post(API_URL, planData.data);
  planData.navigate("/explore");
  return data;
};

const getPlans = async (search) => {
  const { data } = await axios.get("/plans" + search);
  return data;
};

const getPlan = async (id) => {
  const { data } = await axios.get("/plans/" + id);
  return data;
};

const updatePlan = async (planData) => {
  const { data } = await axios.put(`/plans/${planData.id}`, {
    username: planData.username,
    desc: planData.desc,
    title: planData.title,
    likeCount: planData.likeCount,
    likedUsers: planData.likedUsers,
  });
  return data;
};

const updateLikes = async (planData) => {
  const { data } = await axios.put(`/plans/likes/${planData.id}`, {
    username: planData.username,
  });
  return data;
};

const planService = {
  numberOfPlans,
  createPlan,
  getPlans,
  getPlan,
  updatePlan,
  updateLikes,
};

export default planService;
