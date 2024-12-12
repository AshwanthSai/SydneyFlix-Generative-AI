import { makeStyles } from "@mui/styles";

/* App Level Style */
export default makeStyles((theme) => ({
    imageLink: {
        display: 'flex',
        justifyContent: 'center',
        padding: '10% 0',
      },
      image: {
        height:"100%",
        width: '100%',
        padding : "0"
      },
    genreImages : {
      filter : theme.palette.mode === "dark" && "invert(1)"
    }     
}))

