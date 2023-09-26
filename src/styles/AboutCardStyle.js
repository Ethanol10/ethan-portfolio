import { makeStyles } from '@mui/styles';

export const aboutCardStyles = makeStyles( (theme) =>({
    //Profile
    about:{
        [theme.breakpoints.up("xs")]:{
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "2rem",
            paddingRight: "2rem",
            minHeight: "50rem",
        },
        [theme.breakpoints.up('sm')]: {
            paddingTop: "5rem",
            paddingBottom: "5rem",
            paddingLeft: "10rem",
            paddingRight: "10rem",
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
        float: "left",
        maxWidth: "20rem",
        objectFit: "cover",
        marginRight: "2rem",
        marginBottom: "1.5rem",
    },
}));