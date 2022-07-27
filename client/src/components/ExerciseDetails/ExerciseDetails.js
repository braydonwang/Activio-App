import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import Navbar from "../Navbar/Navbar";
import { CircularProgress } from "@mui/material";
import Fade from "@mui/material/Fade";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import classes from "./ExerciseDetails.module.css";
import { getExercise } from "../../features/exercises/exerciseSlice";
import {
  removePlanDraft,
  updatePlanDraft,
} from "../../features/planDrafts/planDraftSlice";

import bodyPartImg from "../../images/body-part.png";
import equipmentImg from "../../images/equipment.png";
import targetImg from "../../images/target.png";
import HorizontalScrollbar from "../HorizontalScrollbar/HorizontalScrollbar";

export default function ExerciseDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { exercise, similarBodyPart, similarEquipment, isLoading } =
    useSelector((state) => state.exercises);
  const { authData } = useSelector((state) => state.auth);
  const { planExercises } = useSelector((state) => state.planDrafts);

  const [popUp, setPopUp] = useState(false);
  const [formData, setFormData] = useState({
    time: "",
    sets: "",
    reps: "",
  });
  const [inPlanner, setInPlanner] = useState(false);

  useEffect(() => {
    dispatch(getExercise(id));
    setInPlanner(planExercises.some((planObj) => planObj.id === id));
  }, [id]);

  if (!exercise) {
    return null;
  }

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" style={{ color: "#bf5af2" }} />
      </div>
    );
  }

  const { bodyPart, gifUrl, name, target, equipment } = exercise;

  const extraDetail = [
    { icon: bodyPartImg, name: bodyPart, path: "bodyPart" },
    { icon: targetImg, name: target, path: "target" },
    { icon: equipmentImg, name: equipment, path: "equipment" },
  ];

  const handleAddExercise = () => {
    if (formData.time !== "" && formData.sets !== "" && formData.reps !== "") {
      dispatch(
        updatePlanDraft({
          data: {
            username: authData.user.username,
            exercise: {
              ...formData,
              id,
              gifUrl,
              name,
            },
          },
          navigate,
        })
      );
      setFormData({
        time: "",
        sets: "",
        reps: "",
      });
      setPopUp(false);
    }
  };

  const handleRemove = () => {
    dispatch(
      removePlanDraft({
        data: {
          username: authData.user.username,
          exercise: {
            id,
            name,
          },
        },
        navigate,
      })
    );
  };

  return (
    <>
      <main
        className={classes.mainContainer}
        style={{
          opacity: popUp ? 0.1 : 1,
        }}
      >
        <Navbar />
        <main className={classes.detailContainer}>
          <main className={classes.exerciseContainer}>
            <img
              src={gifUrl}
              alt={name}
              loading="lazy"
              className={classes.image}
            />
            <div className={classes.text}>
              <h1 className={classes.heading}>{name}</h1>
              <h3 className={classes.description}>
                Exercising is an essential aspect of life that not only keeps
                you healthy, but also improves your mood and mental well-being.{" "}
                <span
                  style={{ textTransform: "capitalize", fontWeight: "700" }}
                >
                  {name}
                </span>{" "}
                is one of the best{" "}
                <span style={{ fontWeight: "700" }}>{equipment}</span> exercises
                to target your{" "}
                <span style={{ fontWeight: "700" }}>{target}</span>.
              </h3>
              {extraDetail?.map((item, ind) => (
                <div className={classes.items} key={ind}>
                  <Button
                    sx={{
                      background: "rgb(78, 6, 137)",
                      borderRadius: "50%",
                      width: "100px",
                      height: "100px",
                      margin: "10px 0",
                    }}
                    onClick={() =>
                      navigate(
                        `/exercises/search?page=1&${item.path}=${item.name}`
                      )
                    }
                  >
                    <img
                      src={item.icon}
                      alt={bodyPart}
                      style={{ width: "50px", height: "50px" }}
                    />
                  </Button>
                  <h2 className={classes.itemName}>{item.name}</h2>
                </div>
              ))}
            </div>
          </main>
          <span className={classes.button}>
            <div className={classes.addButton}>
              <Button
                style={{
                  color: inPlanner ? "grey" : "inherit",
                  fontSize: "inherit",
                  borderColor: inPlanner ? "grey" : "inherit",
                  minWidth: "243px",
                  cursor: inPlanner ? "none" : "pointer",
                  opacity: inPlanner ? "0.5" : "1",
                }}
                disabled={inPlanner}
                variant="outlined"
                onClick={() => setPopUp(true)}
              >
                <AddCircleIcon style={{ marginRight: "10px" }} /> Add to Plan
              </Button>
            </div>
            <div className={classes.removeButton}>
              <Button
                style={{
                  color: !inPlanner ? "grey" : "inherit",
                  fontSize: "inherit",
                  borderColor: !inPlanner ? "grey" : "inherit",
                  minWidth: "243px",
                  cursor: !inPlanner ? "none" : "pointer",
                  opacity: !inPlanner ? "0.5" : "1",
                }}
                disabled={!inPlanner}
                variant="outlined"
                onClick={handleRemove}
              >
                <RemoveCircleIcon style={{ marginRight: "10px" }} />
                Remove from Plan
              </Button>
            </div>
          </span>
        </main>
        <h2 className={classes.subheading}>
          Similar <span style={{ color: "#bf5af2" }}>Body Part</span> Exercises:
        </h2>
        <HorizontalScrollbar data={similarBodyPart} />
        <h2 className={classes.subheading}>
          Similar <span style={{ color: "#5E5CE6" }}>Equipment</span> Exercises:
        </h2>
        <HorizontalScrollbar data={similarEquipment} />
      </main>

      <Fade in={popUp}>
        <div className={classes.planPopUp}>
          <span className={classes.planPopUpBigTitle}>ADD TO PLAN</span>
          <div className={classes.planPopUpItem}>
            <span className={classes.planPopUpTitle}>TIME (SEC)</span>
            <input
              type="number"
              className={classes.planPopUpInput}
              placeholder="0"
              value={formData.time}
              onChange={(e) => {
                if (e.target.value < 999) {
                  setFormData({ ...formData, time: e.target.value });
                }
              }}
            />
          </div>
          <div className={classes.planPopUpItem}>
            <span className={classes.planPopUpTitle}>SETS</span>
            <input
              type="number"
              className={classes.planPopUpInput}
              placeholder="0"
              value={formData.sets}
              onChange={(e) => {
                if (e.target.value < 999) {
                  setFormData({ ...formData, sets: e.target.value });
                }
              }}
            />
          </div>
          <div className={classes.planPopUpItem}>
            <span className={classes.planPopUpTitle}>REPS</span>
            <input
              type="number"
              className={classes.planPopUpInput}
              placeholder="0"
              value={formData.reps}
              onChange={(e) => {
                if (e.target.value < 999) {
                  setFormData({ ...formData, reps: e.target.value });
                }
              }}
            />
          </div>
          <span className={classes.popUpButton}>
            <button
              className={classes.popUpConfirmButton}
              onClick={handleAddExercise}
            >
              <AddCircleIcon style={{ marginRight: "3px", fontSize: "18px" }} />{" "}
              Confirm
            </button>
            <button
              className={classes.popUpCancelButton}
              onClick={() => {
                setPopUp(false);
                setFormData({
                  time: "",
                  sets: "",
                  reps: "",
                });
              }}
            >
              <RemoveCircleIcon
                style={{ marginRight: "3px", fontSize: "18px" }}
              />
              Cancel
            </button>
          </span>
        </div>
      </Fade>
    </>
  );
}
