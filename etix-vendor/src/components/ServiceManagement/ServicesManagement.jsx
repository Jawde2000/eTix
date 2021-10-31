import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Icon, Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect} from 'react';
import moscow from '../globalAssets/moscow.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { servicelist } from '../../actions/serviceActions/serviceActions';
import {useDispatch, useSelector} from 'react-redux'
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarColumnsButton} from '@mui/x-data-grid';

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${moscow})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      minHeight: 700
    },
}));

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
    },
    {
      field: 'departure',
      headerName: 'Departure',
      width: 250,
      editable: true,
    },
    {
      field: 'time',
      headerName: 'Service Time',
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
    const {error,  loading, userInfo} = userLogin
    const dispatch = useDispatch()
    // const serviceList = useSelector(state => state.serviceList)
    // const {services} = serviceList

    useEffect(() => {
      if(userInfo) {
        dispatch(servicelist(userInfo.vendorInfo.vendorID, userInfo.token, userInfo))
      }
    }, [userInfo])

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

    return (
        
        <Box className={defaultStyle.whole}>
            <Container>
            <Grid xs={12} direction="column" spacing={20}>
                <Grid xs={12} padding={5} display="flex" container>
                    <Grid xs={4} item  justify="center"  alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                        <Paper
                        component="form"
                        sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
                        >
                        <InputBase
                        sx={{ ml: 1, flex: 1 }}
                        placeholder="Search..."
                        inputProps={{ 'aria-label': 'search users' }}
                        />
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search">
                        <SearchIcon />
                        </IconButton>
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
                        rows={rows}
                        columns={columns}
                        pageSize={5}
                        rowsPerPageOptions={[5]}
                        checkboxSelection
                        disableSelectionOnClick
                        components={{
                            Toolbar: CustomToolbar,
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