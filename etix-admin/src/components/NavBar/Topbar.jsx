import React from 'react'
import Header from './Header'
import NavBar from './NavBar'
import {useCookies} from 'react-cookie'


function Topbar() {
    const [token, setToken] = useCookies(['mytoken'])
    
    
    return (
        <div>
            {token['mytoken']?
                <Header /> : null
            }
            <NavBar />
        </div>
    )
}


export default Topbar
