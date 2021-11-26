import React, {useState, useEffect} from 'react'
import { makeStyles, styled } from '@mui/styles';
import { Grid, Box, Typography, TextField, Button, Paper, Stack, Pagination, CircularProgress } from '@mui/material'
import { TableCell, TableContainer, TableHead, TableRow, Avatar, Tooltip, IconButton } from '@mui/material'
import {useHistory} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux'
import QrCode2Icon from '@mui/icons-material/QrCode2';
import { getTickets, getAllRoutes } from '../../state/actions/actions';
import StoreIcon from '@mui/icons-material/Store';

const useStyles = makeStyles((theme) => ({
    whole: {
        backgroundColor: 'rgba(31,40,51,0.75)',
        color: 'black',
        borderRadius: '5px',
        width: '95%'
    },
    customTable: {
        "& .MuiTableCell-sizeSmall": {
          padding: "6px 8px 6px 16px" // <-- arbitrary value
        }
    },
}));

const TicketActivities = ({ status }) => {
    console.log(status)
    const classes = useStyles();
    let history = useHistory()

    const userLogin = useSelector(state => state.userLogin)
    const ticketList = useSelector(state => state.getTickets)
    const {userInfo} = userLogin
    const {ticketData} = ticketList

    const [listofTickets, setListofTickets] = useState([])
    const [loadStatus, setLoadStatus] = useState(true)

    let hasTickets = false
    let reallyhasTickets = false


    useEffect(() => {
        if(!userLogin) {
            history.push('/')
        }
    })

    useEffect(() => {
        if (ticketData){
            setListofTickets(ticketData.tickets)
            setLoadStatus(false)
        }
    }, [ticketList])

    let routeIndex = 0
    let fromIndex = 0
    let toIndex = 0
    let vendorIndex = 0

    const getTime = (time) => {
        if(userInfo){
            var timeString = time; // input string
            var arr = timeString.split(":"); // splitting the string by colon
            var suffix = arr[0] >= 12 ? " PM":" AM";
            var t = arr[0] + ":" + arr[1] + suffix;
            return t;
        }
    }

    const handleRender = (item) => {
        if (!loadStatus){
            for (var i in ticketData.routes){
                if (ticketData.routes[i].serviceID == item.service) {
                    routeIndex = i
                }
            }
    
            for (var k in ticketData.locations) {
                if (ticketData.locations[k].locationID == ticketData.routes[routeIndex].locationFrom){
                    fromIndex = k
                } 
                
                if (ticketData.locations[k].locationID == ticketData.routes[routeIndex].locationTo) {
                    toIndex = k
                }
            }

            for (var l in ticketData.vendorD) {
                if (ticketData.vendorD[l].vendorID == item.vendor) {
                    vendorIndex = l
                }
            }
        }
    }

    return (
            <Grid container direction="column" justifyContent="center" alignItems="center" >
                {
                        ticketData?
                        (
                            ticketData.tickets.map((item, index) => {
                                    handleRender(item)

                                    if (status == "all") {
                                        return (
                                            <div>
                                            <Grid item xs={12} container style={{background: 'white', marginTop: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                                                <TableContainer component={Paper}>
                                                    <TableHead className={classes.customTable}>
                                                        <TableRow>
                                                            <TableCell>
                                                                <Typography style={{fontSize: 16, display: 'flex'}}>
                                                                    <StoreIcon />{ticketData.vendorD[vendorIndex].vendorName}
                                                                </Typography>
                                                            </TableCell>
                                                            <TableCell width='65%'></TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                </TableContainer>
                                            </Grid>
                                            <Grid item xs={12} container style={{background: 'white', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                                                <Grid item xs={3}>
                                                    <Avatar variant="square"
                                                    src={`https://etixbucket.s3.amazonaws.com/etix/${item.vendor}.png`}
                                                    alt={`serviceLogo${item.vendor}`}
                                                    style={{margin: 5, height: 125, width:'95%', marginRight: '25px'}}
                                                    >
                                                    </Avatar>
                                                </Grid>
                                                <Grid item xs={7} container style={{color: 'black', fontFamily: ['rubik', 'sans-serif'].join(','), padding: 10}}>
                                                    <Grid item xs={12} >
                                                        <Typography style={{fontSize: 20}}>
                                                            {`${ticketData.routes[routeIndex].serviceName}`}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} >
                                                        <Typography style={{fontSize: 20}}>
                                                            {`${ticketData.locations[fromIndex].locationName} - ${ticketData.locations[toIndex].locationName}`}
                                                        </Typography>
                                                    </Grid>
                                                    <Grid item xs={12} container>
                                                        <Grid item xs={12}  container>
                                                            <Grid item xs={12} display="flex">
                                                                <Typography style={{fontSize: 15}}>
                                                                    {`Depart Time : ${getTime(ticketData.routes[routeIndex].serviceTime)}`}&nbsp;
                                                                </Typography>
                                                                <Typography style={{fontSize: 15}}>
                                                                    {`| Depart Date : ${ticketData.routes[routeIndex].serviceStartDate}`}
                                                                </Typography>
                                                            </Grid> 
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                <Grid item xs={2} container direction="row" spacing={1} alignItems={'center'} justify={'center' }style={{ width: "100%" }}>
                                                    <Grid xs={12} justifyContent='center' alignItems="center" textAlign="center" container justify="center">
                                                    <Tooltip title="View QR Ticket">
                                                        <IconButton>
                                                            <QrCode2Icon fontSize='large' sx={{fontSize: '75px'}} onClick={(() => history.push(`/ticket/${item.ticketID}`))} />
                                                        </IconButton>
                                                    </Tooltip>
                                                    </Grid>
                                                </Grid>
                                            </Grid>
                                            </div>
                                        )
                                    } else if (status == "board") {
                                        if (!item.used) {
                                            return (
                                                <div>
                                                <Grid item xs={12} container style={{background: 'white', marginTop: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                                                    <TableContainer component={Paper}>
                                                        <TableHead className={classes.customTable}>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography style={{fontSize: 16, display: 'flex'}}>
                                                                        <StoreIcon />{ticketData.vendorD[vendorIndex].vendorName}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell width='65%'></TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                    </TableContainer>
                                                </Grid>
                                                <Grid item xs={12} container style={{background: 'white', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                                                    <Grid item xs={3}>
                                                        <Avatar variant="square"
                                                        src={`https://etixbucket.s3.amazonaws.com/etix/${item.vendor}.png`}
                                                        alt={`serviceLogo${item.vendor}`}
                                                        style={{margin: 5, height: 125, width:'95%', marginRight: '25px'}}
                                                        >
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item xs={7} container style={{color: 'black', fontFamily: ['rubik', 'sans-serif'].join(','), padding: 10}}>
                                                        <Grid item xs={12} >
                                                            <Typography style={{fontSize: 20}}>
                                                                {`${ticketData.routes[routeIndex].serviceName}`}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <Typography style={{fontSize: 20}}>
                                                                {`${ticketData.locations[fromIndex].locationName} - ${ticketData.locations[toIndex].locationName}`}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} container>
                                                            <Grid item xs={12}  container>
                                                                <Grid item xs={12} display="flex">
                                                                    <Typography style={{fontSize: 15}}>
                                                                        {`Depart Time : ${getTime(ticketData.routes[routeIndex].serviceTime)}`}&nbsp;
                                                                    </Typography>
                                                                    <Typography style={{fontSize: 15}}>
                                                                        {`| Depart Date : ${ticketData.routes[routeIndex].serviceStartDate}`}
                                                                    </Typography>
                                                                </Grid> 
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={2} container direction="row" spacing={1} alignItems={'center'} justify={'center' }style={{ width: "100%" }}>
                                                        <Grid xs={12} justifyContent='center' alignItems="center" textAlign="center" container justify="center">
                                                        <Tooltip title="View QR Ticket">
                                                            <IconButton>
                                                                <QrCode2Icon fontSize='large' sx={{fontSize: '75px'}} onClick={(() => history.push(`/ticket/${item.ticketID}`))} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                </div>
                                            )
                                        }
                                    } else if (status == "completed") {
                                        if (item.used) {
                                            return (
                                                <div>
                                                <Grid item xs={12} container style={{background: 'white', marginTop: 10, borderTopLeftRadius: 5, borderTopRightRadius: 5}}>
                                                    <TableContainer component={Paper}>
                                                        <TableHead className={classes.customTable}>
                                                            <TableRow>
                                                                <TableCell>
                                                                    <Typography style={{fontSize: 16, display: 'flex'}}>
                                                                        <StoreIcon />{ticketData.vendorD[vendorIndex].vendorName}
                                                                    </Typography>
                                                                </TableCell>
                                                                <TableCell width='65%'></TableCell>
                                                                <TableCell></TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                    </TableContainer>
                                                </Grid>
                                                <Grid item xs={12} container style={{background: 'white', borderBottomLeftRadius: 5, borderBottomRightRadius: 5}}>
                                                    <Grid item xs={3}>
                                                        <Avatar variant="square"
                                                        src={`https://etixbucket.s3.amazonaws.com/etix/${item.vendor}.png`}
                                                        alt={`serviceLogo${item.vendor}`}
                                                        style={{margin: 5, height: 125, width:'95%', marginRight: '25px'}}
                                                        >
                                                        </Avatar>
                                                    </Grid>
                                                    <Grid item xs={7} container style={{color: 'black', fontFamily: ['rubik', 'sans-serif'].join(','), padding: 10}}>
                                                        <Grid item xs={12} >
                                                            <Typography style={{fontSize: 20}}>
                                                                {`${ticketData.routes[routeIndex].serviceName}`}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} >
                                                            <Typography style={{fontSize: 20}}>
                                                                {`${ticketData.locations[fromIndex].locationName} - ${ticketData.locations[toIndex].locationName}`}
                                                            </Typography>
                                                        </Grid>
                                                        <Grid item xs={12} container>
                                                            <Grid item xs={12}  container>
                                                                <Grid item xs={12} display="flex">
                                                                    <Typography style={{fontSize: 15}}>
                                                                        {`Depart Time : ${getTime(ticketData.routes[routeIndex].serviceTime)}`}&nbsp;
                                                                    </Typography>
                                                                    <Typography style={{fontSize: 15}}>
                                                                        {`| Depart Date : ${ticketData.routes[routeIndex].serviceStartDate}`}
                                                                    </Typography>
                                                                </Grid> 
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid item xs={2} container direction="row" spacing={1} alignItems={'center'} justify={'center' }style={{ width: "100%" }}>
                                                        <Grid xs={12} justifyContent='center' alignItems="center" textAlign="center" container justify="center">
                                                        <Tooltip title="View QR Ticket">
                                                            <IconButton>
                                                                <QrCode2Icon fontSize='large' sx={{fontSize: '75px'}} onClick={(() => history.push(`/ticket/${item.ticketID}`))} />
                                                            </IconButton>
                                                        </Tooltip>
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                                </div>
                                            )
                                        }
                                    }
                                }
                            )              
                        )
                        :
                        (
                            null
                        )
                        
                    }
            </Grid>
        );
}

export default TicketActivities
