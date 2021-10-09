import { Grid, Box, Paper} from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';
import moscow from '../globalAssets/moscow.jpg'
import Searchbar from './Searchbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import UserDataGrid from '../userManagement/UserDataGrid'

const useStyles = makeStyles((theme) => ({
    whole: {
      backgroundImage: `url(${moscow})`,
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundColor: "rgba(255,255,255,0.5)",
      backgroundBlendMode: "lighten",
      minHeight: 700
    },
}));

function UserManagement() {
    const defaultStyle = useStyles();

    return (
        <Box className={defaultStyle.whole}>
            <Grid xs={12} direction="column" spacing={20}>
                <Grid xs={12} padding={5} display="flex" container>
                    <Grid xs={4} item  justify="center"  alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                        <Searchbar/>
                    </Grid>
                    <Grid xs={4} item display="flex" justify="center"  alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                        <Box >
                        </Box>
                    </Grid>
                    <Grid xs={4} alignItems="flex-end" alignContent="flex-end" flexWrap="wrap" justifyContent="flex-end" container spacing={0.5}>
                        <Grid xs={12} item display="flex" alignItems="center" alignContent="center" flexWrap="wrap" justifyContent="center">
                            <Grid xs={4} item md={1}>                          
                            <EditIcon style={{fontSize: 40}}/>         
                            </Grid>
                            <Grid xs={4} item md={1}>
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
                    <Paper elevation={24} >
                        <UserDataGrid padding={12}/>
                    </Paper>
                    </Grid>
                </Grid>
                </Paper>
            </Grid>
        </Box>
    );
}

export default UserManagement;