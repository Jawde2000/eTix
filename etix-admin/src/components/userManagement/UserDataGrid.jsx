import * as React from 'react';
import { DataGrid, GridToolbarContainer, GridToolbarExport, GridToolbarFilterButton, GridToolbarDensitySelector, GridToolbarColumnsButton} from '@mui/x-data-grid';
import { Button, Paper} from '@mui/material';


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
  { field: 'id', headerName: 'ID', width: 200 },
  {
    field: 'username',
    headerName: 'Username',
    width: 250,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 250,
    editable: true,
  },
  {
    field: 'role',
    headerName: 'Role',
    width: 250,
    editable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 250,
    editable: true,
  },
];

const rows = [
  { id: "E993382A", username: "admin", email: "admin@gmail.com", role: "Admin", status: "active" },
  { id: "E332169A", username: "admin2", email: "admin2@gmail.com", role: "Admin", status: "active" },
  { id: "97451694", username: "Pengeema Technologies", email: "admin2@gmail.com", role: "Vendor", status: "active" },
  { id: "15671716", username: "Chew", email: "zhipengchew@yahoo.com.sg", role: "Customer", status: "active" },
  { id: "	64325963", username: "jamond", email: "jamondchew2000@gmail.com", role: "Customer", status: "active" },
  { id: "	64325964", username: "koee", email: "koee@gmail.com", role: "Customer", status: "active" },
  { id: "	64325965", username: "matt", email: "matt@gmail.com", role: "Customer", status: "active" },
];

function UserDataGrid() {
  return (
    <div style={{ height: 400, width: '100%'}}>
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
  );
}

export default UserDataGrid;