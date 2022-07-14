import Plan from "../Plan/Plan";
import { CircularProgress } from "@mui/material";
import { useSelector } from "react-redux";
import classes from "./Plans.module.css";

export default function Plans() {
  const { plans, isLoading } = useSelector((state) => state.plans);

  if (isLoading) {
    return (
      <div className={classes.loadingContainer}>
        <CircularProgress size="7em" style={{ color: "#bf5af2" }} />
      </div>
    );
  }

  return (
    <div className={classes.plans}>
      {plans.map((p) => (
        <Plan plan={p} key={p._id} />
      ))}
    </div>
  );
}
