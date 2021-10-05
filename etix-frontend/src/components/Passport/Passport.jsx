import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core'


const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url("https://cdn.discordapp.com/attachments/885034816087683072/885035160016396329/20140625233054-09abeddb-me.jpg")`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
      backgroundBlendMode: "lighten",
      fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    inside: {
      paddingTop: '5%',
      paddingBottom: '5%'
    },
    border: {
        borderLeft: '5px solid black',
        position: 'absolute',
        left: '50%',
        marginTop: '30px',
        marginLeft: '15px',
        marginRight: '30px',
        height: '300px'
    },
    login: {
        paddingRight: '5%',
        marginRight: '15%'
    },
    register: {
        paddingLeft: '5%',
        marginLeft: '15%'
    },
    space: {
        width: '25px'
    }
}));

function Passport() {
    const classes = useStyles();
    return (
        <Box className={classes.whole}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.inside}>
                <Grid item>
                    <Typography variant="h4">welcome, or welcome back!</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={10}>
                        <Grid item>
                            <Grid container direction="column" spacing={2} className={classes.login}>
                                <Grid item>
                                    <TextField label="Email" variant="filled"/>
                                </Grid>
                                <Grid item>
                                    <TextField label="Password" variant="filled"/>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained">Login</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="filled">Forgot your password?</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={classes.space}></Grid>
                        <Grid item className={classes.space}></Grid>
                        <Grid item className={classes.border}></Grid>
                        <Grid item className={classes.space}></Grid>
                        <Grid item className={classes.space}></Grid>
                        <Grid item>
                            <Grid container direction="column" spacing={2} className={classes.register}>
                                <Grid item>
                                    <TextField label="Email" variant="filled"/>
                                </Grid>
                                <Grid item>
                                    <TextField label="Password" variant="filled"/>
                                </Grid>
                                <Grid item>
                                    <TextField label="Username" variant="filled"/>
                                </Grid>
                                <Grid item>
                                    <TextField label="Phone Number" variant="filled"/>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained">Login</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Passport
