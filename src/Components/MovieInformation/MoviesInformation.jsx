import { Toolbar } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

const Movie = () => {
  const id = useParams(); 
  return (
     <> 
     {/* MUI Toolbar Bug - Empty toolbar to start rendering after toolbar */}
      <Toolbar/>
      <div>${`This is the Movie Information Page ${id}`}</div>
     </>
  )};

export default Movie;
