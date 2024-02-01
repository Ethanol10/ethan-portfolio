import { makeStyles } from '@mui/styles';

export const aboutCardStyles = makeStyles( (theme) =>({
    //Profile
    about:{
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
            paddingLeft: "15rem",
            paddingRight: "15rem",
            minHeight: "50rem",
        },
        [theme.breakpoints.up('lg')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "20rem",
            paddingRight: "20rem",
            minHeight: "50rem",
        },
        [theme.breakpoints.up('xl')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "30rem",
            paddingRight: "30rem",
            minHeight: "50rem",
        },

        transition: "all 0.5s ease-in-out",
    },
    title:{
        display:"flex",
        marginTop: "2rem",
        marginBottom: "2rem",
    },
    widthTextClamp:{
        maxWidth: "100rem",
        whiteSpace: "break-spaces"
    },
    profile_img:
    {
        width: "100%",
        height: "100%",
        maxHeight: "30rem",
        maxWidth: "20rem",
        objectFit: "cover",
        float:"left",
        marginRight: "2rem",
        marginBottom: "1.5rem",

        [theme.breakpoints.up("xs")]: {    
            marginRight: "auto",
            marginLeft: "auto",    
        },
        [theme.breakpoints.up("sm")]: {       
            marginRight: "auto", 
            marginLeft: "auto",
        },
        [theme.breakpoints.up("md")]: {
            marginRight: "2rem",
            marginLeft: "auto",
        }
    },
    profile: 
    {
        [theme.breakpoints.up("xs")]: {        
            display: "grid",
        },
        [theme.breakpoints.up("sm")]: {        
            display: "grid",
        },
        [theme.breakpoints.up("md")]: {
            display: "block",
        }
    }
}));