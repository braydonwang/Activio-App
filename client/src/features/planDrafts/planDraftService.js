import axios from "axios";

const API_URL = "/planDrafts/";

const getPlanDraft = async (username) => {
  const { data } = await axios.get(API_URL + username.username);
  return data;
};

const createPlanDraft = async (username) => {
  const { data } = await axios.post(API_URL, username);
  return data;
};

const updatePlanDraft = async (planData) => {
  planData.navigate("/planner");
  const { data } = await axios.put(API_URL + "update", planData.data);
  return data;
};

const removePlanDraft = async (planData) => {
  planData.navigate("/planner");
  const { data } = await axios.put(API_URL + "remove", planData.data);
  return data;
};

const updateLayout = async (planData) => {
  const { data } = await axios.put(API_URL + "layout", planData);
  return data;
};

const copyPlanDraft = async (planData) => {
  planData.navigate("/planner");
  const { data } = await axios.put(API_URL + "copy", planData.data);
  return data;
};

const planService = {
  createPlanDraft,
  getPlanDraft,
  updatePlanDraft,
  removePlanDraft,
  updateLayout,
  copyPlanDraft,
};

export default planService;
