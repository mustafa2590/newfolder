import { useState, useContext, createContext } from "react"

const UserContext = createContext(  )

export const useLogin = ()=> useContext( UserContext )

export const UserContextProvider = ( { children } ) => {
    // We will use this boolean to track whether or not someone is logged in.
    // This can be manipulated with the dev tools. However, all pages that we wish to hide from people that aren't logged in require credential when making the API requests. So even if they try to hack it they will won't be able to see anything that they shouldn't.
    const [ isLoggedIn, setIsLoggedIn ] = useState( false )
    // (Ariella's notes) I added loggedInData to remember logged in user's info
    const [loggedInData, setLoggedInData] = useState({})
    const login = () => {
        setIsLoggedIn( true )
    }

    const logout = () => {
        setIsLoggedIn( false )
        setLoggedInData(null)
    }



    return(
        <UserContext.Provider value={{ isLoggedIn, loggedInData, setLoggedInData, login, logout }}>
            { children }
        </UserContext.Provider>
    )
}