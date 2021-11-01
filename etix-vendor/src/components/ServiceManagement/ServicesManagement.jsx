import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Icon, Paper, TextField} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect, props, useState} from 'react';
import moscow from '../globalAssets/moscow.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { servicelist } from '../../actions/serviceActions/serviceActions';
import {useDispatch, useSelector} from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarColumnsButton} from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';

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

const columns = [
    { field: 'id', headerName: 'Service ID', width: 200 },
    {
      field: 'service',
      headerName: 'Service',
      width: 250,
      editable: true,
    },
    {
      field: 'departure',
      headerName: 'Departure',
      type: 'date',
      width: 250,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'Service Time',
      type: 'time',
      width: 250,
      editable: true,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 200,
      editable: true,
    },
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

      return {
        id: service.serviceID,
        service: service.serviceName,
        departure: service.serviceEndDate,
        time: service.serviceTime,
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
                            <Grid xs={4} item md={1} paddingRight={8}>                          
                            <EditIcon style={{fontSize: 40}}/>         
                            </Grid>
                            <Grid xs={4} item md={1} paddingRight={8}>
                            <DeleteIcon style={{fontSize: 40}}/>
                            </Grid>
                            <Grid xs={4} item md={1}>
                            <AddCircleIcon style={{fontSize: 40}}/>
                            </Grid>
                        </Grid>            
                    </Grid>
                </Grid>
                <Paper>
                <Grid xs={12}>
                    <Grid xs={12}>
                    <div style={{ height: 450, width: '100%' }}>
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
                        </div>
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
            </Container>
        </Box>
        
    );
}

export default ServicesManagement;