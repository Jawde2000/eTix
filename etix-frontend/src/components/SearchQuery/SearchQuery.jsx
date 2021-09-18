import React, {useState, useEffect} from 'react'
import { Box ,Container, Grid, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import bgImg from '../cities/tokyo.jpg'
import '../HomeQuery/fonts.css'
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import SearchResult from './SearchResult'
import { Pagination } from './Pagination'
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
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);

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
        <Box className={classes.root}>
            <SearchTop />
            <Grid container spacing={3} justify="center" direction="column">
                <Grid item xs={12} className={classes.sortByDate} container>
                    <Grid item xs={1} sm={1}>
                        <NavigateBeforeIcon style={{fontSize:100, }}/>
                    </Grid>
                    <Grid item xs={10} sm={10} style={{backgroundColor:'grey'}} container>
                        {/* Write the little box here */}
                    </Grid>
                    <Grid item xs={1} sm={1}>
                        <NavigateNextIcon style={{fontSize:100, }}/>
                    </Grid>
                </Grid>
                <Grid item xs={12} container>
                    <Grid item xs={3} container>
                            <Grid item xs={12} style={{backgroundColor: 'grey', minHeight:200, maxHeight:200, minWidth:200, margin: 50, marginBottom:10}} >
                                helo
                            </Grid>
                            <Grid item xs={12} style={{backgroundColor: 'grey', minHeight:400, maxHeight:200, minWidth:200, margin: 50, marginTop:10}} >
                                helo
                            </Grid>
                    </Grid>
                    
                    <Grid item xs={9} container >
                        <SearchResult posts={currentPosts} loading={loading}/>
                        <Grid item xs={12}>
                            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate}/>  
                        </Grid>              
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}


