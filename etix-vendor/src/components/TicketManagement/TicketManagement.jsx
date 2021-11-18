import { AppBar, Grid, Box, Container, IconButton, Button, Icon, Paper, TextField, Tooltip, Toolbar, Typography} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import React, {useEffect, props, useState, useRef, useCallback} from 'react';
import moscow from '../globalAssets/moscow.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCommentIcon from '@mui/icons-material/AddComment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { listHelp, deleteHelp } from '../../actions/helpActions/helpActions';
import { ticketlist } from '../../actions/ticketActions/ticketActions';
import {useDispatch, useSelector} from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import {HELP_DELETE_RESET} from '../../constants/helpConstants/helpConstants'
import PropTypes from 'prop-types';
import { DataGrid,GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarColumnsButton} from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { useHistory } from 'react-router';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import QrCodeScannerSharpIcon from '@mui/icons-material/QrCodeScannerSharp';
import QrReader from 'react-qr-reader'
import { alpha } from '@mui/material/styles';
import MuiDialog from '@material-ui/core/Dialog';
import { useAsyncEffect } from "use-async-effect2";

const Dialog = withStyles((theme) => ({
  paper: {
    height: 340 // 100% is for full height or anything else what you need
  },
}))(MuiDialog);

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

function TicketManagement() {
    const defaultStyle = useStyles();
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let history = useHistory()

    const deleteHelplist = useSelector(state => state.deleteHelplist)
    const {success: successDelete, loading: loadDel} = deleteHelplist;
    const helpList = useSelector(state => state.helpList);
    const {helps, loading: loadhelp} = helpList;
    const ticketList = useSelector(state => state.ticketList);
    const {ticket, loading: loadticket} = ticketList;

    const [search, setSearch] = useState("");
    const [select, setSelection] = useState([]);
    const [row, setRow] = useState([]);
    const [rows, setRows] = useState([]);
    const [openDel, setOpenDel] = useState(false);

    const [scan, setScan] = useState("No Result");

    const columns = [
      { field: 'id', headerName: 'Ticket ID', headerAlign: 'center',width: 150 },
      {
        field: 'route',
        headerName: 'Route',
        headerAlign: 'center',
        width: 150,
        editable: false,
      },
      {
        field: 'departureT',
        headerName: 'Departure Terminal',
        headerAlign: 'center',
        width: 250,
        editable: false,
      },
      {
        field: 'createdAt',
        headerName: 'Created At',
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
          return (
            //style={{display:'flex';justifyContent:'center';alignItems:'center'}}  
              <Toolbar>
              {params.row.status === false? (
              <Tooltip title="Open">
              <CheckCircleIcon style={{color: 'green'}}/>
              </Tooltip>):(
              <Tooltip title="Invalid">
              <CancelIcon style={{color: 'red'}}/>
              </Tooltip>)
              }
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
          return (
            <Container >
              <Grid xs={12} display="flex" justifyContent="center">
                  {select.length >= 2? null:<DialogDelete ids={params.row.id}/>}
              </Grid>
            </Container>
          );
       },
      },
    ];

    useEffect(() => {
        if(userInfo){
            dispatch(listHelp());
            dispatch(ticketlist());
        }
        else{
            history.push('/')
        }
    }, [dispatch, successDelete])

    useEffect(() => {
      if(successDelete){
        setOpenDel(true);
      }
    }, [successDelete])

    useEffect(() => {
      if(ticket) {
        const t = ticket?.map(tk => {
          var s = tk.used
          // console.log(select)
          return {
            id: tk.ticketID,
            route: tk.route,
            departureT: tk.serviceInfo.servicedepartureTerminal,
            createdAt: tk.created_at,
            status: s
          }
        })
        setRow(t);
      }
    }, [ticket])

    const requestSearch = (searchValue) => {
      setSearch(searchValue)
      const searchRegex = new RegExp(escapeRegExp(searchValue), 'i');
      const filteredRows = row.filter((roww) => {
        return Object.keys(roww).some((field) => {
          return searchRegex.test(roww[field].toString());
        });
      });
      setRows(filteredRows);
    };

    useEffect(()=> {
      if(row){
        search  === ""? setRows(row):setRows(rows);
      }
    })

    const DialogDelete = (ids) => {
      const [open, setOpen] = useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        ids = null;
        setOpen(false);
      };
    
      const handleDelete = () => {
        dispatch(deleteHelp(ids.ids));
        ids = null;
        setSelection([]);
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
            // onClose={handleClose}
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

    const DialogScan = (ids) => {
      const [open, setOpen] = useState(false);
      const scanMounted = useRef(true);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        // ids = null;
        setOpen(false);
      };

      const handleError = err => {
        console.error(err)
      }

      const previewStyle = {
        height: 140,
        width: 220,
      }

      const handleScan = useCallback((data) => {
        if(data){
          setScan(data);
          console.log(scan); 
          setOpen(false);
          return data;
        }
      }, [scan])

      return (
        <Toolbar>
          <Tooltip title="Scan" onClick={handleClickOpen}>
              <IconButton >
              <QrCodeScannerSharpIcon />
              </IconButton>
          </Tooltip>
          <Dialog
            open={open}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" maxWidth="sm" 
            PaperProps={{
              sx: {
                Height: 400
              }
            }}
          >
            <DialogTitle id="alert-dialog-title">
              {"Scan Ticket(s)"}
            </DialogTitle>
            <DialogContent>
            <QrReader
            facingMode={'environment'}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={previewStyle}
            resolution={600}
            />
            {/* <div><Typography>{setScan}</Typography></div> */}
            </DialogContent>
            <DialogActions>
              <Button style={{color: "red"}} onClick={handleClose}>Cancel</Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      );
    }

    const DialogDelete2 = () => {
      const [open, setOpen] = useState(false);
    
      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
      const handleDelete = () => {
        select.map((ids) => {
          dispatch(deleteHelp(ids.id));
        })
        
        setOpen(false);
        setSelection([]);
      }
    
      return (
        <Toolbar>
          <Tooltip onClick={handleClickOpen} title="delete">
              {select.length <= 0?
                <IconButton disabled={true}>
                  <DeleteIcon style={{fontSize: 40}}/>
                </IconButton>
                :
                <IconButton >
                {select.length < 2? (<DeleteIcon style={{fontSize: 40, color: "black"}}/>):(<DeleteIcon style={{fontSize: 40, color: "red"}}/>)}
                </IconButton>            
              }
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


    const DialogDel = () => {
      const handleClose = () => {
        dispatch({type: HELP_DELETE_RESET});
        setOpenDel(false);
        history.push(`/menu/helpmanage`);
      };

      return (
        <Toolbar>
          <Dialog
            open={openDel}
            onClose={handleClose}
          >
            <DialogTitle id="alert-dialog-title">
              {"Notification"}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                The message(s) is deleted
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      );
  }

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
                          <Grid xs={6} item md={1} paddingRight={15}>             
                          <DialogDelete2 />
                          </Grid>
                          <Grid xs={6} item md={1}>
                          <DialogScan />
                          </Grid>
                      </Grid>            
                  </Grid>
              </Grid>
              <Paper>
              <Grid xs={12} container>
                  <Grid xs={12} container style={{ height: 450, width: '100%' }} position="relative">
                      <DataGrid
                      container
                      rows={rows}
                      columns={columns}
                      pageSize={5}
                      rowsPerPageOptions={[5]}
                      checkboxSelection
                      disableSelectionOnClick
                      onSelectionModelChange={(ids) => {
                        const selectedIDs = new Set(ids);
                        const selectedRowData = row.filter((row) =>
                          selectedIDs.has(row.id.toString())
                        )
                        // console.log(selectedRowData);
                        setSelection(selectedRowData);
                      }}
                      components={{
                          Toolbar: CustomToolbar
                      }}
                      />
                  </Grid>
              </Grid>
              <Grid>
                {openDel? <DialogDel />:null}
              </Grid>
              <Grid>
                {
                  loadDel? 
                  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                  <CircularProgress  style={{color: '#F5CB5C'}}/>
                  </Backdrop>:null
                }
              </Grid>
              <Grid>
              {
                  loadticket? 
                  <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={true}>
                  <CircularProgress  style={{color: '#F5CB5C'}}/>
                  </Backdrop>:null
              }
              </Grid>
              </Paper>
          </Grid>
          </Container>
      </Box>
      
  );
}

export default TicketManagement;