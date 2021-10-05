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
    par: {
        width: '300px',
        textAlign: 'center'
    }
}));

function Retrieval() {
    const classes = useStyles();
    return (
        <Box className={classes.whole}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.inside}>
                <Grid item>
                    <Typography variant="h4">forgot password?</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={10}>
                        <Grid item>
                            <TextField label="Username" variant="filled"/>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item className={classes.par}>
                    <Typography variant="h6">You will receive an email containing a link to reset your password</Typography>
                </Grid>
                <Grid item>
                    <Button variant="contained">Submit</Button>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Retrieval
