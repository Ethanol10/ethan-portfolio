import { makeStyles } from '@mui/styles';

export const aboutCardStyles = makeStyles( (theme) =>({
    //Profile
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