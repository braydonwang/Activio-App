import Plan from "../Plan/Plan"
import classes from "./Plans.module.css";

export default function Plans({plans}) {
  return (
    <div className={classes.plans}>
      {plans.map(p=>(
        <Plan post={p} />
      ))}
        
    </div>
  )
}
