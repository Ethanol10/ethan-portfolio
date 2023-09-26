import { makeStyles } from '@mui/styles/';

export const footerStyles = makeStyles( (theme) =>({
    footer : {
        backgroundColor: '#d4d4d4',
        minHeight: "30rem",

        [theme.breakpoints.up("xs")]:{
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "10rem",
            paddingRight: "10rem",
        },

        transition: "all 0.5s ease-in-out",
    }
}));