import { useContext } from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";
import { Typography } from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ExerciseCard from "../Exercises/ExerciseCard/ExerciseCard";

import classes from "./HorizontalScrollbar.module.css";

const LeftArrow = () => {
  const { scrollPrev } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollPrev()} className={classes.arrow}>
      <ArrowBackIosNewIcon fontSize="large" style={{ margin: "0 5px" }} />
    </Typography>
  );
};

const RightArrow = () => {
  const { scrollNext } = useContext(VisibilityContext);

  return (
    <Typography onClick={() => scrollNext()} className={classes.arrow}>
      <ArrowForwardIosIcon fontSize="large" style={{ margin: "0 5px" }} />
    </Typography>
  );
};

export default function HorizontalScrollbar({ data }) {
  return (
    <ScrollMenu
      LeftArrow={LeftArrow}
      RightArrow={RightArrow}
      className={classes.scrollmenu}
    >
      {data.map((item, ind) => (
        <ExerciseCard exercise={item} key={ind} />
      ))}
    </ScrollMenu>
  );
}
