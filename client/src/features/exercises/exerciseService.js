import axios from "axios";

const API_URL = "/exercises/";

const getExercises = async (page) => {
  const { data } = await axios.get(`/exercises?page=${page}`);

  return data;
};

const getExercise = async (id) => {
  const { data } = await axios.get(API_URL + id);
  const bodyPart = await axios.get(
    API_URL + `search?page=1&bodyPart=${data.data.bodyPart}`
  );
  const equipment = await axios.get(
    API_URL + `search?page=1&equipment=${data.data.equipment}`
  );

  const bodyPartData = bodyPart.data.data
    .filter((item) => item._id !== id)
    .slice(0, 10);
  const equipmentData = equipment.data.data
    .filter((item) => item._id !== id)
    .slice(0, 10);

  return {
    ...data,
    bodyPart: bodyPartData,
    equipment: equipmentData,
  };
};

const getExercisesBySearch = async (searchData) => {
  const { page, exercise, bodyPart, target, equipment } = searchData;
  let res;
  if (exercise && bodyPart && target && equipment) {
    res = await axios.get(
      API_URL +
        `search?page=${page}&searchQuery=${exercise}&bodyPart=${bodyPart}&target=${target}&equipment=${equipment}`
    );
  } else if (exercise && bodyPart && equipment) {
    res = await axios.get(
      API_URL +
        `search?page=${page}&searchQuery=${exercise}&bodyPart=${bodyPart}&equipment=${equipment}`
    );
  } else if (exercise && target && equipment) {
    res = await axios.get(
      API_URL +
        `search?page=${page}&searchQuery=${exercise}&target=${target}&equipment=${equipment}`
    );
  } else if (bodyPart && target && equipment) {
    res = await axios.get(
      API_URL +
        `search?page=${page}&bodyPart=${bodyPart}&target=${target}&equipment=${equipment}`
    );
  } else if (exercise && bodyPart && target) {
    res = await axios.get(
      API_URL +
        `search?page=${page}&searchQuery=${exercise}&bodyPart=${bodyPart}&target=${target}`
    );
  } else if (bodyPart && equipment) {
    res = await axios.get(
      API_URL +
        `search?page=${page}&bodyPart=${bodyPart}&equipment=${equipment}`
    );
  } else if (target && equipment) {
    res = await axios.get(
      API_URL + `search?page=${page}&target=${target}&equipment=${equipment}`
    );
  } else if (exercise && equipment) {
    res = await axios.get(
      API_URL +
        `search?page=${page}&searchQuery=${exercise}&equipment=${equipment}`
    );
  } else if (exercise && bodyPart) {
    res = await axios.get(
      API_URL +
        `search?page=${page}&searchQuery=${exercise}&bodyPart=${bodyPart}`
    );
  } else if (exercise && target) {
    res = await axios.get(
      API_URL + `search?page=${page}&searchQuery=${exercise}&target=${target}`
    );
  } else if (bodyPart && target) {
    res = await axios.get(
      API_URL + `search?page=${page}&bodyPart=${bodyPart}&target=${target}`
    );
  } else if (bodyPart) {
    res = await axios.get(API_URL + `search?page=${page}&bodyPart=${bodyPart}`);
  } else if (target) {
    res = await axios.get(API_URL + `search?page=${page}&target=${target}`);
  } else if (equipment) {
    res = await axios.get(
      API_URL + `search?page=${page}&equipment=${equipment}`
    );
  } else {
    res = await axios.get(
      API_URL + `search?page=${page}&searchQuery=${exercise}`
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
