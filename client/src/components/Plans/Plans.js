import Plan from "../Plan/Plan"
import classes from "./Plans.module.css";

export default function Plans({plans}) {
    console.log(plans)
  return (
    <div className={classes.plans}>
      {plans.map(p=>(
        <Plan plan={p} />
      ))}
        
    </div>
  )
}
