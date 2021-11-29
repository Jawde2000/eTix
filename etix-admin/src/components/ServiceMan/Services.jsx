import React from 'react'
import {makeStyles} from '@mui/styles';
import {Paper, Box,Container, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Checkbox, Tooltip, FormControlLabel, Switch, Typography, TextField} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { alpha } from '@mui/material/styles';
import { visuallyHidden } from '@mui/utils';
import IconButton from '@mui/material/IconButton';
import PropTypes from 'prop-types';
import moscow from '../globalAssets/moscow.jpg';
import DownloadIcon from '@mui/icons-material/Download';
import { useState, useEffect } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { listService, deleteService } from '../../actions/serviceActions';
import {useHistory} from 'react-router-dom'
import CancelIcon from '@mui/icons-material/Cancel';
//a npm package for generating PDF tables 
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import CheckCircle from '@mui/icons-material/CheckCircle';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { CircularProgress } from '@material-ui/core';
import { SERVICE_DELETE_RESET } from '../../constants/serviceConstants';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundImage: `url(${moscow})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundColor: "rgba(255,255,255,0.5)",
        backgroundBlendMode: "lighten",
        paddingTop: 3,
        paddingBottom: 3,
        minHeight: 700,
    },
    table: {
        marginTop: 50,
    },
}));

function descendingComparator(a,b,orderBy){
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy){
    return order === 'desc'
        ? (a,b) => descendingComparator(a,b,orderBy)
        : (a,b) => -descendingComparator(a,b,orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
            return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'serviceID',
        numeric: true,
        disablePadding: true,
        label: 'Service ID',
    },
    {
        id: 'vendorDetail',
        numeric: false,
        disablePadding: true,
        label: 'Vendor Name',
    },
    {
        id: 'servicedepartureTerminal',
        numeric: false,
        disablePadding: true,
        label: 'Start Terminal',
    },
    {
        id: 'servicearrivalTerminal',
        numeric: false,
        disablePadding: true,
        label: 'End Terminal',
    },
    {
        id: 'route',
        numeric: false,
        disablePadding: true,
        label: 'Route',
    },
    {
        id: 'serviceStartDate',
        numeric: false,
        disablePadding: true,
        label: 'Date',
    },
    {
        id: 'serviceTime',
        numeric: false,
        disablePadding: true,
        label: 'Departure time',
    },
    {
        id: 'serviceStatus',
        numeric: false,
        disablePadding: true,
        label: 'Status',
    },
];

function EnhancedTableHead(props){
    const { onSelectedAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectedAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectedAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
    const {numSelected} = props;

    //function to export pdf file
    const downloadPDF =()=>{
        const doc = new jsPDF()
        doc.text("Services Data",20,10)
        doc.autoTable({
            columns: headCells.map(head=>({header:head.label, dataKey:head.id})),
            body: props.originalRows,
        })
        doc.save("ServicesData.pdf")
    }
    
    return (
        <Toolbar
            sx={{
                pl: {sm:2},
                pr: { xs: 1, sm: 1 },
                ...(numSelected > 0 && {
                bgcolor: (theme) =>
                    alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {numSelected > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    Service Management
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete Service">
                <IconButton>
                    <DeleteIcon onClick={()=>props.handleDelete(props.selected)}/>
                </IconButton>
                </Tooltip>
            ) : (
                <>
                <Tooltip title="Export to PDF file">
                    <IconButton>
                        <DownloadIcon
                            onClick={() => downloadPDF()}
                            style={{cursor: 'pointer'}}
                            sx={{ color: 'blue' }}
                        />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Add New Service">
                    <Link to="/newService">
                        <IconButton>
                            <AddCircleIcon
                                style={{cursor: 'pointer'}}
                                sx={{ color: 'Green' }}
                           />
                        </IconButton>
                    </Link>
                </Tooltip>
                </>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


const Services = () =>{

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const serviceList = useSelector(state => state.serviceList)
    const {services, loading} = serviceList

    const serviceDelete = useSelector(state => state.serviceDelete)
    const {success: successDelete} = serviceDelete

    let history = useHistory()

    useEffect(() => {
        if(userInfo){
            dispatch(listService())
        }
        else{
            history.push('/')
        }

        if(successDelete){
            alert("Sucessfully Deleted");
            setSelected([]);
            dispatch({type: SERVICE_DELETE_RESET})
            history.push("/menu/servicemanagement");
        }
    }, [dispatch, successDelete])

    const [rows, setRows] = useState([]);

    const [originalRows, setOriginalRows] = useState([]);

    useEffect(() => {
        if(services){
            setOriginalRows(services)
            setRows(services)
        }
    }, [serviceList])

    const classes = useStyles();

    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('serviceID');
    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [searched, setSearched] = useState("");
    const [searchedStart, setSearchedStart] = useState("");
    const [searchedEnd, setSearchedEnd] = useState("");

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n)=> n.serviceID);
            setSelected(newSelecteds);
            return;
        }
        setSelected([]);
    };

    const handleClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
              selected.slice(0, selectedIndex),
              selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };
    
    const handleChangeDense = (event) => {
        setDense(event.target.checked);
    };
    
    const isSelected = (serviceID) => selected.indexOf(serviceID) !== -1;
    
    const emptyRows = page > 0 ? Math.max(0,(1+page) * rowsPerPage - rows.length) : 0;

    const requestSearchVendor = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
          return row.vendorDetail.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
        setSearched(searchedVal);
    };
    
    const cancelSearchVendor = () => {
        setSearched("");
        requestSearchVendor(searched);
    };

    const requestSearchStart = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
          return row.servicedepartureTerminal.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
        setSearchedStart(searchedVal);
    };
    
    const cancelSearchStart = () => {
        setSearched("");
        requestSearchStart(searchedStart);
    };

    const requestSearchEnd = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
          return row.servicearrivalTerminal.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
        setSearchedEnd(searchedVal);
    };
    
    const cancelSearchEnd = () => {
        setSearchedEnd("");
        requestSearchEnd(searchedEnd);
    };

    const handleDelete = (ids) => {
        var dlt = window.confirm("All data related with this service will be deleted. Are you sure to delete instead of setting the status to inactive? ")
        if(dlt){
            ids.map((id) => {
                dispatch(deleteService(id));
            })
        }
        else{
            return;
        }
        
    }
    
    return (
        <Container className={classes.root} maxWidth="Fixed">
            <Container >
            {loading?
                (
                    <Box sx={{ display: 'flex' }}>
                        <CircularProgress />
                    </Box>
                )
                :
                (
                    <Box>
                        <Paper sx={{width:'100%', mb: 2}} className={classes.table}>
                            <Container style={{paddingTop: 30}}>
                                <TextField
                                    placeholder="Search Vendor Name"
                                    type="search"
                                    label="vendor Name"
                                    style={{width: 300}} 
                                    value={searched} 
                                    onChange={(e) => requestSearchVendor(e.target.value)} 
                                    onCancelSearch={()=>cancelSearchVendor()}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <SearchIcon />
                                            </InputAdornment>
                                            ),
                                        }}

                                />
                                <TextField
                                    placeholder="Search Start"
                                    type="search"
                                    label="Start Terminal"
                                    style={{paddingLeft: 10, width: 250}} 
                                    value={searchedStart} 
                                    onChange={(e) => requestSearchStart(e.target.value)} 
                                    onCancelSearch={()=>cancelSearchStart()}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <SearchIcon />
                                            </InputAdornment>
                                            ),
                                        }}

                                />
                                <TextField
                                    placeholder="Search End"
                                    type="search"
                                    label="End Terminal"
                                    style={{paddingLeft: 10, width: 250}} 
                                    value={searchedEnd} 
                                    onChange={(e) => requestSearchEnd(e.target.value)} 
                                    onCancelSearch={()=>cancelSearchEnd()}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                            <SearchIcon />
                                            </InputAdornment>
                                            ),
                                        }}

                                />
                            </Container>
                            <EnhancedTableToolbar numSelected={selected.length} originalRows={originalRows} handleDelete={handleDelete} selected={selected}/>
                            <TableContainer>
                                <Table
                                    sx={{minWidth:750}}
                                    aria-labelledby="tableTitle"
                                    size={dense?'small':'medium'}
                                >
                                    <EnhancedTableHead 
                                        numSelected={selected.length}
                                        order={order}
                                        orderBy={orderBy}
                                        onSelectedAllClick={handleSelectAllClick}
                                        onRequestSort={handleRequestSort}
                                        rowCount={rows.length}
                                    />
                                    <TableBody>
                                        {stableSort(rows, getComparator(order, orderBy))
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, index) => {
                                            const isItemSelected = isSelected(row.serviceID);
                                            const labelId = `enhanced-table-checkbox-${index}`;

                                            return (
                                                <TableRow
                                                hover
                                                onClick={(event) => handleClick(event, row.serviceID)}
                                                role="checkbox"
                                                aria-checked={isItemSelected}
                                                tabIndex={-1}
                                                key={row.serviceID}
                                                selected={isItemSelected}
                                                >
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                    color="primary"
                                                    checked={isItemSelected}
                                                    inputProps={{
                                                        'aria-labelledby': labelId,
                                                    }}
                                                    />
                                                </TableCell>
                                                <TableCell
                                                    component="th"
                                                    id={labelId}
                                                    scope="row"
                                                    padding="none"
                                                    align="center"
                                                >
                                                    {row.serviceID}
                                                </TableCell>
                                                <TableCell align="center"><Link to={`/user/${row.userID}`}>{row.vendorDetail}</Link></TableCell>
                                                <TableCell align="center">{row.servicedepartureTerminal}</TableCell>
                                                <TableCell align="center">{row.servicearrivalTerminal}</TableCell>
                                                <TableCell align="center">{row.route}</TableCell>
                                                <TableCell align="center">{row.serviceStartDate}</TableCell>
                                                <TableCell align="center">{row.serviceTime}</TableCell>
                                                <TableCell align="center">{row.serviceStatus === 'O'? (<CheckCircle style={{color:'green'}}/>) : (<CancelIcon style={{color:'red'}} /> )}</TableCell>
                                                <TableCell align="center">
                                                    <Tooltip title="Edit">
                                                        <IconButton>
                                                            <Link to={`/service/${row.serviceID}`}>
                                                                <EditIcon style={{cursor: 'pointer'}}/>
                                                            </Link>
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                                </TableRow>
                                            );
                                            })}
                                        {emptyRows > 0 && (
                                            <TableRow
                                                style={{
                                                    height: (dense ? 33 : 53) * emptyRows,
                                                }}
                                                >
                                                <TableCell colSpan={6} />
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination 
                                rowsPerPageOptions = {[5,10,25]}
                                component = "div"
                                count = {rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange = {handleChangePage}
                                onRowsPerPageChange = {handleChangeRowsPerPage}
                            />
                            <FormControlLabel
                                control={<Switch checked={dense} onChange={handleChangeDense} />}
                                label="Dense padding"
                            />
                        </Paper>
                    </Box>
                )
            }
            </Container>
        </Container>
    );
}

export default Services