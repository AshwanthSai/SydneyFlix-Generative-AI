import { makeStyles } from "@mui/styles";

export default makeStyles((theme) => ({
    // Total Container 
    featuredCardContainer: {
        marginTop: "35px",
        marginBottom: '20px',
        display: 'flex',
        justifyContent: 'center',
        height: '490px',
        textDecoration: 'none',
      },
      // Sub Container within Card 
      card: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'column',
      },
      // Primary Position
      cardRoot: {
        position: 'relative',
      },
      //* Add an outer div to the image
      cardMedia: {
        position: 'absolute',
        top: 0,
        right: 0,
        height: '100%',
        width: '100%',
        //*Add an opaque background color
        backgroundColor: 'rgba(0,0,0,0.575)', 
        //*The darken mode will darken the colors 
        //* of the background image where the background color is applied.
        backgroundBlendMode: 'darken',
      },
      cardContent: {
        color: '#fff', // White
        width: '40%', // 40% Width of Featured Container
        [theme.breakpoints.down('sm')]: {
          width: '100%',// Small screen, increase width to 100%.
        },
      },
      cardContentRoot: {
        position: 'relative',
        backgroundColor: 'transparent',
      },
}))

