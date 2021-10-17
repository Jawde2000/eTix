import React from 'react'
import Header from './Header'
import NavBar from './NavBar'
import {useDispatch, useSelector} from 'react-redux'


function Topbar() {
    // const [token, setToken] = useCookies(['mytoken'])
    const userLogin = useSelector(state => state.userLogin)
    const {error, loading, userInfo} = userLogin
    const dispatch = useDispatch()
    
    return (
        <div>
            {userInfo?
                <Header /> : null
            }
            <NavBar />
        </div>
    )
}


export default Topbar
