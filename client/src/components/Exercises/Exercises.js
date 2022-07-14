import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Stack } from "@mui/material";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import Navbar from "../Navbar/Navbar";
import bodyParts from "./BodyPartData";
import targets from "./TargetData";
import equipments from "./EquipmentData";

import classes from "./Exercises.module.css";
import {
  getExercises,
  getExercisesBySearch,
} from "../../features/exercises/exerciseSlice";
import Paginate from "../Paginate/Paginate";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Exercises() {
  const dispatch = useDispatch();
  const query = useQuery();
  const { exercises, isLoading } = useSelector((state) => state.exercises);
  const [bodyPartDropDown, setBodyPartDropDown] = useState(false);
  const [targetDropDown, setTargetDropDown] = useState(false);
  const [equipmentDropDown, setEquipmentDropDown] = useState(false);
  const searchQuery = query.get("searchQuery");
  const bodyPartQuery = query.get("bodyPart");
  const targetQuery = query.get("target");
  const equipmentQuery = query.get("equipment");
  const [exercise, setExercise] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [target, setTarget] = useState("");
  const [equipment, setEquipment] = useState("");
  const page = query.get("page") || 1;

  useEffect(() => {
    if (searchQuery || bodyPartQuery || targetQuery || equipmentQuery) {
      dispatch(
        getExercisesBySearch({
          page: page,
          exercise: searchQuery,
          bodyPart: bodyPartQuery,
          target: targetQuery,
          equipment: equipmentQuery,
        })
      );
      setExercise(searchQuery ? searchQuery : "");
      setBodyPart(bodyPartQuery ? bodyPartQuery : "");
      setTarget(targetQuery ? targetQuery : "");
      setEquipment(equipmentQuery ? equipmentQuery : "");
    } else {
      dispatch(getExercises(page));
      setExercise("");
      setBodyPart("");
      setTarget("");
      setEquipment("");
    }
  }, [page, searchQuery, bodyPartQuery, targetQuery, equipmentQuery]);

  const handleBodyPartDropDown = () => {
    setBodyPartDropDown(!bodyPartDropDown);
  };

  const handleChooseBodyPart = (bodyPart) => {
    setBodyPartDropDown(false);
    setBodyPart(bodyPart);
  };

  const handleTargetDropDown = () => {
    setTargetDropDown(!targetDropDown);
  };

  const handleChooseTarget = (target) => {
    setTargetDropDown(false);
    setTarget(target);
  };

  const handleEquipmentDropDown = () => {
    setEquipmentDropDown(!equipmentDropDown);
  };

  const handleChooseEquipment = (equipment) => {
    setEquipmentDropDown(false);
    setEquipment(equipment);
  };

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" style={{ color: "#bf5af2" }} />
      </div>
    );
  }

  return (
    <div className={classes.container}>
      <Navbar />
      <h1 className={classes.heading}>Exercises</h1>
      <div className={classes.exploreBody}>
        <div className={classes.dropDownList}>
          <input
            className={classes.titleInput}
            type="text"
            placeholder="Search for an exercise..."
            autoFocus={true}
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
          />
          <div className={classes.dropDown}>
            <button
              className={classes.dropDownButton}
              onClick={handleBodyPartDropDown}
              style={{
                borderRadius: bodyPartDropDown
                  ? "10px 10px 0px 0px"
                  : "10px 10px 10px 10px",
              }}
            >
              {bodyPart === "" ? "BODY PART" : bodyPart}{" "}
              <i className="downArrow fa-solid fa-caret-down"></i>
            </button>

            {bodyPartDropDown && (
              <div className={classes.dropDownOptionList}>
                {bodyParts.map((part, ind) => (
                  <div
                    className={classes.dropDownOptions}
                    onClick={() => handleChooseBodyPart(part)}
                    key={ind}
                  >
                    {part}
                  </div>
                ))}

                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseBodyPart("waist")}
                  style={{
                    borderRadius: "0px 0px 10px 10px",
                    borderBottom: "groove",
                  }}
                >
                  Waist
                </div>
              </div>
            )}
          </div>
          <div className={classes.dropDown}>
            <button
              className={classes.dropDownButton}
              onClick={handleTargetDropDown}
              style={{
                borderRadius: targetDropDown
                  ? "10px 10px 0px 0px"
                  : "10px 10px 10px 10px",
              }}
            >
              {target === "" ? "TARGET" : target}{" "}
              <i className="downArrow fa-solid fa-caret-down"></i>
            </button>

            {targetDropDown && (
              <div className={classes.dropDownOptionList}>
                {targets.map((targetItem, ind) => (
                  <div
                    className={classes.dropDownOptions}
                    onClick={() => handleChooseTarget(targetItem)}
                    key={ind}
                  >
                    {targetItem}
                  </div>
                ))}
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseTarget("upper back")}
                  style={{
                    borderRadius: "0px 0px 10px 10px",
                    borderBottom: "groove",
                  }}
                >
                  Upper Back
                </div>
              </div>
            )}
          </div>
          <div className={classes.dropDown}>
            <button
              className={classes.dropDownButton}
              onClick={handleEquipmentDropDown}
              style={{
                borderRadius: equipmentDropDown
                  ? "10px 10px 0px 0px"
                  : "10px 10px 10px 10px",
              }}
            >
              {equipment === "" ? "EQUIPMENT" : equipment}{" "}
              <i className="downArrow fa-solid fa-caret-down"></i>
            </button>

            {equipmentDropDown && (
              <div className={classes.dropDownOptionList}>
                {equipments.map((equipmentItem, ind) => (
                  <div
                    className={classes.dropDownOptions}
                    onClick={() => handleChooseEquipment(equipmentItem)}
                    key={ind}
                  >
                    {equipmentItem}
                  </div>
                ))}
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseEquipment("wheel roller")}
                  style={{
                    borderRadius: "0px 0px 10px 10px",
                    borderBottom: "groove",
                  }}
                >
                  Wheel Roller
                </div>
              </div>
            )}
          </div>
          <div className={classes.search}>
            <Link
              to={
                exercise && bodyPart && target && equipment
                  ? `/exercises/search?page=1&searchQuery=${exercise}&bodyPart=${bodyPart}&target=${target}&equipment=${equipment}`
                  : exercise && bodyPart && equipment
                  ? `/exercises/search?page=1&searchQuery=${exercise}&bodyPart=${bodyPart}&equipment=${equipment}`
                  : exercise && target && equipment
                  ? `/exercises/search?page=1&searchQuery=${exercise}&target=${target}&equipment=${equipment}`
                  : bodyPart && target && equipment
                  ? `/exercises/search?page=1&bodyPart=${bodyPart}&target=${target}&equipment=${equipment}`
                  : exercise && bodyPart && target
                  ? `/exercises/search?page=1&searchQuery=${exercise}&bodyPart=${bodyPart}&target=${target}`
                  : exercise && equipment
                  ? `/exercises/search?page=1&searchQuery=${exercise}&equipment=${equipment}`
                  : bodyPart && equipment
                  ? `/exercises/search?page=1&bodyPart=${bodyPart}&equipment=${equipment}`
                  : target && equipment
                  ? `/exercises/search?page=1&target=${target}&equipment=${equipment}`
                  : exercise && bodyPart
                  ? `/exercises/search?page=1&searchQuery=${exercise}&bodyPart=${bodyPart}`
                  : exercise && target
                  ? `/exercises/search?page=1&searchQuery=${exercise}&target=${target}`
                  : bodyPart && target
                  ? `/exercises/search?page=1&bodyPart=${bodyPart}&target=${target}`
                  : exercise
                  ? `/exercises/search?page=1&searchQuery=${exercise}`
                  : bodyPart
                  ? `/exercises/search?page=1&&bodyPart=${bodyPart}`
                  : target
                  ? `/exercises/search?page=1&target=${target}`
                  : equipment
                  ? `/exercises/search?page=1&equipment=${equipment}`
                  : ``
              }
              className={classes.exploreSearchLink}
            >
              <li className={classes.searchButton}>SEARCH</li>
            </Link>
          </div>
        </div>
      </div>
      <Box sx={{ mt: { lg: "30px" } }} mt="30px" p="20px">
        <Stack
          direction="row"
          sx={{ gap: { lg: "60px", xs: "40px" } }}
          flexWrap="wrap"
          justifyContent="center"
        >
          {exercises.map((exercise, index) => (
            <ExerciseCard key={index} exercise={exercise} />
          ))}
        </Stack>
      </Box>
      <Paginate page={page} />
    </div>
  );
}
