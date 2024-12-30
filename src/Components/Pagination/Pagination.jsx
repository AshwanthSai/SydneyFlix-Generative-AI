import React from "react";
import useStyles from "./style"
import { Button, ButtonGroup, Typography } from "@mui/material";

const Pagination = ({currentPage, setPage, totalPages}) => {
  const classes = useStyles();
  // If last page, do not go forward
  const pageIncrease = () => {
    if(currentPage !== totalPages) {
      setPage(prevousState => prevousState + 1)
    }
  }

  // If 1st page, do not go backward
  const pageDecrease = () => {
    if(currentPage !== 1) {
      setPage(prevousState => prevousState - 1)
    }
  }

  //If single page then, do not render pagination component.
  if(totalPages === 0) {
    return null; 
  }

  return(
    <>
      <div data-testid= "pagination" className = {classes.container}>
        <Button type="button" color = "primary" variant="contained" onClick = {pageDecrease} className={classes.button} >PREV</Button>
          <Typography className = {classes.pageNumber} variant = "h4">
            {' '} {currentPage} {' '} 
          </Typography>
        <Button type="button" color = "primary" onClick = {pageIncrease} className={classes.button} variant="contained" >NEXT</Button>
      </div>
    </>
  )
};

export default Pagination;
