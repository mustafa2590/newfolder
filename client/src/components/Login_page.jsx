import { useNavigate } from 'react-router-dom'
import { register, getUser } from '../services/user.service'
import { useState } from 'react'
import { useLogin } from '../context/userContext'
import { loginServer } from '../services/user.service'

export const Login_page = () => {
    const navigate = useNavigate()
    const { login: loginClient, isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()
    const [registerErrors, setRegisterErrors] = useState(null)
    const [loginErrors, setLoginErrors] = useState(null)

const handleRegister = e => {
    e.preventDefault()
    let { fname, lname, email, pw, cpw } = e.target
            fname = fname.value
            lname = lname.value
            email = email.value 
            const password = pw.value
            const confirmPassword = cpw.value 
            register({fname, lname, email, password, confirmPassword, purchases:[], sales:[]}) //cookie/jwt is sent from server when registering
                .then( (res)=>{ 
                    console.log("congrats. you registered")
                    console.log("your id", res.data._id )
                    loginClient() //Now set login to true client side for tracking
                    getUser(res.data._id)
                    .then(data => {
                        console.log("data", data)
                        setLoggedInData(data) // gets logged in user's data.
                    })
                    navigate('/') 
                })
                .catch( error => {
                    console.log("register failed", error)
                    setRegisterErrors( error ) } )
}

const handleLogin = e => {
    e.preventDefault()
    let { email, pw} = e.target
    loginServer( {email: email.value, password: pw.value} )
    .then((res)=>{ 
        loginClient() //Now set login to true client side for tracking
        getUser(res)
        .then(data => {
            setLoggedInData(data) // gets logged in user's data.
        })
        navigate('/') 
    })
    .catch ((error)=> {
        console.log("login err", error)
        setLoginErrors(error)
    })
}


    return(
        <>
        <h1>Shop and Sell in One Place</h1>
        <div className='login-con'>
            <div className='col1'>
                <h2>Login</h2>
                <form onSubmit={handleLogin} className='login-form'>
                    {loginErrors&& <p className='errors'>{loginErrors}</p>}
                    <div className="others">
                        <input type="text" name="email" id="" placeholder='Email Address'/>
                        <input type="password" name="pw" id="" placeholder='Password'/>
                    </div>
                    <div className="login-btn-space">
                        <input type="submit" value="Login" />
                    </div>
                </form>
            </div>
            <div className='col2'>
                <h2>Create Account</h2>
                <form onSubmit={handleRegister} className='login-form'>
                {registerErrors?.fname && <p className='errors'>{registerErrors.fname.message}</p>}
                {registerErrors?.lname && <p className='errors'>{registerErrors.lname.message}</p>}
                {registerErrors?.email && <p className='errors'>{registerErrors.email.message}</p>}
                {registerErrors?.password && <p className='errors'>{registerErrors.password.message}</p>}
                {registerErrors?.confirmPassword && <p className='errors'>{registerErrors.confirmPassword.message}</p>}
                <div className="names">
                    <input type="text" name="fname" id="" placeholder='First Name'/>
                    <input type="text" name="lname" id="" placeholder='Last Name'/>
                </div>
                <div className="others">
                    <input type="text" name="email" id="" placeholder='Email Address'/>
                    <input type="password" name="pw" id="" placeholder='Password' />
                    <input type="password" name="cpw" id="" placeholder='Confirm password' />
                </div>
                <div className='login-btn-space'>
                    <input type="submit" value="Sign-up" />
                </div>
                </form>
            </div>
        </div>
        </>
    )
}