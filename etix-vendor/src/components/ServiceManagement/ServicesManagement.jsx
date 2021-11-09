import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Icon, Paper, TextField, Tooltip, Toolbar} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect, props, useState} from 'react';
import moscow from '../globalAssets/moscow.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { servicelist } from '../../actions/serviceActions/serviceActions';
import { listHelp, deleteHelp } from '../../actions/helpActions/helpActions'
import {useDispatch, useSelector} from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarColumnsButton} from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${moscow})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: 700
    },
}));

function escapeRegExp(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}

function CustomToolbar() {
    return (
      <GridToolbarContainer>   
        <GridToolbarColumnsButton />  
        <GridToolbarExport /> 
        <GridToolbarFilterButton />
        <GridToolbarDensitySelector />     
      </GridToolbarContainer>
    );
}


function DialogDelete(props) {
  const [openDD, setOpenDD] = useState(false);
  const dispatch = useDispatch()
  console.log(props)
  let history = useHistory()

  const handleClickOpen = () => {
    setOpenDD(true);
  };

  const handleClose = () => {
    setOpenDD(false);
  };

  const handleDelete = (ids) => {
    ids.map((id) => {
        dispatch(deleteHelp(id));
    })

    alert("Sucessfully Deleted");
    history.push("/menu/helpdesk");
  }

  return (
    <Toolbar>
      <Tooltip title="Delete" onClick={handleClickOpen}>
          <IconButton >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={openDD}
        onClose={handleClose}
      >
        <DialogTitle id="alert-dialog-title">
          {"Delete Message(s)"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the message(s)?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button style={{color: "red"}} onClick={handleDelete}>Yes</Button>
          <Button onClick={handleClose} autoFocus>
            No
          </Button>
        </DialogActions>
      </Dialog>
    </Toolbar>
  );
}

const columns = [
    { field: 'id', headerName: 'Service ID', width: 130 },
    {
      field: 'service',
      headerName: 'Service',
      headerAlign: 'center',
      width: 230,
      editable: true,
    },
    {
      field: 'departure',
      headerName: 'Departure',
      headerAlign: 'center',
      type: 'date',
      width: 150,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'Service Time',
      headerAlign: 'center',
      Alignment: 'center',
      type: 'time',
      width: 200,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      headerAlign: 'center',
      width: 120,
      editable: false,
      renderCell: (params) => {
        console.log(params);
        return (
          //style={{display:'flex';justifyContent:'center';alignItems:'center'}}
          <Container >
            {params.row.status === "Active"? (<CheckCircleIcon style={{color: 'green'}}/>) : (<CancelIcon style={{color: 'red'}} />)}
          </Container>
        );
     },
    },
    {
      field: 'actions',
      headerName: 'Actions',
      headerAlign: 'center',
      width: 250,
      editable: false,
      sortable: false,
      disableColumnMenu: true,
      renderCell: (params) => {
        console.log(params);
        return (
          <Container >
            <Grid xs={12} display="flex">
              <Grid xs={6} item>
                <Toolbar>
                <Tooltip title="Edit">
                <IconButton href={`/menu/helpdesk/${params.row.id}`}>
                  <EditIcon />
                </IconButton>
                </Tooltip>
                </Toolbar>
              </Grid>
              <Grid xs={6} item>
                <DialogDelete props={params}/>
              </Grid>
            </Grid>
          </Container>
        );
     },
    }
  ];

function ServicesManagement() {
    const defaultStyle = useStyles();
    const userLogin = useSelector(state => state.userLogin)
    const {error, userInfo} = userLogin
    const dispatch = useDispatch()
    const serviceList = useSelector(state => state.serviceList)
    const {loading} = serviceList

    const [search, setSearch] = useState();
    // const serviceList = useSelector(state => state.serviceList)
    // const {services} = serviceList

    useEffect(() => {
      if(userInfo) {
        dispatch(servicelist(userInfo.vendorInfo.vendorID, userInfo.token, userInfo))
      }
    }, [userInfo])

    useEffect(() => {
      if (loading) {
        return (<CircularProgress disableShrink />)
      }
    }, [loading])

    const rows = userInfo.services?.map(service => {
      var s = service.serviceStatus === "O"? "Active":"Inactive"
      var timeString = service.serviceTime // input string
      var arr = timeString.split(":"); // splitting the string by colon
      var suffix = arr[0] >= 12 ? " PM":" AM"
      var t = arr[0] + ":" + arr[1] + suffix

      return {
        id: service.serviceID,
        service: service.serviceName,
        departure: service.serviceEndDate,
        time: t,
        status: s
      }
    })

    const [rowss, setRows] = useState(rows);

    const requestSearch = (searchValue) => {
      setSearch(searchValue)
      const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
      const filteredRows = rows.filter((row) => {
        return Object.keys(row).some((field) => {
          return searchRegex.test(row[field].toString());
        });
      });
      setRows(filteredRows);
    };

    useEffect(() => {
      setRows(rowss)
    }, [rowss]);

    return (
        
        <Box className={defaultStyle.whole}>
            <Container>
            <Grid xs={12} direction="column" spacing={20}>
                <Grid xs={12} padding={5} display="flex" container>
                    <Grid xs={4} item  justify="center"  alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                    <Paper component="form" sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 230 }}>
                      <InputBase 
                      placeholder="Search..." value={search} onChange={(e) => requestSearch(e.target.value)}
                      inputProps={{ 'aria-label': 'search users',}}
                      />               
                      <IconButton
                      title="Clear"
                      aria-label="Clear"
                      size="small"
                      style={{ visibility: search ? 'visible' : 'hidden' }}
                      onClick={e => requestSearch('')}
                      >
                      <ClearIcon fontSize="small" />
                      </IconButton>
                      <SearchIcon fontSize="small" />
                    </Paper>
                    </Grid>
                    <Grid xs={4} item display="flex" justify="center"  alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                        <Box >
                        </Box>
                    </Grid>
                    <Grid xs={4} alignItems="flex-end" alignContent="flex-end" flexWrap="wrap" justifyContent="flex-end" container spacing={0.5}>
                    <Grid xs={12} item display="flex" alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                          <Grid xs={6} item md={1} paddingRight={8}>
                          <Tooltip title="Delete">  
                          <IconButton> 
                          <DeleteIcon style={{fontSize: 40}}/>
                          </IconButton>
                          </Tooltip> 
                          </Grid>
                          <Grid xs={6} item md={1}>
                          <Tooltip title="Message">  
                          <IconButton> 
                          <AddCircleIcon style={{fontSize: 40}}/>
                          </IconButton>
                          </Tooltip> 
                          </Grid>
                      </Grid>             
                    </Grid>
                </Grid>
                <Paper>
                <Grid xs={12} container>             
                    <Grid style={{ height: 450, width: '100%' }}>
                        <DataGrid
                        rows={rowss}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        components={{
                            Toolbar: CustomToolbar
                        }}
                        />
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
            </Container>
        </Box>
        
    );
}

export default ServicesManagement;