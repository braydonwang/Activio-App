import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, CircularProgress, Stack } from "@mui/material";
import ExerciseCard from "./ExerciseCard/ExerciseCard";
import Navbar from "../Navbar/Navbar";

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
  const [exercise, setExercise] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [target, setTarget] = useState("");
  const page = query.get("page") || 1;
  const bodyPartQuery = query.get("bodyPart");
  const targetQuery = query.get("target");

  const bodyParts = [
    {
      name: "all",
      title: "All",
    },
    {
      name: "back",
      title: "Back",
    },
    {
      name: "cardio",
      title: "Cardio",
    },
    {
      name: "chest",
      title: "Chest",
    },
    {
      name: "lower-arms",
      title: "Lower Arms",
    },
    {
      name: "lower-legs",
      title: "Lower Legs",
    },
    {
      name: "neck",
      title: "Neck",
    },
    {
      name: "shoulders",
      title: "Shoulders",
    },
    {
      name: "upper-arms",
      title: "Upper Arms",
    },
    {
      name: "upper-legs",
      title: "Upper Legs",
    },
  ];

  useEffect(() => {
    if (bodyPartQuery || targetQuery) {
      dispatch(
        getExercisesBySearch({ bodyPart: bodyPartQuery, target: targetQuery })
      );
    } else {
      dispatch(getExercises(page));
    }
  }, [page, bodyPartQuery, targetQuery]);

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

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" />
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
                {bodyParts.map((part) => (
                  <div
                    className={classes.dropDownOptions}
                    onClick={() => handleChooseBodyPart(part.name)}
                  >
                    {part.title}
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
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseTarget("newest")}
                >
                  Newest
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseTarget("oldest")}
                >
                  Oldest
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseTarget("most liked")}
                >
                  Most Liked
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseTarget("alphabetical")}
                  style={{
                    borderRadius: "0px 0px 10px 10px",
                    borderBottom: "groove",
                  }}
                >
                  Alphabetical
                </div>
              </div>
            )}
          </div>
          <div className={classes.search}>
            <Link
              to={
                exercise && bodyPart && target
                  ? `/exercises/search?searchQuery=${exercise}&bodyPart=${bodyPart}&target=${target}`
                  : exercise && bodyPart
                  ? `/exercises/search?searchQuery=${exercise}&bodyPart=${bodyPart}`
                  : exercise && target
                  ? `/exercises/search?searchQuery=${exercise}&target=${target}`
                  : bodyPart && target
                  ? `/exercises/search?bodyPart=${bodyPart}&target=${target}`
                  : exercise
                  ? `/exercises/search?searchQuery=${exercise}`
                  : bodyPart
                  ? `/exercises/search?bodyPart=${bodyPart}`
                  : target
                  ? `/exercises/search?target=${target}`
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
      {!bodyPart && !target && <Paginate page={page} />}
    </div>
  );
}
