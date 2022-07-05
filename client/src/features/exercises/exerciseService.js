import axios from "axios";

const API_URL = "/exercises/";

const getExercises = async (page) => {
  const { data } = await axios.get(`/exercises?page=${page}`);

  return data;
};

const getExercise = async (id) => {
  const { data } = await axios.get(API_URL + id);
  const bodyPart = await axios.get(
    API_URL + `/search?bodyPart=${data.data.bodyPart}`
  );

  return { ...data, bodyPart: bodyPart.data };
};

const getExercisesBySearch = async (searchData) => {
  let res;
  if (searchData.exercise && searchData.bodyPart && searchData.target) {
    res = await axios.get(
      API_URL +
        `/search?searchQuery=${searchData.exercise}&bodyPart=${searchData.bodyPart}&target=${searchData.target}`
    );
  } else if (searchData.exercise && searchData.bodyPart) {
    res = await axios.get(
      API_URL +
        `/search?searchQuery=${searchData.exercise}&bodyPart=${searchData.bodyPart}`
    );
  } else if (searchData.exercise && searchData.target) {
    res = await axios.get(
      API_URL +
        `/search?searchQuery=${searchData.exercise}&target=${searchData.target}`
    );
  } else if (searchData.bodyPart && searchData.target) {
    res = await axios.get(
      API_URL +
        `/search?bodyPart=${searchData.bodyPart}&target=${searchData.target}`
    );
  } else if (searchData.bodyPart) {
    res = await axios.get(API_URL + `/search?bodyPart=${searchData.bodyPart}`);
  } else if (searchData.target) {
    res = await axios.get(API_URL + `/search?target=${searchData.target}`);
  } else {
    res = await axios.get(
      API_URL + `/search?searchQuery=${searchData.exercise}`
    );
  }

  return res.data;
};

const exerciseServce = {
  getExercises,
  getExercise,
  getExercisesBySearch,
};

export default exerciseServce;
