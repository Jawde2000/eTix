import { AppBar, Grid, Box, Container, IconButton, Button, Icon, Paper, TextField, Tooltip, Toolbar, Typography} from '@mui/material';
import { makeStyles, withStyles } from '@mui/styles';
import React, {useEffect, props, useState, useCallback, Component, useContext, createContext} from 'react';
import moscow from '../globalAssets/moscow.jpg'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCommentIcon from '@mui/icons-material/AddComment';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { listHelp, deleteHelp } from '../../actions/helpActions/helpActions';
import { ticketlist, ticketUsed } from '../../actions/ticketActions/ticketActions';
import {useDispatch, useSelector} from 'react-redux'
import ClearIcon from '@mui/icons-material/Clear';
import {TICKET_RESET, TICKET_RESET_USED} from '../../constants/ticketConstants/ticketConstants'
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
import Dialog from '@mui/material/Dialog';
import QrCodeScannerSharpIcon from '@mui/icons-material/QrCodeScannerSharp';
import { alpha } from '@mui/material/styles';
import MuiDialog from '@material-ui/core/Dialog';
import QrReader from 'react-qr-reader';
import Scanner from "react-webcam-qr-scanner";

// const DialogScan = withStyles((theme) => ({
//   paper: {
//     height: 295 // 100% is for full height or anything else what you need
//   },
// }))(MuiDialog);

// class Scanner extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       result: 'No result'
//     }
//     this.returnValue = this.returnValue.bind(this);
//   }

//   returnValue(e) {
//     return 
//   }
 
//   handleScan = (data) => {
//     if (data) {
//       this.state.setState({
//         result: data
//       })
//       console.log(this.state.result);
//     }
//   }

//   handleError = err => {
//     console.error(err)
//   }

//   previewStyle = {
//     height: 140,
//     width: 220,
//   }

//   render() {
//     return (
//         <QrReader
//           delay={300}
//           onError={this.handleError}
//           onScan={this.handleScan}
//           style={this.previewStyle}
//         />
//     )
//   }
// }


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
    const ticketList = useSelector(state => state.ticketList);
    const {ticket, loading: loadticket, ticketSuccess} = ticketList;

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
            dispatch(ticketlist());
        }
        else{
            history.push('/')
        }
    }, [dispatch, successDelete, ticketSuccess])

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
    }, [ticket, ticketSuccess])

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
      console.log(ids);
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
      const [openS, setOpenS] = useState(false);

      const handleClickOpen = () => {
        setOpenS(true);
      };
    
      const handleClose = () => {
        // ids = null;
        setOpenS(false);
      };

      const previewStyle = {
        height: 150,
        width: 220,
      }

      const handleDecode = (result) => {
        // console.log(result);
        setScan(result.data);
      } 

      useEffect(() => {
        if(scan) {
          if (scan !== "No Result"){
            console.log(scan);
            dispatch(ticketUsed(scan));
            setScan("No Result");
            history.go(0);
          }
        }
      }, [scan])
    
      const handleScannerLoad = (mode) => {
        // console.log(mode);
      }    

      return (
        <Toolbar>
          <Tooltip title="Scan" onClick={handleClickOpen}>
              <IconButton style={{fontSize: 40, color: "black"}}>
              <QrCodeScannerSharpIcon />
              </IconButton>
          </Tooltip>
          <Dialog
            open={openS}
            // onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description" maxWidth="sm" 
            PaperProps={{
              sx: {
                Height: 300
              }
            }}
          >
            <DialogTitle id="alert-dialog-title">
              {"Scan Ticket(s)"}
            </DialogTitle>
            <DialogContent>
            <Scanner 
            className="some-classname"
            onDecode={handleDecode}
            onScannerLoad={handleScannerLoad}
            constraints={{ 
              audio: false, 
              video: { 
                facingMode: "environment" 
              } 
            }}
            style={previewStyle}
            />
            {/* <QrReader
            facingMode={'environment'}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            style={previewStyle}
            resolution={600}
            /> */}
            {/* <div><Typography>{setScan}</Typography></div> */}
            {/* <Scanner /> */}
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
        // dispatch({type: HELP_DELETE_RESET});
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