import { useEffect } from "react";
import { useLocation } from "react-router-dom";
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
  const { exercises, currentPage, isLoading } = useSelector(
    (state) => state.exercises
  );
  const page = query.get("page") || 1;
  const bodyPart = query.get("bodyPart");
  const target = query.get("target");

  useEffect(() => {
    if (bodyPart || target) {
      dispatch(getExercisesBySearch({ bodyPart, target }));
    } else {
      dispatch(getExercises(page));
    }
  }, [page, bodyPart, target]);

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
