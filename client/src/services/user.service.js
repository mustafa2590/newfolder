import axios from 'axios'

const USER_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/v1/user',
    withCredentials: true //to send cookie/jwt with each request if available
})

export const register = async data => {
    try {
        const RES = await USER_INSTANCE.post('/', data )
        console.log("RES", RES)
        return RES
    } catch( error ){
        console.log("service error", error)
        throw error.response.data.errors }
}

export const loginServer = async data => {
    try {
        const RES = await USER_INSTANCE.post('/login', data )
        return RES.data._id
    } catch( error ){ throw error.response.data }
}

export const logout = async () => {
    try {
        const RES = await USER_INSTANCE.post( '/logout' )
        return RES
    } catch( error ){ throw error }
}


export const getUser = async (id) => {
    try {
        const RES = await USER_INSTANCE.post( '/logins', { _id: id } )
        return RES.data
    } catch( error ){ throw error }
}


export const getAllUsers = async () => {
    try {
        const RES = await USER_INSTANCE.get( '/' )
        return RES.data
    } catch( error ){ throw error }
}

export const updateUserHistory = async (req, res) => {
    console.log("req", req)
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const RES = await USER_INSTANCE.patch( `/${req.userId}`, {_id: req._id, quantity: req.quantity, date: req.date} )
        console.log("success!", RES.data)
        return RES.data
    } 
    catch( error ){
        console.log("error", error)
        throw error.response.data.errors}
}

export const deleteUser = async (id) => {
    try {
        const RES = await USER_INSTANCE.delete( '/all', {data: {_id: id} } ) // delete info needs to be wrapped in data
        return RES.data
    } catch( error ){ throw error }
}