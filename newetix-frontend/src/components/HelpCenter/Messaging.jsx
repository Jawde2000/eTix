import React, {useState, useEffect} from 'react'
import { makeStyles } from '@mui/styles';
import { Grid, Box, Typography, Link, Button, Paper, Tooltip, IconButton } from '@mui/material';
import { Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import TableCell, { tableCellClasses  } from '@mui/material/TableCell';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import HelpIcon from '@mui/icons-material/Help';
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import VisibilityIcon from '@mui/icons-material/Visibility';
import { vendorList, helpdeskList, helpResponseList } from '../../state/actions/actions';

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
        marginBottom: '75px',
    }
}));
  
function Messaging() {
    let history = useHistory()
    const classes = useStyles();
    const dispatch = useDispatch();
    const hlist = useSelector(state => state.helpdeskList)
    const vlist = useSelector(state => state.vendorList)
    const uinfo = useSelector(state => state.userLogin)
    const {helpList} = hlist
    const {vendorInfo} = vlist
    const {userInfo} = uinfo

    const [rows, setRows] = useState([]);
    const ids = []

    const getVendorName = (vendorID) => {
        for (let key in vendorInfo){
            if (vendorInfo[key].vendorID == vendorID) {
                return vendorInfo[key].vendorName
            }
        }
        return 'null'
    }

    useEffect(() => {
        if (!userInfo) {
            history.push('/')
        } else {
            dispatch(helpdeskList())
            dispatch(vendorList())
        }
    }, [dispatch]);

    useEffect(() => {
        if (helpList) {
            setRows(helpList)
        }
    }, [hlist])

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
                    <Grid container direction="column" direction="column" alignItems="center" spacing={4} className={classes.ole}>
                        <Grid item>
                            <Typography variant="h3">Messaging System</Typography>
                        </Grid>
                        <Grid item>
                        </Grid>
                        <Grid item>
                            <Grid container direction="row" justifyContent="flex-start" alignItems="center" spacing={4}>
                                <Grid item sx={{ width: '98%', overflow: 'hidden' }}>
                                    <TableContainer sx={{ maxHeight: 500 }} component={Paper} className={classes.datagrid}>
                                        <Table stickyHeader aria-label="customized table">
                                            <TableHead>
                                            <TableRow>
                                                <TableCell>ID</TableCell>
                                                <TableCell>Receiver</TableCell>
                                                <TableCell>Subject</TableCell>
                                                <TableCell>Body</TableCell>
                                                <TableCell>Status</TableCell>
                                                <TableCell></TableCell>
                                            </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {rows.map((rows) => (
                                                    <TableRow key={rows.helpdeskID}>
                                                        <TableCell>{rows.helpdeskID}</TableCell>
                                                        <TableCell>{rows.receiver ? getVendorName(rows.receiver) : 'eTix'}</TableCell>
                                                        <TableCell>{rows.helpdeskTitle}</TableCell>
                                                        <TableCell sx={{whiteSpace: 'normal', wordWrap: 'break-word'}}>{rows.helpdeskMessage}</TableCell>
                                                        <TableCell>{rows.helpdeskStatus}</TableCell>
                                                        <TableCell>{rows.protein}</TableCell>
                                                        <TableCell><Tooltip title="View"><IconButton onClick={() => {dispatch(helpResponseList(`${rows.helpdeskID}`));history.push(`/help/message/${rows.helpdeskID}`)}}><VisibilityIcon style={{cursor: 'pointer'}} /></IconButton></Tooltip></TableCell>
                                                    </TableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
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
