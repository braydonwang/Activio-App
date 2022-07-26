import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Navbar from "../Navbar/Navbar";
import { Button, Fade } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import musclesIcon from "../../images/muscles.png";
import fatIcon from "../../images/fatIcon.png";
import saltIcon from "../../images/saltIcon.png";
import carbsIcon from "../../images/carbsIcon.png";
import FileBase from "react-file-base64";
import defaultImage from "../../images/defaultImage.png";
import { addFood, getFood } from "../../features/food/foodSlice";

import classes from "./Tracker.module.css";
import classnames from "classnames";

export default function Tracker() {
  const dispatch = useDispatch();
  const { food, foodItem, isLoading } = useSelector((state) => state.food);
  const user = JSON.parse(localStorage.getItem("user"));
  const [addPop, setAddPop] = useState(false);
  const [file, setFile] = useState("");
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

  const handleAddFood = () => {
    dispatch(addFood({ ...foodForm, username: user.user.username }));
  };
  // const food = [
  //   {
  //     image: "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
  //     name: "Banana",
  //     calories: 900,
  //     protein: 30,
  //     sodium: 49,
  //     carbs: 90,
  //     fat: 80,
  //   },
  //   {
  //     image: "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
  //     name: "Big Mac Burger",
  //     calories: 900,
  //     protein: 30,
  //     sodium: 49,
  //     carbs: 90,
  //     fat: 80,
  //   },
  //   {
  //     image: "http://d205bpvrqc9yn1.cloudfront.net/0001.gif",
  //     name: "Waffles, Chips and Soda",
  //     calories: 900,
  //     protein: 30,
  //     sodium: 49,
  //     carbs: 90,
  //     fat: 80,
  //   },
  // ];
  return (
    <>
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
              <span style={{ margin: "10px 7px 5px 10px" }}>Add Food Item</span>
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
              <p className={classes.number}>1000</p>
              <p className={classes.totalText}>CALORIES</p>
            </div>
            <div className={classes.calorieContainer}>
              <img
                src={musclesIcon}
                alt="Muscle Icon"
                style={{ width: "35px", marginBottom: "15px" }}
              />
              <p className={classes.number}>50 g</p>
              <p className={classes.totalText}>PROTEIN</p>
            </div>
            <div className={classes.calorieContainer}>
              <img
                src={fatIcon}
                alt="Fat Icon"
                style={{ width: "35px", marginBottom: "15px" }}
              />
              <p className={classes.number}>30 g</p>
              <p className={classes.totalText}>FAT</p>
            </div>
            <div className={classes.calorieContainer}>
              <img
                src={saltIcon}
                alt="Salt Icon"
                style={{ width: "35px", marginBottom: "15px" }}
              />
              <p className={classes.number}>10 mg</p>
              <p className={classes.totalText}>SODIUM</p>
            </div>
            <div className={classes.calorieContainer}>
              <img
                src={carbsIcon}
                alt="Carbs Icon"
                style={{ width: "40px", marginBottom: "10px" }}
              />
              <p className={classes.number}>40 g</p>
              <p className={classes.totalText}>CARBS</p>
            </div>
          </div>
        </div>
        {food.map((foodObj, ind) => {
          const { image, name } = foodObj;
          return (
            <div className={classes.foodContainer} key={ind}>
              <img
                className={classes.image}
                src={image === "" ? defaultImage : image}
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
                onClick={() => {}}
              >
                <RemoveCircleIcon fontSize="large" />
              </IconButton>
              <IconButton
                style={{ position: "absolute", right: "15px", top: "10px" }}
                color="inherit"
                aria-label="edit"
                onClick={() => {}}
              >
                <MoreHorizIcon fontSize="large" />
              </IconButton>
            </div>
          );
        })}
      </div>

      <Fade in={addPop}>
        <div className={classes.addPop}>
          {file && (
            <div className={classes.writeImgDiv}>
              <img src={file} alt="" className={classes.writeImg} />
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
                    value={file}
                    multiple={false}
                    onDone={({ base64 }) => setFile(base64)}
                  />
                </div>
              </label>
            </div>
          )}

          {!file && (
            <>
              <label>
                <i className={classnames(classes.writeIcon, "fas fa-plus")}></i>
                <div className={classes.fileTypeContainer}>
                  <FileBase
                    type="file"
                    value={file}
                    multiple={false}
                    onDone={({ base64 }) => setFile(base64)}
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
              </div>
            </div>

            <span className={classes.shareButtonList}>
              <button className={classes.shareSubmit} onClick={handleAddFood}>
                Add
              </button>
              <button
                className={classes.shareCancel}
                onClick={() => setAddPop(false)}
              >
                Cancel
              </button>
            </span>
          </div>
        </div>
      </Fade>
    </>
  );
}
