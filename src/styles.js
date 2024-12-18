import { makeStyles } from "@mui/styles";

/* 
    1. App Level Style 
    2. Calling makeStyles returns an object with CSS.
    3. Notice, numbers are mentioned as Strings.
*/

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
        padding : "2em",
        width:"100%"
    },
    centerScreen: {
      position: "absolute",
      top: "50%",
      left: "55%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    }
}))

