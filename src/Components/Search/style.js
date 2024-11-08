import { ThemeContext } from "@emotion/react";
import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    searchContainer :{
        /* Apply this style when on Mobile Device */
        [theme.breakpoints.down("sm")] : {
            display: "flex",
            justifyContent: "center",
            width : "100%"
        }
    },
    input : {
        /* If light mode, then text black */
        color: theme.palette.mode === "light" && "black",
        filter: theme.palette.mode === "light" && "invert(1)",
        [theme.breakpoints.down("sm")] : {
            marginTop : "-10px",
            marginBottom: "20px",
        }
    }
}));