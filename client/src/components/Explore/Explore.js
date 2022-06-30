import classes from "./Explore.module.css";
import Plans from "../Plans/Plans";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function Explore() {
  const [plans, setPlans] = useState([]);
  const { search } = useLocation();

  useEffect(() => {
    const fetchPlans = async () => {
      const res = await axios.get("/plans" + search);
      setPlans(res.data);
    };
    fetchPlans();
  }, [search]);
  return (
  <>
    <Plans plans={plans} />
  </>
  );
}
