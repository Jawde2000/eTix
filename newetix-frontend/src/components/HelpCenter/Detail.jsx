import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Paper, IconButton } from '@mui/material';
import HelpIcon from '@mui/icons-material/Help';
import {useHistory, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import { helpdeskList} from '../../state/actions/actions';
import VisibilityIcon from '@mui/icons-material/Visibility';

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
    },
    ole: {
        backgroundColor: 'rgba(245, 203, 92, 0.75)',
        color: 'black',
        padding: '5px',
        borderRadius: '25px'
    },
    datagrid: {
        marginBottom: '100px',
    },
    disabledInput: {
        "& .MuiInputBase-root.Mui-disabled": {
          color: "black"
        }
    }
}));

let row = []
  
const Messaging = ({props}) => {
    let history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch();

    const { id } = useParams();
    
    const hlist = useSelector(state => state.helpdeskList)
    const vlist = useSelector(state => state.vendorList)
    const hrlist = useSelector(state => state.helpResponseList)

    const {helpList} = hlist
    const {vendorInfo} = vlist
    const {responseList} = hrlist

    const [status, setStatus] = useState('');
    const [receiver, setReceiver] = useState('');
    const [subject, setSubject] = useState('');
    const [body, setBody] = useState('');
    const [response, setResponse] = useState('')

    useEffect(() => {
        console.log(responseList)
        
        if (helpList){
            for (let i in helpList){
                if (helpList[i].helpdeskID == id) {
                    row = helpList[i]
                } 
            }
            setStatus(row.helpdeskStatus)
            setReceiver(row.receiver)
            setSubject(row.helpdeskTitle)
            setBody(row.helpdeskMessage)
        }


        if(responseList){
            setResponse(responseList.helpResponseMessage)
        }
    });

    const getVendorName = (vendorID) => {
        for (let key in vendorInfo){
            if (vendorInfo[key].vendorID == vendorID) {
                return vendorInfo[key].vendorName
            }
        }
        return 'null'
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
                    <Grid container direction="column" direction="column" justifyContent="center" alignItems="center" spacing={4} className={classes.ole}>
                        <Grid item>
                            <Typography variant="h3">Messaging System</Typography>
                        </Grid>
                        <Grid item>
                        </Grid>
                        <Grid item>
                            <Grid container direction="column" justifyContent="flex-start" spacing={2}>
                                <Grid item>
                                    <Grid container direction="row" spacing={2} sx={{fontSize: '20px'}}>
                                        <Grid item>
                                            Message ID:
                                        </Grid>
                                        <Grid item>
                                            {id}
                                        </Grid>
                                    </Grid>  
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" spacing={2} sx={{fontSize: '20px'}}>
                                        <Grid item>
                                            Status:
                                        </Grid>
                                        <Grid item>
                                            {status}
                                        </Grid>
                                    </Grid>  
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" spacing={2} sx={{fontSize: '20px'}}>
                                        <Grid item>
                                            Receiver:
                                        </Grid>
                                        <Grid item>
                                            {receiver ? getVendorName(receiver) : 'eTix'}
                                        </Grid>
                                    </Grid>  
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" spacing={2} sx={{fontSize: '20px'}}>
                                        <Grid item>
                                            Subject:
                                        </Grid>
                                        <Grid item>
                                            {subject}
                                        </Grid>
                                    </Grid>  
                                </Grid>
                                <Grid item>
                                    <Grid container direction="row" spacing={2} sx={{fontSize: '20px'}}>
                                        <Grid item>
                                            Body:
                                        </Grid>
                                        <Grid item>
                                            {body}
                                        </Grid>
                                    </Grid>  
                                </Grid>
                                {response ? <Grid item>
                                    <Grid container direction="row" spacing={2} sx={{fontSize: '20px' , backgroundColor: 'white', paddingBottom: '25px', marginTop: '5px', marginRight: '10px', borderRadius: '25px'}}>
                                        <Grid item>
                                            Response:
                                        </Grid>
                                        <Grid item>
                                            {response}
                                        </Grid>
                                    </Grid>  
                                </Grid> : ''}
                            </Grid>    
                        </Grid>
                        <Grid item>
                            <Button variant="contained" onClick={() => {history.push('/help')}}>Back</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
}

export default Messaging
