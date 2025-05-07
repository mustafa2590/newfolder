import { useState, useEffect } from "react"
import {useParams, Link, useNavigate} from 'react-router-dom'
import { useLogin } from '../context/userContext'
import { updateUserHistory } from "../services/user.service"
import { updateStock } from "../services/product.service"
import { getAllUsers } from '../services/user.service'
import { ProductCarousel } from "./carousel"

export const Product_page = ({products, users, setUsers}) => {
const {id} = useParams()
const [product, setProduct] = useState(null)
const [popup, setPopup] = useState(false)
const navigate = useNavigate()
const { isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()
const [quantity, setQuantity] = useState(1)

useEffect(()=> {
    if (!product) {
        setProduct(products.find((one)=> one._id == id))
    }
}, [product])

// saves purchase info to user model. saves decreased stock number to product model. Fetches all users again.
async function purchaseProduct(e) {
    e.preventDefault()
    console.log("purchasing", e.target.quantity.value, "items")
    console.log("user id", loggedInData._id)
    const data ={userId: loggedInData._id, _id: id, quantity: e.target.quantity.value, date: new Date()}
    console.log("data", data)
    updateUserHistory({userId: loggedInData._id, _id: id, quantity: e.target.quantity.value, date: new Date()})
    // console.log("decrease", product.stock-1)
    const newStock = product.stock-1
    updateStock({ id: id, stock: newStock})
    const fetchUsers = async()=> {
        try {
            const all = await getAllUsers()
            console.log("all users", all)
            setUsers(all)
        }
        catch (err) {
            console.log("fetch user err", err)
            }
    }
    // await makes sure state is set before it navigates and renders the profile!
    await fetchUsers()
    navigate(`/profile/${loggedInData._id}`)
}

function handleChange(e){
    setQuantity(e.target.value)
}


    return (
        <>
        {!product? <p>Loading</p>:
            (<div className="product-con">
                {popup &&(
                <div className="overlay">
                    <div className="popup">
                        <> 
                        {!isLoggedIn || !loggedInData?
                        <div>
                            <p>Please login to purchase.</p>
                            <button onClick={()=>{setPopup(false)}}>Okay</button>
                        </div>: product.stock == 0?
                        <div>
                        <p>Out of Stock</p>
                        <button onClick={()=>{setPopup(false)}}>Okay</button>
                    </div>:
                        <>
                        <h2>Purchase</h2>
                        <form onSubmit={purchaseProduct}>    
                        <label htmlFor="quantity">Select quantity ({product.stock} in stock)</label>
                        <input type="number" name="quantity" min="1" max={product.stock} placeholder="1" value={quantity} onChange={handleChange} />
                        <div className="btns">
                            <input type="submit" value="Purchase" />
                            <button onClick={()=>{ setPopup(false)}}>Cancel</button>
                        </div>
                        </form>
                        </>}
                        </>
                    </div>
                </div>
                )}
                {
                    !product.pic1? <img src={'/no-pic.jpg'} width="300"></img>:
                    !product.pic2? <img src={`${product.pic1}`} width="300"></img>:
                    <ProductCarousel pic1={product.pic1} pic2 ={product.pic2}/>
                }
            <div className="info">
                <h1>{product.name}</h1>
                <p className="bold">${product.price}</p>
                <p>{product.description}</p>
                {    product.stock < 1 ?
                    <button disabled className="out-of-stock buy-btn" >Out of stock</button>:
                    <button onClick={()=> {setPopup(true)}} className="buy-btn">Purchase</button>
                }
                <Link to={`/store/${product.creator_id}`}>Seller's Other Products</Link>
                <div className="line">
                    <p className="bold">Color: {product.color}</p>
                    <p className="bold">Category: {product.category}</p>
                </div>
            </div>
        </div>
        )}
    </>
    )

}