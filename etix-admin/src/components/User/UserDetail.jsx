import React, {useState} from 'react'
import { Grid, Container, Box, Tooltip, IconButton, TextField, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EditIcon from '@mui/icons-material/Edit';


//koee

const useStyles = makeStyles((theme) => ({
    root: {
        minHeight: 500,
        fontFamily: ['rubik', 'sans-serif'].join(',')
    },
    box: {
        backgroundColor: "#CFDBD5",
        marginBottom: 20,
        borderRadius: 5,
        minHeight: 450,
        marginTop: 15,
        margin: 'auto',
        fontFamily: ['rubik', 'sans-serif'].join(','),
        fontSize:18
    },
    action: {
        minHeight: 50,
    },
    functionicon: {
        cursor: 'pointer',
    },
}));

const UserDetail = ({props}) => {
    const classes = useStyles();
    const [user, setUser] = useState({
        "userID" : "USR1001",
        "userName": "Mahiaddin Give Koee Money",
        "userEmail": "mahiaddinIsMyUncle@malaysia.gov.my",
        // This should do some calculation on how many help msg the user send
        "helpMessage": 1,
        "userType": "Vendor",
        "userPhone": "+60123456789",
        "status" : "Inactive",
        "verified" : false,
    });

    const [editing,setEditing] = useState(false);
    //Remember to update database also.
    const changeStatus = () => {
        if(user.userType==="Vendor"){
            if(user.status === "Inactive" && user.verified){
                setUser({...user, status:"Active"});
                return;
            }
            else if(user.status === "Active"){
                setUser({...user, status:"Inactive"});
                return;
            }
            alert("Vendor should be verified first only they can be set active.");
            
        }
        else{
            if(user.status === "Inactive"){
                setUser({...user, status:"Active"});
                return;
            }
            else if(user.status === "Active"){
                setUser({...user, status:"Inactive"});
            }
        }
        
        
    };

    const handleChangeUserName = (event) => {
        setUser({...user, userName: event.target.value})
    }

    const handleChangeUserEmail = (event) => {
        setUser({...user, userEmail: event.target.value})
    }
    const handleChangeUserPhone = (event) => {
        setUser({...user, userPhone: event.target.value})
    }

    return (
        <Container className={classes.root}>
            {/* Top part */}
            <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                <Grid item xs={12} className={classes.action} container>
                    <Grid item xs={4}>
                        <Tooltip title="Back">
                            {/* Should change it to Link after having the router setting */}
                            <IconButton  href="/helpdesks">
                                <ArrowBackIcon fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                    <Grid item xs={4} textAlign="center" style={{fontSize:20}}>
                        User ID: {user.userID}
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                        <Tooltip title="Edit User">
                            {/* Set onclick edit here  with props*/}
                            <IconButton onClick={() => setEditing(!editing)}>
                                <EditIcon className={classes.functionicon} fontSize="large" />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete User">
                            {/* Set onclick delete here, *create a delete function* */}
                            <IconButton>
                                <DeleteIcon className={classes.functionicon} fontSize="large" />
                            </IconButton>
                        </Tooltip>
                    </Grid>
                </Grid>
            </Grid>
            {/* Body container */}
            <Box sx={{width:'90%'}} className={classes.box}>
                <Grid container spacing={3} direction="column">
                    <Grid item xs={12} container>
                        <Grid item xs={12} sm={4} container style={{textAlign:'center'}}>
                            <Grid item xs={12} >
                                Profile Picture
                            </Grid>
                            <Grid item xs={12}>
                                <img 
                                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8f/Example_image.svg/600px-Example_image.svg.png"
                                    alt="logo"
                                    style={{marginTop: 10,minHeight: 150, maxWidth:150}}
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginTop:10}}>
                                Status
                            </Grid>
                            {!editing ?
                                (<Grid item xs={12} style={user.status === "Inactive" ? ({color: "red"}) : ({color: "green"})}>
                                    {user.status}
                                </Grid>) 
                                : 
                                (<Grid item xs={12} style={user.status === "Inactive" ? ({color: "red"}) : ({color: "green"})}>                                    
                                    <Tooltip title="Change status">
                                        <IconButton onClick={()=>changeStatus()}>
                                            <ChangeCircleIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {user.status}
                                </Grid>)
                            }
                            <Grid item xs={12} style={{marginTop: 20}} container>
                                <Grid item xs={5} style={{textAlign:'right', fontWeight: 'bold'}}>
                                    Role:    
                                </Grid>
                                <Grid item xs={1}/>
                                <Grid item xs={6} style={{textAlign:'left'}}>
                                    {user.userType}
                                </Grid>
                                
                            </Grid>
                            {/* Edit last update function here */}
                            <Grid item xs={12} style={{marginTop:20}}>
                                Last Update:
                            </Grid>
                            <Grid item xs={12} style={{marginTop:10}}>
                                5/9/21 16:32
                            </Grid>
                            <Grid item xs={12} style={{marginTop:10}}>
                                By who..
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={7} container>
                            <Grid item xs={12} container>
                                {/* username */}
                                <Grid item xs={12} container>
                                    <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                        User Name: 
                                    </Grid>
                                    {!editing ?
                                        (
                                            <Grid item xs={9} textAlign="left">
                                                {user.userName}
                                            </Grid>
                                        )
                                        :
                                        (
                                            <Grid item xs={9} textAlign="left">
                                                <TextField 
                                                    id="userName" 
                                                    variant="outlined"
                                                    onChange={handleChangeUserName}
                                                    defaultValue={user.userName}
                                                    margin="dense"
                                                    fullWidth
                                                    size="small"
                                                    InputProps={{
                                                        style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                    }} 
                                                />
                                            </Grid>   
                                        )
                                    }
                                    
                                </Grid>
                                <Grid item xs={12} container>
                                    <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                        Email: 
                                    </Grid>
                                    {!editing ?
                                        (
                                            <Grid item xs={9} textAlign="left">
                                                {user.userEmail}
                                            </Grid>
                                        )
                                        :
                                        (
                                            <Grid item xs={9} textAlign="left">
                                                <TextField 
                                                    id="user_email" 
                                                    variant="outlined"
                                                    onChange={handleChangeUserEmail}
                                                    defaultValue={user.userEmail}
                                                    margin="dense"
                                                    fullWidth
                                                    size="small"
                                                    InputProps={{
                                                        style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                    }} 
                                                />
                                            </Grid>   
                                        )
                                    }
                                    
                                </Grid>
                                <Grid item xs={12} container>
                                    <Grid item xs={3} style={!editing ? ({fontWeight: 'bold'}) : ({fontWeight: 'bold', marginTop: 13}) }>
                                        Phone Number: 
                                    </Grid>
                                    {!editing ?
                                        (
                                            <Grid item xs={9} textAlign="left">
                                                {user.userPhone}
                                            </Grid>
                                        )
                                        :
                                        (
                                            <Grid item xs={9} textAlign="left">
                                                <TextField 
                                                    id="user_phone" 
                                                    variant="outlined"
                                                    onChange={handleChangeUserPhone}
                                                    defaultValue={user.userPhone}
                                                    margin="dense"
                                                    fullWidth
                                                    size="small"
                                                    InputProps={{
                                                        style: {fontFamily: ['rubik', 'sans-serif'].join(','),}
                                                    }} 
                                                />
                                            </Grid>   
                                        )
                                    }
                                    
                                </Grid>
                                {user.userType==="Vendor" ? 
                                    (  
                                        <Grid item xs={12} container>
                                            <Grid item xs={3} style={{fontWeight: 'bold'}} >
                                                Verified Status: 
                                            </Grid>
                                            <Grid item xs={9} textAlign="left">
                                                {user.verified? "Verified" : "Not Verified"}
                                            </Grid>
                                            <Grid item xs={12}>
                                                {user.verified? null : (<Button onClick={()=>setUser({...user, verified: true})} variant="text">Click Here To Verify Account</Button>)}
                                            </Grid> 
                                            
                                        </Grid>
                                    )
                                    :
                                    (
                                        null
                                    )
                                }
                                    
                            </Grid>    
                        </Grid>
                        <Grid item xs={12} sm={1} />
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

export default UserDetail