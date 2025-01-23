import { useMediaQuery } from '@mui/material';
import { makeStyles } from '@mui/styles';



export default makeStyles((theme) => ({
  /* 
    These numbers here have come up after experimentation, 
    Not patter matched.
  */
  containerSpaceAround: {
    display: 'flex',
    justifyContent: 'space-around',
    margin: '10px 0 !important',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      flexWrap: 'wrap',
    },
  },
  poster: {
    /* 
       It's often used with images, containers, or
       text blocks to ensure that they don’t stretch too wide on larger screens.
    */
    maxWidth: '90%',
    borderRadius: '20px',
    objectFit: 'cover',
    boxShadow: '0.5em 0.5em 1em',
    width: '80%',
    [theme.breakpoints.down('md')]: {
      margin: '0 auto !important',
      width: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      margin: '0 auto !important',
      width: '100%',
      height: '350px',
      marginBottom: '30px',
    },
  },
  genresContainer: {
    margin: '10px 0 !important',
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
  },
  genreImage: {
    filter: theme.palette.mode === 'dark' && 'invert(1)',
    marginRight: '10px',
  },
  links: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textDecoration: 'none',
    [theme.breakpoints.down('sm')]: {
      padding: '0.5rem 1rem',
    },
  },
  castImage: {
    width: '100%',
    maxWidth: '7em',
    height: '8em',
    /* So the image is in the correct proportions */
    objectFit: 'cover',
    borderRadius: '10px',
  },
  buttonsContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    flexShrink: 1,
    flexWrap : "wrap",
    [theme.breakpoints.down('xl')]: {
      flexDirection: "column",
      justifyContent: 'center',
    }
  },
  modal: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: '50%',
    height: '50%',
    [theme.breakpoints.down('sm')]: {
      width: '90%',
      height: '90%',
    },
  },
  centerScreen: {
    position: "absolute",
    top: "50%",
    left: "55%",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
}));