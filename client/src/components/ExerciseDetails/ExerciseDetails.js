import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

import bodyPartImg from "../../images/body-part.png";
import equipmentImg from "../../images/equipment.png";
import targetImg from "../../images/target.png";

export default function ExerciseDetails() {
  const { id } = useParams();

  return (
    <>
      <Navbar />
    </>
  );
}
