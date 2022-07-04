import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Pagination, PaginationItem } from "@mui/material";

import classes from "./Paginate.module.css";

export default function Paginate({ page }) {
  const { numberOfPages } = useSelector((state) => state.exercises);

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
          to={`/exercises?page=${item.page}`}
        />
      )}
    />
  );
}
