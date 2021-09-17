import React from 'react'
import { Box ,Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import bgImg from '../cities/tokyo.jpg'
import '../HomeQuery/fonts.css'
import { SearchTop } from './SearchTop'

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${bgImg})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        minHeight: 500
    },
}));

export const SearchQuery = () =>{
    const classes = useStyles();
    return (
        <Box className={classes.root}>
            <SearchTop />
            
        </Box>
    )
}


