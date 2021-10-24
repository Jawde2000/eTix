import React, {useState, useEffect} from 'react'
import { Grid, Container, Box, Tooltip, IconButton, TextField, Button} from '@mui/material';
import {makeStyles} from '@mui/styles';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ChangeCircleIcon from '@mui/icons-material/ChangeCircle';
import EditIcon from '@mui/icons-material/Edit';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUser } from '../../actions/userActions';
import CircularProgress from '@mui/material/CircularProgress';



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
    const { id } = useParams();

    const dispatch = useDispatch();
    
    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin
    
    let history = useHistory()
    
    const userDetail = useSelector(state => state.userDetail)
    
    const {loading, userD} = userDetail
    
    const [user, setUser] = useState();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [isActive, setIsActive] = useState();
    const [role , setRole] = useState("");


    useEffect(() => {
        if(!userD || userD.userID !== id){
            dispatch(getUser(id))
        }else{
            setUser(userD)
            setRole(userD.is_customer? "Customer" : userD.is_vendor? "Vendor" : userD.is_superuser? "Admin" : "");
            setUsername(userD.username);
            setEmail(userD.email);
            setIsActive(userD.is_active);
        }
    }, [userD, id,])
    
    

    const [editing,setEditing] = useState(false);
    //Remember to update database also.
    const changeStatus = () => {
        if(role==="Vendor"){
            if(isActive && user.verified){
                setUser({...user, is_active: isActive});
                setIsActive(!isActive)
                return;
            }
            else if(!isActive){
                setUser({...user, is_active: isActive});
                setIsActive(!isActive)
                return;
            }
            alert("Vendor should be verified first only they can be set active.");
            
        }
        else{
            if(isActive){
                setUser({...user, is_active:isActive});
                setIsActive(!isActive)
                return;
            }
            else if(!isActive){
                setUser({...user, is_active:isActive});
                setIsActive(!isActive)
            }
        }
        
        
    };

    const handleChangeUserName = (event) => {
        setUser({...user, username: event.target.value});
        setUsername(event.target.value);
    }

    const handleChangeUserEmail = (event) => {
        setUser({...user, email: event.target.value})
        setEmail(event.target.value);
    }
    const handleChangeUserPhone = (event) => {
        setUser({...user, userPhone: event.target.value})
    }

    return (
        <Container className={classes.root}>
            {console.log(user)}
            {!user? 
                <Box sx={{ display: 'flex' }}>
                    <CircularProgress />
                </Box>
                :
                <>
                    <Grid container spacing={3} direction="column" style={{marginTop: 10}}>
                        <Grid item xs={12} className={classes.action} container>
                            <Grid item xs={4}>
                                <Tooltip title="Back">
                                    <Link to="/menu/users/">
                                        <IconButton>
                                            <ArrowBackIcon fontSize="large" />
                                        </IconButton>
                                    </Link>
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
                                        (<Grid item xs={12} style={!isActive? ({color: "red"}) : ({color: "green"})}>
                                            {isActive? "Active" : "Inactive"}
                                        </Grid>) 
                                        : 
                                        (<Grid item xs={12} style={!isActive? ({color: "red"}) : ({color: "green"})}>                                    
                                            <Tooltip title="Change status">
                                                <IconButton onClick={()=>changeStatus()}>
                                                    <ChangeCircleIcon />
                                                </IconButton>
                                            </Tooltip>
                                            {isActive? "Active" : "Inactive"}
                                        </Grid>)
                                    }
                                    <Grid item xs={12} style={{marginTop: 20}} container>
                                        <Grid item xs={5} style={{textAlign:'right', fontWeight: 'bold'}}>
                                            Role:    
                                        </Grid>
                                        <Grid item xs={1}/>
                                        <Grid item xs={6} style={{textAlign:'left'}}>
                                            {role}
                                        </Grid>
                                        
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
                                                        {username}
                                                    </Grid>
                                                )
                                                :
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="userName" 
                                                            variant="outlined"
                                                            onChange={handleChangeUserName}
                                                            defaultValue={username}
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
                                                        {email}
                                                    </Grid>
                                                )
                                                :
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="user_email" 
                                                            variant="outlined"
                                                            onChange={handleChangeUserEmail}
                                                            defaultValue={email}
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
                                                    <Grid item xs={9} textAlign="left">\
                                                        {/* userphone */}
                                                    </Grid>
                                                )
                                                :
                                                (
                                                    <Grid item xs={9} textAlign="left">
                                                        <TextField 
                                                            id="user_phone" 
                                                            variant="outlined"
                                                            onChange={handleChangeUserPhone}
                                                            // defaultValue={userPhone}
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
                                                        {user.is_active? "Verified" : "Not Verified"}
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                        {user.is_active? null : (<Button onClick={()=>setUser({...user, verified: true})} variant="text">Click Here To Verify Account</Button>)}
                                                    </Grid> 
                                                    
                                                </Grid>
                                            )
                                            :
                                            (
                                                null
                                            )
                                        }
                                        {role==="Admin"? 
                                            null
                                            :
                                            <Grid item xs={12} container>
                                                <Grid item xs={3} style={{fontWeight: 'bold'}}>
                                                    Help Messages: 
                                                </Grid>
                                                <Grid item xs={9} style={{textAlign: 'left'}}>
                                                    {user.helpMessage}
                                                </Grid>
                                                <Grid item xs={12}>
                                                    {user.helpMessage>0?(<Button href="http://localhost:5000/helpdesk" variant="text">Click Here To View all Message</Button>):null}
                                                </Grid>
                                            </Grid>    
                                        }
                                        
                                    </Grid>    
                                </Grid>
                                <Grid item xs={12} sm={1} />
                            </Grid>
                        </Grid>
                    </Box>
                </>
            }
        </Container>
            
    )
}

export default UserDetail