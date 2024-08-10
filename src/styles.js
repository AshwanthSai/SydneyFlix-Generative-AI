import React from "react";
import { makeStyles } from "@mui/styles";
import { red } from "@mui/material/colors";

/* App Level Style */
export default makeStyles(() => ({
    root: {
        display : "flex",
        height: "100%",
    }, 
    toolbar: {
        height : "70px"
    },
    content : {
        flexGrow : 1, 
        padding : "2em"
    }
}))

