import React from 'react'
import Header from './Header'
import NavBar from './NavBar'
import {useSelector} from 'react-redux'


function Topbar() {
    // const [token, setToken] = useCookies(['mytoken'])
    const userLogin = useSelector(state => state.userLogin)
    const { userInfo} = userLogin
    
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
