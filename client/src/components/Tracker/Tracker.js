import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { Button, Fade, CircularProgress } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import LocalDiningIcon from "@mui/icons-material/LocalDining";
import musclesIcon from "../../images/muscles.png";
import fatIcon from "../../images/fatIcon.png";
import saltIcon from "../../images/saltIcon.png";
import carbsIcon from "../../images/carbsIcon.png";
import FileBase from "react-file-base64";
import defaultFood from "../../images/defaultFood.jpg";
import {
  addFood,
  editFood,
  getFood,
  removeFood,
} from "../../features/food/foodSlice";
import axios from "axios";

import classes from "./Tracker.module.css";
import classnames from "classnames";

export default function Tracker() {
  const dispatch = useDispatch();
  const { food, isLoading } = useSelector((state) => state.food);
  const user = JSON.parse(localStorage.getItem("user"));
  const [addPop, setAddPop] = useState(false);
  const [isEditing, setIsEditing] = useState(-1);
  const [totalNutrition, setTotalNutrition] = useState({
    calories: 0,
    protein: 0,
    fat: 0,
    sodium: 0,
    carbs: 0,
  });
  const [foodForm, setFoodForm] = useState({
    image: "",
    name: "",
    calories: "",
    protein: "",
    fat: "",
    sodium: "",
    carbs: "",
  });

  useEffect(() => {
    dispatch(getFood({ username: user.user.username }));
  }, []);

  useEffect(() => {
    let calories = 0;
    let protein = 0;
    let fat = 0;
    let sodium = 0;
    let carbs = 0;
    for (let i = 0; i < food.length; i++) {
      calories += Number(food[i].calories);
      protein += Number(food[i].protein);
      fat += Number(food[i].fat);
      sodium += Number(food[i].sodium);
      carbs += Number(food[i].carbs);
    }
    setTotalNutrition({ calories, protein, fat, sodium, carbs });
  }, [food]);

  const handleAddFood = () => {
    if (isEditing !== -1) {
      dispatch(
        editFood({
          id: isEditing,
          data: {
            ...foodForm,
            calories: foodForm.calories === "" ? "0" : foodForm.calories,
            protein: foodForm.protein === "" ? "0" : foodForm.protein,
            fat: foodForm.fat === "" ? "0" : foodForm.fat,
            sodium: foodForm.sodium === "" ? "0" : foodForm.sodium,
            carbs: foodForm.carbs === "" ? "0" : foodForm.carbs,
            username: user.user.username,
          },
        })
      );
    } else {
      dispatch(
        addFood({
          ...foodForm,
          calories: foodForm.calories === "" ? "0" : foodForm.calories,
          protein: foodForm.protein === "" ? "0" : foodForm.protein,
          fat: foodForm.fat === "" ? "0" : foodForm.fat,
          sodium: foodForm.sodium === "" ? "0" : foodForm.sodium,
          carbs: foodForm.carbs === "" ? "0" : foodForm.carbs,
          username: user.user.username,
        })
      );
    }
    setFoodForm({
      image: "",
      name: "",
      calories: "",
      protein: "",
      fat: "",
      sodium: "",
      carbs: "",
    });
    setAddPop(false);
  };

  const handleRemove = (id) => {
    dispatch(removeFood(id));
  };

  const handleEdit = (foodData) => {
    setFoodForm(foodData);
    setAddPop(true);
    setIsEditing(foodData._id);
  };

  const handleCancel = () => {
    setAddPop(false);
    setIsEditing(-1);
    setFoodForm({
      image: "",
      name: "",
      calories: "",
      protein: "",
      fat: "",
      sodium: "",
      carbs: "",
    });
  };

  const handlePredict = async (base64) => {
    setFoodForm({ ...foodForm, image: base64 });
    const resp = await axios.post("/predict", {
      image: base64,
    });
    console.log(resp.data);
  };

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" style={{ color: "#bf5af2" }} />
      </div>
    );
  }

  return (
    <>
      <main
        style={{
          opacity: addPop ? 0.1 : 1,
          paddingBottom: "50px",
        }}
      >
        <Navbar />
        <div className={classes.topBar}>
          <h1 className={classes.heading}>Nutrition Tracker</h1>
          <div className={classes.topButton}>
            <span className={classes.addButton}>
              <Button
                onClick={() => setAddPop(true)}
                style={{
                  color: "inherit",
                  fontSize: "inherit",
                  margin: "0",
                  padding: "0 23px",
                  transition: "0.1s",
                  cursor: "pointer",
                  backgroundColor: "inherit",
                }}
              >
                <span style={{ margin: "10px 7px 5px 10px" }}>
                  Add Food Item
                </span>
                <FastfoodIcon style={{ marginLeft: "5px" }} />
              </Button>
            </span>
          </div>
        </div>
        <div>
          <div className={classes.totalContainer}>
            <h3 className={classes.totalName}>Total Nutrition</h3>
            <div className={classes.statContainer}>
              <div className={classes.calorieContainer}>
                <LocalFireDepartmentIcon
                  style={{ marginBottom: "15px" }}
                  fontSize="large"
                />
                <p className={classes.number}>{totalNutrition.calories}</p>
                <p className={classes.totalText}>CALORIES</p>
              </div>
              <div className={classes.calorieContainer}>
                <img
                  src={musclesIcon}
                  alt="Muscle Icon"
                  style={{ width: "35px", marginBottom: "15px" }}
                />
                <p className={classes.number}>{totalNutrition.protein} g</p>
                <p className={classes.totalText}>PROTEIN</p>
              </div>
              <div className={classes.calorieContainer}>
                <img
                  src={fatIcon}
                  alt="Fat Icon"
                  style={{ width: "35px", marginBottom: "15px" }}
                />
                <p className={classes.number}>{totalNutrition.fat} g</p>
                <p className={classes.totalText}>FAT</p>
              </div>
              <div className={classes.calorieContainer}>
                <img
                  src={saltIcon}
                  alt="Salt Icon"
                  style={{ width: "35px", marginBottom: "15px" }}
                />
                <p className={classes.number}>{totalNutrition.sodium} mg</p>
                <p className={classes.totalText}>SODIUM</p>
              </div>
              <div className={classes.calorieContainer}>
                <img
                  src={carbsIcon}
                  alt="Carbs Icon"
                  style={{ width: "40px", marginBottom: "10px" }}
                />
                <p className={classes.number}>{totalNutrition.carbs} g</p>
                <p className={classes.totalText}>CARBS</p>
              </div>
            </div>
          </div>

          {food.length === 0 && (
            <div className={classes.noFoodContainer}>
              <h1 className={classes.noFood}>
                There are no food items in your nutrition tracker
              </h1>
              <h2 className={classes.addFood}>
                Click the{" "}
                <span
                  style={{
                    fontSize: "1.6vw",
                    fontWeight: "800",
                    color: "purple",
                  }}
                >
                  top right button
                </span>{" "}
                to add some!
              </h2>
              <LocalDiningIcon style={{ fontSize: "10em" }} />
            </div>
          )}

          {food.map((foodObj, ind) => {
            const { image, name } = foodObj;
            return (
              <div className={classes.foodContainer} key={ind}>
                <img
                  className={classes.image}
                  src={image === "" ? defaultFood : image}
                  alt={name}
                  loading="lazy"
                />
                <h3 className={classes.name}>{name}</h3>
                <div className={classes.statContainer}>
                  <div className={classes.calorieContainer}>
                    <p className={classes.number}>{foodObj.calories}</p>
                    <p className={classes.text}>CALORIES</p>
                  </div>
                  <div className={classes.calorieContainer}>
                    <p className={classes.number}>{foodObj.protein} g</p>
                    <p className={classes.text}>PROTEIN</p>
                  </div>
                  <div className={classes.calorieContainer}>
                    <p className={classes.number}>{foodObj.fat} g</p>
                    <p className={classes.text}>FAT</p>
                  </div>
                  <div className={classes.calorieContainer}>
                    <p className={classes.number}>{foodObj.sodium} mg</p>
                    <p className={classes.text}>SODIUM</p>
                  </div>
                  <div className={classes.calorieContainer}>
                    <p className={classes.number}>{foodObj.carbs} g</p>
                    <p className={classes.text}>CARBS</p>
                  </div>
                </div>
                <IconButton
                  style={{ position: "absolute", right: "60px", top: "10px" }}
                  color="inherit"
                  aria-label="remove"
                  onClick={() => handleRemove(foodObj._id)}
                >
                  <RemoveCircleIcon fontSize="large" />
                </IconButton>
                <IconButton
                  style={{ position: "absolute", right: "15px", top: "10px" }}
                  color="inherit"
                  aria-label="edit"
                  onClick={() => handleEdit(foodObj)}
                >
                  <MoreHorizIcon fontSize="large" />
                </IconButton>
              </div>
            );
          })}
        </div>
      </main>

      <Fade in={addPop}>
        <div className={classes.addPop}>
          {foodForm.image && (
            <div className={classes.writeImgDiv}>
              <img src={foodForm.image} alt="" className={classes.writeImg} />
              <label>
                <i
                  className={classnames(
                    classes.writeEditIcon,
                    "fa-solid fa-pen-to-square"
                  )}
                ></i>
                <div className={classes.fileTypeContainer}>
                  <FileBase
                    type="file"
                    value={foodForm.image}
                    multiple={false}
                    onDone={({ base64 }) => handlePredict(base64)}
                  />
                </div>
              </label>
            </div>
          )}

          {!foodForm.image && (
            <>
              <label>
                <i className={classnames(classes.writeIcon, "fas fa-plus")}></i>
                <div className={classes.fileTypeContainer}>
                  <FileBase
                    type="file"
                    value={foodForm.image}
                    multiple={false}
                    onDone={({ base64 }) => handlePredict(base64)}
                  />
                </div>
              </label>
            </>
          )}

          <div className={classes.writeForm}>
            <div className={classes.writeFormGroup}>
              <div className={classes.writeFormSubGroup}>
                <input
                  type="text"
                  placeholder="Name of Food"
                  value={foodForm.name}
                  className={classes.writeInput}
                  autoFocus={true}
                  onChange={(e) =>
                    setFoodForm({ ...foodForm, name: e.target.value })
                  }
                />
                <div className={classes.planPopUpItem}>
                  <span className={classes.planPopUpTitle}>CALORIES</span>
                  <input
                    type="number"
                    className={classes.planPopUpInput}
                    placeholder="0"
                    value={foodForm.calories}
                    onChange={(e) => {
                      if (e.target.value < 9999) {
                        setFoodForm({ ...foodForm, calories: e.target.value });
                      }
                    }}
                  />
                </div>
              </div>
              <div className={classes.writeFormSubGroupBot}>
                <div className={classes.planPopUpItemBot}>
                  <span className={classes.planPopUpTitle}>PROTEIN (g)</span>
                  <input
                    type="number"
                    className={classes.planPopUpInput}
                    placeholder="0"
                    value={foodForm.protein}
                    onChange={(e) => {
                      if (e.target.value < 9999) {
                        setFoodForm({ ...foodForm, protein: e.target.value });
                      }
                    }}
                  />
                </div>
                <div className={classes.planPopUpItemBot}>
                  <span className={classes.planPopUpTitle}>FAT (g)</span>
                  <input
                    type="number"
                    className={classes.planPopUpInput}
                    placeholder="0"
                    value={foodForm.fat}
                    onChange={(e) => {
                      if (e.target.value < 9999) {
                        setFoodForm({ ...foodForm, fat: e.target.value });
                      }
                    }}
                  />
                </div>
              </div>
              <div className={classes.writeFormSubGroupBot}>
                <div className={classes.planPopUpItemBot}>
                  <span className={classes.planPopUpTitle}>SODIUM (mg)</span>
                  <input
                    type="number"
                    className={classes.planPopUpInput}
                    placeholder="0"
                    value={foodForm.sodium}
                    onChange={(e) => {
                      if (e.target.value < 9999) {
                        setFoodForm({ ...foodForm, sodium: e.target.value });
                      }
                    }}
                  />
                </div>
                <div className={classes.planPopUpItemBot}>
                  <span className={classes.planPopUpTitle}>CARBS (g)</span>
                  <input
                    type="number"
                    className={classes.planPopUpInput}
                    placeholder="0"
                    value={foodForm.carbs}
                    onChange={(e) => {
                      if (e.target.value < 9999) {
                        setFoodForm({ ...foodForm, carbs: e.target.value });
                      }
                    }}
                  />
                </div>
              </div>
            </div>

            <span className={classes.shareButtonList}>
              <button className={classes.shareSubmit} onClick={handleAddFood}>
                Add
              </button>
              <button className={classes.shareCancel} onClick={handleCancel}>
                Cancel
              </button>
            </span>
          </div>
        </div>
      </Fade>
    </>
  );
}
