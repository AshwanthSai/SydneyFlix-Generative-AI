import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
    centerScreen: {
      position: "absolute",
      top: "50%",
      left: "55%",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    parentdiv: {
      display: "flex",
      flexDirection: "column",
      flexGrow: 1,
      padding: "2em",
      width: '85vw', // Ensure the parent div takes full width
     /*  width: 100vw; */
     /*  height: 100vh; */
      maxWidth:"100%"  /* added */
    },
    childElement: {
      flexGrow: 1, // Allow child to grow
      width: '100%', // Ensure child takes full width of parent
      // Add other styles as needed
    }

}));