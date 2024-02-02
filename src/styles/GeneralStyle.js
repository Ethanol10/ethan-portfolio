import { makeStyles } from '@mui/styles/';

export const generalStyles = makeStyles( (theme) =>({
    generalFormatting : {
        minHeight: "30rem",

        [theme.breakpoints.up("xs")]:{
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "4rem",
            paddingRight: "4rem",
            minHeight: "50rem",
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "10rem",
            paddingRight: "10rem",
            minHeight: "50rem",
        },
        [theme.breakpoints.up('md')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "12rem",
            paddingRight: "12rem",
            minHeight: "50rem",
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "15rem",
            paddingRight: "15rem",
            minHeight: "50rem",
        },
        [theme.breakpoints.up('xl')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "22rem",
            paddingRight: "22rem",
            minHeight: "50rem",
        },

        transition: "all 0.5s ease-in-out",
    }
}));