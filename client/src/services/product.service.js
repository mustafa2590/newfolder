import axios from 'axios'

const PRODUCT_INSTANCE = axios.create({
    baseURL : 'http://localhost:8000/v1/product',
    withCredentials: true //to send cookie/jwt with each request if available
})

export const createProduct = async (req, res) => {
    try {
        console.log("req", req)
        const RES = await PRODUCT_INSTANCE.post('/', req )
        console.log("RES", RES)
        return RES
    } catch( error ){ throw error }
}

export const getAllProducts = async () => {
    try {
        const RES = await PRODUCT_INSTANCE.get( '/all' )
        console.log("RES", RES.data)
        return RES.data
    } catch( error ){ throw error }
}

export async function getProductsByCategory(req, res) {
    try {
        const RES = await PRODUCT_INSTANCE.get(`/category/${req}`);
        return RES.data;
    } 
    catch (error) {
    throw error;
    }
}

export const updateProduct = async (req, res) => {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const RES = await PRODUCT_INSTANCE.put( '/', req)
        return RES.data}
        catch( error ){ throw error }
}

export const updateStock = async (req, res) => {
    console.log("req.id", req.id)
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const RES = await PRODUCT_INSTANCE.patch( `/${req.id}`, req)
        return RES.data
        }
        catch( error ){ 
            console.log("error", error)
            throw error }
}



export const deleteProduct = async (id) => {
    try {
        const RES = await PRODUCT_INSTANCE.delete( '/', {data: {_id: id} } ) // delete info needs to be wrapped in data
        return RES.data
    } catch( error ){ throw error }
}

