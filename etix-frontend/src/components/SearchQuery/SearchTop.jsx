import React from 'react'
import { Box ,Container, Grid, Typography, TextField, Button} from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import '../HomeQuery/fonts.css'

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: theme.spacing(3),
        paddingBottom: theme.spacing(6),
        paddingLeft: theme.spacing(3),
        paddingRight: theme.spacing(3),
    },
    searchInputPlace: {
        fontFamily: ['rubik', 'sans-serif'].join(','),
        color: '#F5CB5C',
        maxWidth: 200,
        maxHeight:45,
        marginRight: theme.spacing(3),
        
    },
    multilineColor:{
        backgroundColor: 'white',
        color: 'black',
    },
    multilineColor1:{
        color: '#F5CB5C',
        backgroundColor: 'black',
        marginTop: 15,
        borderRadius: 10,
        paddingLeft: 15
    },
    searchButton:{
        maxHeight: 33,
        marginTop: 15
    }
}));

export const SearchTop = () =>{
    const classes = useStyles();
    return (
        <Box className={classes.root} >
            <Grid container spacing={3} justify="center" direction="column">
                <Grid item xs={12}  container>
                    <Grid item xs={12} sm={3} >
                        <TextField
                                varient="outlined"
                                type="text"
                                value="KL"
                                label="From"
                                InputProps={{
                                    className: classes.multilineColor1
                                }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                        <TextField
                                varient="outlined"
                                type="text"
                                value="KL"
                                label="To"
                                InputProps={{
                                    className: classes.multilineColor1
                                }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} container>
                        <Grid item xs={12} sm={10}>
                            <TextField
                                    varient="outlined"
                                    type="date"
                                    label="Departure"
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    InputLabelProps={{ shrink: true, required: true }}
                            />
                            <TextField
                                    varient="outlined"
                                    type="date"
                                    label="Arrival" 
                                    InputProps={{
                                        className: classes.multilineColor
                                    }}
                                    style={{marginRight:10}}
                                    InputLabelProps={{ shrink: true, required: false }}/>
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <Button variant="contained" className={classes.searchButton} startIcon={<SearchIcon />}>Search</Button>
                        </Grid>
                    </Grid>
                    
                   
                </Grid>
                
            </Grid>            
        </Box>
    )
}