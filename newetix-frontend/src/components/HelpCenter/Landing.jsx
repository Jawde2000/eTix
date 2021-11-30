import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Toolbar } from '@mui/material'
import HelpIcon from '@mui/icons-material/Help';
import ComposeForm from './ComposeForm'
import images from '../globalAssets/scripts/bgchange';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { vendorList } from '../../state/actions/actions'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${images()})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
      backgroundBlendMode: "lighten",
      fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    inside: {
      paddingTop: '2.5%',
      paddingBottom: '2.5%'
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

function Landing() {
    const classes = useStyles();

    const userLogin = useSelector(state => state.userLogin)
    const {error,  userInfo} = userLogin
    const [openHelpC, setHelpC] = useState(false);

    const dispatch = useDispatch()
    
    let history = useHistory()

    useEffect(() => {
        if(userInfo == null) {
            setHelpC(true);
        }
        dispatch(vendorList())
    },[userInfo])

    const DialogHelpCannot = () => {
        const handleClose = () => {
          setHelpC(false);
          history.push('/');
        };
  
        return (
          <Toolbar>
            <Dialog
              open={openHelpC}
              onClose={handleClose}
            >
              <DialogTitle id="alert-dialog-title">
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  <Typography>Please sign in to view Help Center</Typography>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} autoFocus style={{color: 'red'}}>
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </Toolbar>
        );
    }

    
    return (
        <Box className={classes.whole}>
            <Grid container direction="row" justifyContent="flex-start" alignItems="flex-start" className={classes.inside}>
                <Grid item xs={3}>
                    <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={1}>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={2}>
                                <Grid item>
                                    <HelpIcon fontSize='large' sx={{fontSize: '75px'}}></HelpIcon>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4">Help Center</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item className={`${classes.sect} ${classes.articles}`}>
                            <Grid container direction="column" justifyContent="flex-start" alignItems="center" spacing={6}>
                                <Grid item>
                                </Grid>
                                <Grid item>
                                    <Typography variant="h4" style={{cursor: 'pointer'}}  onClick={(() => {history.push('/help/articles')})}>Articles</Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={8}>
                    <ComposeForm />
                </Grid>
                {
                openHelpC?<DialogHelpCannot />:null
                }
            </Grid>
        </Box>
    );
}

export default Landing
