import { makeStyles } from '@mui/styles/';

export const navigationBarStyles = makeStyles((theme) => ({
    list: {
      width: 250,
      
    },
    listitem:{
      '&:hover': {
        background: "#ABDEFF",
        borderRadius: "5%",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
      }
    },
    fullList: {
      width: 'auto',
    },
    button: {
      zIndex: "10",
      filter: "invert(100%)",
      '&:hover': {
        background: "#FFFFFF",
        borderRadius: "25%",
        cursor: "pointer",
        transition: "all 0.2s ease-in-out",
        filter: "invert(0%)",
      }
    },
    nav: {
      position: "fixed",
      top: "2rem",
      left: "2rem"
    }
  }));
  