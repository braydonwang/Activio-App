import axios from "axios";

const API_URL = "/exercises/";

const getExercises = async (page) => {
  const { data } = await axios.get(`/exercises?page=${page}`);

  return data;
};

const getExercise = async (id) => {
  const { data } = await axios.get(API_URL + id);

  return data;
};

const getExercisesBySearch = async (searchData) => {
  let res;
  if (searchData.bodyPart && searchData.target) {
    res = await axios.get(
      API_URL +
        `/search?bodyPart=${searchData.bodyPart}&target=${searchData.target}`
    );
  } else if (searchData.bodyPart) {
    res = await axios.get(API_URL + `/search?bodyPart=${searchData.bodyPart}`);
  } else {
    res = await axios.get(API_URL + `/search?target=${searchData.target}`);
  }

  return res.data;
};

const exerciseServce = {
  getExercises,
  getExercise,
  getExercisesBySearch,
};

export default exerciseServce;
