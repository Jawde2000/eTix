import React, { Component, useState, useEffect} from 'react'
import {Box, makeStyles, Typography, Container, Grid, Button} from "@material-ui/core"
import dubai from '../cities/dubai.jpg'
import LocalActivityIcon from '@material-ui/icons/LocalActivity';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import ActivitiesResults from './ActivitiesResults';
import { ActivitiesPagination } from './ActivitiesPagination';

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundImage: 'url('+ dubai +')',
        backgroundRepeat: "no-repeat",
        position: "center",
        paddingBottom: 130,
        height: 900,
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    activities: {
        display: "flex",
        fontSize: 40,
        alignItems: "center",
        flexWrap: "wrap",
    },
    activitiesIcon: {
        display: "flex",
        fontSize: 40,
        alignItems: "center",
        flexWrap: "wrap",
    },
    iconComponent: {
        paddingTop: theme.spacing(10),
    },
    menulist: {
        padding: theme.spacing(2),
    },
    menufont: {
        fontSize: 30,
        fontFamily: ['rubik', 'sans-serif'].join(','),
        alignItems: "center",
        color: '#CFDBD5',
        fontWeight: "bold",
        '&:hover': {
            color: '#F5CB5C',
            fontWeight: "bold",
            cursor: "pointer",
        },
    },
    listContainer: {
        paddingTop: theme.spacing(5),
        paddingBottom: theme.spacing(5),
        backgroundColor: "black",
        opacity: 0.5,
    },
    activity: {
        backgroundColor: "black",
        opacity: 0.5,
        height: "100%"
    },
}));


function Activities() {
    const defaultStyle = useStyles();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(4);

    useEffect(() =>{
        const fetchPost = async () => {
            setLoading(true);
            const res = await fetch('https://jsonplaceholder.typicode.com/posts');
            const data = await res.json();
            setPosts(data);
            setLoading(false);
        }

        fetchPost();
    },[]);

    //get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    //change page
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            
            <Box className={defaultStyle.whole}>
                <Container>
                    <Grid container  className={defaultStyle.iconComponent} direction="column">
                    <Grid item xs={12} container>
                    <Grid item xs={3}>
                    <Typography className={defaultStyle.activities}>
                        <LocalActivityIcon className={defaultStyle.activitiesIcon}/>
                        Activities
                    </Typography>
                    </Grid>
                            
                    </Grid>
                    <Grid item xs={12} container>
                    <Grid item xs={3} container>
                    <Box className={defaultStyle.listContainer}>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                       <Grid item xs={12}>
                            <Typography className={defaultStyle.menufont}>
                            ALL
                            </Typography>
                            </Grid>
                    </Grid>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                    <Grid item xs={12}>
                        <Typography className={defaultStyle.menufont}>
                            TO PAY
                            </Typography>
                            </Grid>
                    </Grid>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                    <Grid item xs={12}>
                        <Typography className={defaultStyle.menufont}>
                            TO BOARD
                            </Typography>
                            </Grid>
                    </Grid>
                    <Grid item xs={3} className={defaultStyle.menulist}>
                    <Grid item xs={12}>
                        <Typography className={defaultStyle.menufont}>
                            COMPLETED
                        </Typography>
                        </Grid>
                    </Grid>
                    </Box> 
                    </Grid>
                    
                       
                    <Grid item xs={9} container>                
                        <ActivitiesResults posts={currentPosts} loading={loading}/>
                        <Grid item xs={12}>
                            <ActivitiesPagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>  
                        </Grid>     
                    </Grid>    
                        

                    </Grid> 
                    </Grid>
                </Container>
            </Box>
            
        </div>
    );
}

export default Activities;