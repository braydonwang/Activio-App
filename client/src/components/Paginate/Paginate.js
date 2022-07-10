import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@mui/material";

import classes from "./Paginate.module.css";

export default function Paginate({ page }) {
  const location = useLocation();
  const { numberOfPages } = useSelector((state) => state.exercises);

  let urlFirst = location.pathname;
  const searchLocation = location.search.split("&");

  let urlSecond = "";

  for (let i = 1; i < searchLocation.length; i++) {
    urlSecond += "&" + searchLocation[i];
  }

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      variant="outlined"
      color="secondary"
      size="large"
      renderItem={(item) => (
        <PaginationItem
          style={{ color: "white", marginTop: "10px", marginBottom: "20px" }}
          {...item}
          component={Link}
          to={`${urlFirst}?page=${item.page}${urlSecond}`}
        />
      )}
    />
  );
}
