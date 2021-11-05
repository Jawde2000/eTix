import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Grid, Box, Typography, TextField, Button } from '@material-ui/core'
import HelpIcon from '@mui/icons-material/Help';

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
    sect: {
        backgroundColor: 'rgba(31,40,51,0.75)',
        color: 'white'
    },
    articles: {
        width: '350px',
        height: '550px'
    },
    tf: {
        width: '550px'
    }
}));

function Retrieval() {
    const classes = useStyles();
    return (
        <Box className={classes.whole}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" spacing={4} className={classes.inside}>
                <Grid item xs>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={1}>
                                <Grid item>
                                    <HelpIcon fontSize='large' sx={{fontSize: '75px'}}></HelpIcon>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4">Help Center</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={`${classes.sect} ${classes.articles}`}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                                <Grid item>
                                    <Typography variant="h4">Articles</Typography>
                                </Grid>
                                <Grid item>
                                    <Button variant="filled">How to purchase?</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="filled">How to use eTix?</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="filled">Card payments</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="filled">Crypto payments</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="filled">Digital tickets</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={`${classes.sect} ${classes.mainwin}`} xs={9}>
                    <Grid container direction="column" direction="column" justifyContent="center" alignItems="center" spacing={4}>
                        <Grid item>
                            <Typography variant="h3">Messaging System</Typography>
                        </Grid>
                        <Grid item>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                                <Grid item>
                                    <Typography variant="h5">Reciever:</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField className={classes.tf} label="Reciever" variant="filled"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                                <Grid item>
                                    <Typography variant="h5">Subject:</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField className={classes.tf} label="Subject" variant="filled"/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                                <Grid item>
                                    <Typography variant="h5">Body:</Typography>
                                </Grid>
                                <Grid item>
                                    <TextField className={classes.tf} label="Body" variant="filled" rows={10} multiline/>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={4}>
                                <Grid item>
                                    <Button variant="contained">Submit</Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="contained">Inbox</Button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Retrieval
