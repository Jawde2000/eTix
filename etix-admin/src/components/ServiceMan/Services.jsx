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
import {Link} from 'react-router-dom'
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
        minHeight: 500,
    },
    table: {
        marginTop: 50,
    },
}));

function createData(sID, vName, startTerminal, endTerminal, date_time, status) {
    return  {
        sID,
        vName,
        startTerminal,
        endTerminal,
        date_time,
        status,
    };
}

const originalRows = [
    createData(1, 'ali1', "KLCC SENTRAL, KL", "Pesta, PEN", "12 December 2021","ACTIVE"),
    createData(2, "ali2", "KLCC SENTRAL, KL", "Pesta, JHR", "12 December 2021","CLOSED"),
    createData(3, "najib1", "KLCC SENTRAL, KL", "Pesta, KDH", "12 December 2021","ACTIVE"),
    createData(4, "najib2", "BAYAN LEPAS, PEN", "TPS, KL", "12 December 2021","ACTIVE"),
    createData(5, "najib3", "KLCC SENTRAL, KL", "Pesta, PEN", "12 December 2021","ACTIVE"),
    createData(6, "najib4", "KLCC SENTRAL, KL", "Pesta, PEN", "12 December 2021","ACTIVE"),
    createData(7, "mahiyadin1", "KLCC SENTRAL, KL", "Pesta, PEN", "12 December 2021","ACTIVE"),
    createData(8, "mahiyadin2", "KLCC SENTRAL, KL", "Pesta, PEN", "12 December 2021","ACTIVE"),
    createData(9, "mahathir1", "KLCC SENTRAL, KL", "Pesta, PEN", "12 December 2021","ACTIVE"),
    createData(10, "mahathir2", "KLCC SENTRAL, KL", "Pesta, PEN", "12 December 2021","ACTIVE"),
    createData(11, "mahathir3", "KLCC SENTRAL, KL", "Pesta, PEN", "12 December 2021","ACTIVE"),
]


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
        id: 'sID',
        numeric: true,
        disablePadding: true,
        label: 'Service ID',
    },
    {
        id: 'vName',
        numeric: false,
        disablePadding: true,
        label: 'Vendor Name',
    },
    {
        id: 'startTerminal',
        numeric: false,
        disablePadding: true,
        label: 'Start Terminal',
    },
    {
        id: 'endTerminal',
        numeric: false,
        disablePadding: true,
        label: 'End Terminal',
    },
    {
        id: 'date_time',
        numeric: false,
        disablePadding: true,
        label: 'Date/Time',
    },
    {
        id: 'status',
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
            body: originalRows,
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
                <Tooltip title="Delete">
                <IconButton>
                    <DeleteIcon />
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


const Services = () =>{
    const classes = useStyles();
    const [rows, setRows] = useState(originalRows);
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('sID');
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
            const newSelecteds = rows.map((n)=> n.sID);
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
    
    const isSelected = (sID) => selected.indexOf(sID) !== -1;
    
    const emptyRows = page > 0 ? Math.max(0,(1+page) * rowsPerPage - rows.length) : 0;

    const requestSearchVendor = (searchedVal) => {
        const filteredRows = originalRows.filter((row) => {
          return row.vName.toLowerCase().includes(searchedVal.toLowerCase());
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
          return row.startTerminal.toLowerCase().includes(searchedVal.toLowerCase());
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
          return row.endTerminal.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows);
        setSearchedEnd(searchedVal);
    };
    
    const cancelSearchEnd = () => {
        setSearchedEnd("");
        requestSearchEnd(searchedEnd);
    };
    
    return (
        <Container className={classes.root} maxWidth="Fixed">
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
                    <EnhancedTableToolbar numSelected={selected.length} />
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
                                    const isItemSelected = isSelected(row.sID);
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                        hover
                                        onClick={(event) => handleClick(event, row.sID)}
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.sID}
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
                                            {row.sID}
                                        </TableCell>
                                        <TableCell align="center">{row.vName}</TableCell>
                                        <TableCell align="center">{row.startTerminal}</TableCell>
                                        <TableCell align="center">{row.endTerminal}</TableCell>
                                        <TableCell align="center">{row.date_time}</TableCell>
                                        <TableCell align="center">{row.status}</TableCell>
                                        <TableCell align="center">
                                            <Tooltip title="Edit">
                                                <IconButton>
                                                    <Link to={`/service/${row.sID}`}>
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
    );
}

export default Services