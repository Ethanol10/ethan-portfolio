import { makeStyles } from '@mui/styles/';

export const navigationBarStyles = makeStyles((theme) => ({
    list: {
      width: 250,
    },
    fullList: {
      width: 'auto',
    },
    button: {
      zIndex: "10",
      filter: "invert(100%)",
    },
    nav: {
      position: "fixed",
      top: "2rem",
      left: "2rem"
    }
  }));
  