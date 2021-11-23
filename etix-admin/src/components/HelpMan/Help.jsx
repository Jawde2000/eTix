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
import { useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {Link} from 'react-router-dom';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteHelp, listHelp } from '../../actions/helpActions';
import { useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

//a npm package for generating PDF tables 
import jsPDF from 'jspdf'
import 'jspdf-autotable'

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
        id: 'helpdeskID',
        numeric: true,
        disablePadding: true,
        label: 'Help ID',
    },
    {
        id: 'user',
        numeric: false,
        disablePadding: true,
        label: 'Sender',
    },
    {
        id: 'to_vendor',
        numeric: false,
        disablePadding: true,
        label: 'To Vendor',
    },
    {
        id: 'to_admin',
        numeric: false,
        disablePadding: true,
        label: 'To Admin',
    },
    {
        id: 'helpdeskTitle',
        numeric: false,
        disablePadding: true,
        label: 'Title',
    },
    {
        id: 'helpdeskMessage',
        numeric: false,
        disablePadding: true,
        label: 'Message Body',
    },
    {
        id: 'helpdeskDateTime',
        numeric: false,
        disablePadding: true,
        label: 'Date/Time',
    },
    {
        id: 'helpdeskStatus',
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
                    Help Management
                </Typography>
            )}

            {numSelected > 0 ? (
                <Tooltip title="Delete">
                <IconButton>
                    <DeleteIcon onClick={()=>props.handleDelete(props.selected)}/>
                </IconButton>
                </Tooltip>
            ) : (
                <Tooltip title="Export to PDF file">
                    <IconButton>
                        <DownloadIcon
                            onClick={() => downloadPDF()}
                            style={{cursor: 'pointer'}}
                        />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
};


const Help = () =>{
    const dispatch = useDispatch()
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    let history = useHistory()
    
    
    const helpList = useSelector(state => state.helpList)
    const {loading, error, helps} = helpList

    const helpDelete = useSelector(state => state.helpDelete)
    const {success: successDelete} = helpDelete

    useEffect(() => {
        if(userInfo){
            dispatch(listHelp())
        }
        else{
            history.push('/')
        }
    }, [dispatch, successDelete])

    const [rows, setRows] = useState([]);
    const [originalRows, setOriginalRows] = useState([]);
    useEffect(() => {
        if(helps){
            setOriginalRows(helps)
            setRows(helps)
        }
    }, [helpList])


    const classes = useStyles();
    // const [rows, setRows] = useState(originalRows);
    const [order, setOrder] = useState('asc');
    const [orderBy, setOrderBy] = useState('helpdeskID');
    const [selected, setSelected] = useState([]);
    const [page, setPage] = useState(0);
    const [dense, setDense] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchedUserID, setSearchedUserID] = useState("");
    const [searchedStatus, setSearchedStatus] = useState("---");
    const [searchedReceiver, setSearchedReceiver] = useState("---");


    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n)=> n.helpdeskID);
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
    
    const isSelected = (helpdeskID) => selected.indexOf(helpdeskID) !== -1;
    
    const emptyRows = page > 0 ? Math.max(0,(1+page) * rowsPerPage - rows.length) : 0;

    const requestSearchUserID = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
          return row.user.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
        setSearchedUserID(searchedVal);
    };
    
    const cancelSearchUserID = () => {
        setSearchedUserID("");
        requestSearchUserID(searchedUserID);
    };

    const requestSearchStatus = (searchedVal) => {
        setSearchedStatus(searchedVal);
        const filteredRows = originalRows.filter((row) => {
            if(searchedVal == "---"){
                return row.helpdeskStatus
            }
            if(searchedVal === "Open"){
                if(row.helpdeskStatus === "OP"){
                    return row.helpdeskStatus
                }
            }
            else if(searchedVal === "Closed"){
                if(row.helpdeskStatus === "CL"){
                    return row.helpdeskStatus
                }
            }
            else if(searchedVal === "Responded"){
                if(row.helpdeskStatus === "RP"){
                    return row.helpdeskStatus
                }
            }
        });
        setRows(filteredRows);
    };

    const requestSearchReceiver = (searchedVal) => {
        setSearchedReceiver(searchedVal);
        const filteredRows = originalRows.filter((row) => {
            if(searchedVal == "---"){
                return row.to_vendor || row.to_admin
            }
            if(searchedVal === "toVendor"){
                if(row.to_vendor){
                    return row.to_vendor
                }
            }
            else if(searchedVal === "toAdmin"){
                if(row.to_admin){
                    return row.to_admin
                }
            }
        });
        setRows(filteredRows);
    };

    const handleDelete = (ids) => {
        ids.map((id) => {
            dispatch(deleteHelp(id));
        })

        alert("Sucessfully Deleted");
        setSelected([]);
        history.push("/menu/helpdesk");
    }
    
    return (
        <Container className={classes.root} maxWidth="Fixed">
            <Container>
            <Box>
                <Paper sx={{width:'100%', mb: 2}} className={classes.table}>
                    <Container style={{paddingTop: 30}}>
                        <TextField
                            placeholder="Search User"
                            type="search"
                            label="User ID"
                            style={{width: 300}} 
                            value={searchedUserID} 
                            onChange={(e) => requestSearchUserID(e.target.value)} 
                            onCancelSearch={()=>cancelSearchUserID()}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                       <SearchIcon />
                                    </InputAdornment>
                                     ),
                                  }}

                        />
                        <Select
                            id="searchStatus"
                            value={searchedStatus}
                            label="Status"
                            onChange={(e) => requestSearchStatus(e.target.value)}
                            style={{marginLeft: 10}}
                        >
                            <MenuItem value={"---"}>----</MenuItem>
                            <MenuItem value={"Open"}>Open</MenuItem>
                            <MenuItem value={"Closed"}>Close</MenuItem>
                            <MenuItem value={"Responded"}>Responded</MenuItem>
                        </Select>
                        <Select
                            id="searchReceiver"
                            value={searchedReceiver}
                            label="To Receive"
                            onChange={(e) => requestSearchReceiver(e.target.value)}
                            style={{marginLeft: 10}}
                        >
                            <MenuItem value={"---"}>----</MenuItem>
                            <MenuItem value={"toVendor"}>To Vendor</MenuItem>
                            <MenuItem value={"toAdmin"}>To Admin</MenuItem>
                        </Select>
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
                                    const isItemSelected = isSelected(row.helpdeskID);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.helpdeskID)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.helpdeskID}
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
                                            {row.helpdeskID}
                                        </TableCell>
                                        <TableCell align="center"><Link to={`/user/${row.user}`}>{row.user}</Link></TableCell>
                                        <TableCell align="center">{row.to_vendor? (<CheckCircleIcon style={{color: 'green'}}/>) : (<CancelIcon style={{color: 'red'}} />)}</TableCell>
                                        <TableCell align="center">{row.to_admin? (<CheckCircleIcon style={{color: 'green'}}/>) : (<CancelIcon style={{color: 'red'}} />)}</TableCell>
                                        <TableCell align="center">{row.helpdeskTitle}</TableCell>
                                        <TableCell align="center">{row.helpdeskMessage.substring(0, 20) + "..."}</TableCell>
                                        <TableCell align="center">{row.helpdeskDateTime}</TableCell>
                                        <TableCell align="center">{row.helpdeskStatus === "OP"? "Open" : (row.helpdeskStatus==="CL"? "Closed" : "Responded")}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Edit">
                                                <IconButton>
                                                    <Link to={`/help/${row.helpdeskID}`}>
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
        </Container>
        </Container>
    );
}

export default Help