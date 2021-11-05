import { AppBar, Grid, Box, Container, IconButton, Link, Typography, Button, Icon, Paper, TextField, Tooltip, Toolbar} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React, {useEffect, props, useState} from 'react';
import moscow from '../globalAssets/moscow.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCommentIcon from '@mui/icons-material/AddComment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { listHelp, deleteHelp } from '../../actions/helpActions/helpActions'
import { getUser } from '../../actions/userActions/userActions';
import {useDispatch, useSelector} from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import PropTypes from 'prop-types';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarColumnsButton} from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { useHistory } from 'react-router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { alpha } from '@mui/material/styles';

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
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch()
  console.log(props)
  let history = useHistory()

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = (ids) => {
    ids.map((id) => {
        dispatch(deleteHelp(id));
    })

    alert("Sucessfully Deleted");
    HelpManagement.setSelection([]);
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
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
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

function HelpManagement() {
    const defaultStyle = useStyles();

    const columns = [
      { field: 'id', headerName: 'Help ID', headerAlign: 'center',width: 130 },
      {
        field: 'sender',
        headerName: 'Sender',
        headerAlign: 'center',
        width: 150,
        editable: false,
      },
      {
        field: 'title',
        headerName: 'Title',
        headerAlign: 'center',
        width: 230,
        editable: false,
      },
      {
        field: 'dateTime',
        headerName: 'Date Time',
        headerAlign: 'center',
        width: 250,
        editable: false,
      },
      {
        field: 'status',
        headerName: 'Status',
        headerAlign: 'center',
        width: 120,
        editable: false,
        renderCell: (params) => {
          console.log(params.row.status);
          return (
            //style={{display:'flex';justifyContent:'center';alignItems:'center'}}  
              <Toolbar>
              {params.row.status === "OP"? (
              <Tooltip title="Open">
              <CheckCircleIcon style={{color: 'green'}}/>
              </Tooltip>): params.row.status === "CL"?(
              <Tooltip title="Closed">
              <CancelIcon style={{color: 'red'}}/>
              </Tooltip>):(
              <Tooltip title="Responded">
              <CheckCircleIcon style={{color: 'blue'}}/>
              </Tooltip>
              )}
              </Toolbar>
          );
       },
      },
      {
        field: 'actions',
        headerName: 'Actions',
        width: 250, 
        headerAlign: 'center',
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
      },
    ];
    
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let history = useHistory()

    const deleteHelplist = useSelector(state => state.deleteHelplist)
    const {success: successDelete} = deleteHelplist

    const [search, setSearch] = useState();
    const [select, setSelection] = useState([]);
    // const serviceList = useSelector(state => state.serviceList)
    // const {services} = serviceList

    useEffect(() => {
        if(userInfo){
          if (document.referrer !== document.location.href) {
            setTimeout(function() {
                document.location.reload(2)
          }, 5000);
          }
            dispatch(listHelp())
        }
        else{
            history.push('/')
        }
    }, [dispatch, successDelete])

    // useEffect(() => {
    //   if (loading) {
    //     return (<CircularProgress disableShrink />)
    //   }
    // }, [loading])

    

    const rows = userInfo.sender?.map(help => {
      // var s = help.HelpdeskStatus ==="OP"?"Active": help.HelpdeskStatus ==="CL"?"Closed":"Responded"
      var s = help.helpdeskStatus
      console.log(select)
      return {
        id: help.helpdeskID,
        title: help.helpdeskTitle,
        sender: help.username,
        dateTime: help.helpdeskDateTime,
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
                          <AddCommentIcon style={{fontSize: 40}}/>
                          </IconButton>
                          </Tooltip> 
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
                      onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRowData = rows.filter((row) =>
                          selectedIDs.has(row.id.toString())
                        )
                        setSelection(selectedRowData)
                      }}
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

export default HelpManagement;