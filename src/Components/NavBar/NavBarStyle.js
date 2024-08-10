import { ThemeContext } from "@emotion/react";
import { makeStyles } from "@mui/styles";

const drawerWidth = 240;

export default makeStyles((theme) => ({
    /* Tool Bar - Nav Bar */
    toolbar: {
        height: "80px",
        display: "flex",
        justifyContent: "space-between",
        marginLeft: "240px",
        /*
            Apply these styles to 
            screen sizes smaller than
         */
        [theme.breakpoints.down("sm")]: {
            marginLeft: "0",
            flexWrap: "wrap"
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        /*
            Apply styles 
            equal to or greater than sm size
        */
        [theme.breakpoints.up("sm")]: {
            display: "none"
        },
    },
    drawer: {
            //Apply style greater than SM 
            [theme.breakpoints.up("sm")] : {
                width: drawerWidth,
                flexShrink : 0,
            }
    },
    drawerPaper: {
        /* 240px */
        width : drawerWidth,
    },
    linkButton : {
        /* Classes to apply on Hover */
        '&:hover' : {
            color : "white !important",
            textDecoration : "none",
        },
    },
}));