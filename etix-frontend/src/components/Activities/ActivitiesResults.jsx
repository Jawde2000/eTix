import React, {useState, useEffect} from 'react'
import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
    SearchResult: {
        minHeight: 100,
        margin: 20,
        backgroundColor: 'grey', 
        maxHeight: 140,
    }
}));

const ActivitiesResults = ({posts, loading}) => {
    if(loading){
        return <h2>Loading....</h2>;
    }
    
    const classes = useStyles();

    return (
        <Grid item xs={12} style={{marginLeft: 50, marginRight:10}} container>
            {posts.map(post =>(
                <Grid item xs={12} className={classes.SearchResult}>
                    {post.title}
                </Grid>
            ))}
        </Grid>
    )
}

export default ActivitiesResults