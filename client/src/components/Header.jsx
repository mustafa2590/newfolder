import { Link, useNavigate } from 'react-router-dom'
import { useLogin } from '../context/userContext'
import { logout } from '../services/user.service'
import { useEffect } from 'react'
import { getUser } from '../services/user.service'


export const Header = () => {
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()

    const handleLogout = async () => {
        try{
            await logout() //logout server side by clearing cookie/jwt
            userLogout()    //logout client side by toggling boolean
            navigate('/login')
        } catch( error ){
            //  console.error('Logout Failed:', error) 
            }
    }

    return (
        <div className='header'>
            <div className='logo'>
                <img src="/cart.png" alt="cart" height="50" width="50"></img>
                <Link to={`/`}><h1>EZ-Shop</h1></Link>
            </div>
            <div className="links">
                {isLoggedIn && loggedInData &&
                <Link to={`/profile/${loggedInData._id}`} className='profile-link'>Welcome {loggedInData.fname}</Link>}
                <Link to={`/`} className='home-btn'>Home</Link>
                {isLoggedIn? loggedInData &&
                <button onClick={handleLogout} className='login-btn'>Logout</button>:
                <Link to={`/login`} className='login-btn'>Login</Link>
                }
            </div>
        </div>
    )

}