import axios from "axios";

const API_URL = "/exercises/";

const getExercises = async (page) => {
  const { data } = await axios.get(API_URL);

  return data;
};

const getExercise = async (id) => {
  const { data } = await axios.get(API_URL + id);

  return data;
};

const exerciseServce = {
  getExercises,
  getExercise,
};

export default exerciseServce;
