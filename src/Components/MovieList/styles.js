import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
   moviesContainer : {
    display : "flex",
    flexWrap : "wrap",
    justifyContent : "space-between",
    overflow : "auto",
   /* For Smaller Screen */
    [theme.breakpoints.down("sm")]: {
        justifyContent : "center",
    },
    },
}));