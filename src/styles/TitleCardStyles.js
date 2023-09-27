import { makeStyles } from '@mui/styles/';

export const titleCardStyles = makeStyles( (theme) => ({
    //Home page
    home: {
        width: '100%',
        height: '100%',
        position: 'relative',
        alignItems: 'center',
        left: '50%',
        marginRight: '-50%',
        transform: 'translate(-50%, 0%)',
        '& video': {
        objectFit: 'cover',
        },
        zIndex: "-100",

        [theme.breakpoints.up("xs")]:{
        },
        [theme.breakpoints.up('sm')]: {
        },
        [theme.breakpoints.up('md')]: {
        },
        [theme.breakpoints.up('lg')]: {
        },
        [theme.breakpoints.up('xl')]: {
        },
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
}));