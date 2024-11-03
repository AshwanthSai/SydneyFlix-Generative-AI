import { makeStyles } from "@mui/styles";

/* Theme = Base styles that MUI Offers */
export default makeStyles((theme) => ({
    movie : {
        padding: "10px",
    },
    links: {
        alignItems: "center",
        fontWeight : "bolder",
        textDecoration: "none",
        /* 
            On Screen Sizes, Larger than XS 
            Stack Vertically.
        */
        [theme.breakpoints.up("xs")] : {
            display : "flex",
            flexDirection: "column"
        },
        "&:hover": {
            cursor: "pointer",
        }
    },
    image: {
        borderRadius: "20px",
        height: "300px",
        marginTop: "10px",
        "&:hover": {
            transform: "scale(1.10)",
            transition: "transform 0.4s ease-in-out"
        }
    },
    title: {
        color: theme.palette.text.primary,
        /* For ... large sentences */
        textOverflow: "ellipsis",
        /* Size of each card title length */
        width: "230px",
        /* Combine White Space Sequences into single space */
        whiteSpace: "nowrap",
        /* Do not show overflow */
        overflow: "hidden",
        marginTop: "10px",
        marginBottom: "0",
        textAlign: "center",
    }
}));