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
  const target = await axios.get(
    API_URL + `/search?target=${data.data.target}`
  );
  const equipment = await axios.get(
    API_URL + `/search?equipment=${data.data.equipment}`
  );

  const bodyPartData = bodyPart.data.data.filter((item) => item._id !== id);
  const targetData = target.data.data.filter((item) => item._id !== id);
  const equipmentData = equipment.data.data.filter((item) => item._id !== id);

  return {
    ...data,
    bodyPart: bodyPartData,
    target: targetData,
    equipment: equipmentData,
  };
};

const getExercisesBySearch = async (searchData) => {
  const { exercise, bodyPart, target, equipment } = searchData;
  let res;
  if (exercise && bodyPart && target && equipment) {
    res = await axios.get(
      API_URL +
        `/search?searchQuery=${exercise}&bodyPart=${bodyPart}&target=${target}&equipment=${equipment}`
    );
  } else if (exercise && bodyPart && equipment) {
    res = await axios.get(
      API_URL +
        `/search?searchQuery=${exercise}&bodyPart=${bodyPart}&equipment=${equipment}`
    );
  } else if (exercise && target && equipment) {
    res = await axios.get(
      API_URL +
        `/search?searchQuery=${exercise}&target=${target}&equipment=${equipment}`
    );
  } else if (bodyPart && target && equipment) {
    res = await axios.get(
      API_URL +
        `/search?bodyPart=${bodyPart}&target=${target}&equipment=${equipment}`
    );
  } else if (exercise && bodyPart && target) {
    res = await axios.get(
      API_URL +
        `/search?searchQuery=${exercise}&bodyPart=${bodyPart}&target=${target}`
    );
  } else if (bodyPart && equipment) {
    res = await axios.get(
      API_URL + `/search?bodyPart=${bodyPart}&equipment=${equipment}`
    );
  } else if (target && equipment) {
    res = await axios.get(
      API_URL + `/search?target=${target}&equipment=${equipment}`
    );
  } else if (exercise && equipment) {
    res = await axios.get(
      API_URL + `/search?searchQuery=${exercise}&equipment=${equipment}`
    );
  } else if (exercise && bodyPart) {
    res = await axios.get(
      API_URL + `/search?searchQuery=${exercise}&bodyPart=${bodyPart}`
    );
  } else if (exercise && target) {
    res = await axios.get(
      API_URL + `/search?searchQuery=${exercise}&target=${target}`
    );
  } else if (bodyPart && target) {
    res = await axios.get(
      API_URL + `/search?bodyPart=${bodyPart}&target=${target}`
    );
  } else if (bodyPart) {
    res = await axios.get(API_URL + `/search?bodyPart=${bodyPart}`);
  } else if (target) {
    res = await axios.get(API_URL + `/search?target=${target}`);
  } else if (equipment) {
    res = await axios.get(API_URL + `/search?equipment=${equipment}`);
  } else {
    res = await axios.get(API_URL + `/search?searchQuery=${exercise}`);
  }

  return res.data;
};

const exerciseServce = {
  getExercises,
  getExercise,
  getExercisesBySearch,
};

export default exerciseServce;
