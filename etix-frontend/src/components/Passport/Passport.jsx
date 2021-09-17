import React from 'react'
import { makeStyles } from '@material-ui/styles';
import { Link, Container, Grid, Box, Typography } from '@material-ui/core'

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
    }
  }));

function Passport() {
    const classes = useStyles();
    return (
        <Box className={classes.whole}>
            <Grid container direction="column" justifyContent="center" alignItems="center" spacing={2} className={classes.inside}>
                <Grid item>
                    <Typography variant="h4">welcome, or welcome back!</Typography>
                </Grid>
                <Grid item>
                    <Grid container direction="row" spacing={8}>
                        
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Passport
