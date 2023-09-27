import { makeStyles } from '@mui/styles/';

export const footerStyles = makeStyles( (theme) =>({
    footer : {
        backgroundColor: '#d4d4d4',
        minHeight: "30rem",

        [theme.breakpoints.up("xs")]:{
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "5rem",
            paddingRight: "5rem",
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "10rem",
            paddingRight: "10rem",
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "15rem",
            paddingRight: "15rem",
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "20rem",
            paddingRight: "20rem",
        },
        [theme.breakpoints.up('xl')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "30rem",
            paddingRight: "30rem",
        },

        transition: "all 0.5s ease-in-out",
    }
}));