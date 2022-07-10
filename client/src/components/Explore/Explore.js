import classes from "./Explore.module.css";
import Plans from "../Plans/Plans";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getPlans } from "../../features/plans/planSlice";
import Navbar from "../Navbar/Navbar";

export default function Explore() {
  const [category, setCategory] = useState("");
  const [sort, setSort] = useState("");
  const [title, setTitle] = useState("");
  const [catDropDown, setCatDropDown] = useState(false);
  const [sortDropDown, setSortDropDown] = useState(false);
  const { search } = useLocation();
  const dispatch = useDispatch();

  const handleCatDropDown = () => {
    setCatDropDown(!catDropDown);
  };

  const handleChooseCat = (cat) => {
    setCatDropDown(false);
    setCategory(cat);
  };

  const handleSortDropDown = () => {
    setSortDropDown(!sortDropDown);
  };

  const handleChooseSort = (sort) => {
    setSortDropDown(false);
    setSort(sort);
  };

  useEffect(() => {
    dispatch(getPlans(search));
  }, [search]);
  return (
    <>
      <Navbar />
      <div className={classes.exploreContainer}>
        <span className={classes.exploreTitle}>Explore</span>
      </div>
      <div className={classes.exploreBody}>
        <span className={classes.planDesc}>
          Discover what others have to share...
        </span>
        <div className={classes.dropDownList}>
          <input
            className={classes.titleInput}
            type="text"
            placeholder="Search for a title..."
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className={classes.dropDown}>
            <button
              className={classes.dropDownButton}
              onClick={handleCatDropDown}
              style={{
                borderRadius: catDropDown
                  ? "10px 10px 0px 0px"
                  : "10px 10px 10px 10px",
              }}
            >
              {category === "" ? "CATEGORIES" : category}{" "}
              <i className="downArrow fa-solid fa-caret-down"></i>
            </button>

            {catDropDown && (
              <div className={classes.dropDownOptionList}>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseCat("all")}
                >
                  All
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseCat("aerobic")}
                >
                  Aerobic
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseCat("strength")}
                >
                  Strength
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseCat("flexibility")}
                >
                  Flexibility
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseCat("balance")}
                  style={{
                    borderRadius: "0px 0px 10px 10px",
                    borderBottom: "groove",
                  }}
                >
                  Balance
                </div>
              </div>
            )}
          </div>
          <div className={classes.dropDown}>
            <button
              className={classes.dropDownButton}
              onClick={handleSortDropDown}
              style={{
                borderRadius: sortDropDown
                  ? "10px 10px 0px 0px"
                  : "10px 10px 10px 10px",
              }}
            >
              {sort === "" ? "SORT BY" : sort}{" "}
              <i className="downArrow fa-solid fa-caret-down"></i>
            </button>

            {sortDropDown && (
              <div className={classes.dropDownOptionList}>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseSort("newest")}
                >
                  Newest
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseSort("oldest")}
                >
                  Oldest
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseSort("most liked")}
                >
                  Most Liked
                </div>
                <div
                  className={classes.dropDownOptions}
                  onClick={() => handleChooseSort("alphabetical")}
                  style={{
                    borderRadius: "0px 0px 10px 10px",
                    borderBottom: "groove",
                  }}
                >
                  Alphabetical
                </div>
              </div>
            )}
          </div>
          <div className={classes.search}>
            <Link
              to={
                title && category && sort
                  ? `/explore/?title=${title}&cat=${category}&sort=${sort}`
                  : title && category
                  ? `/explore/?title=${title}&cat=${category}`
                  : title && sort
                  ? `/explore/?title=${title}&sort=${sort}`
                  : category && sort
                  ? `/explore/?cat=${category}&sort=${sort}`
                  : title
                  ? `/explore/?title=${title}`
                  : category
                  ? `/explore/?cat=${category}`
                  : sort
                  ? `/explore/?sort=${sort}`
                  : ``
              }
              className={classes.exploreSearchLink}
            >
              <li className={classes.searchButton}>SEARCH</li>
            </Link>
          </div>
        </div>
      </div>
      <Plans />
    </>
  );
}
