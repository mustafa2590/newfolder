import { useState, useEffect } from "react"
import {useParams, Link, useNavigate} from 'react-router-dom'
import { useLogin } from "../context/userContext"
import { deleteProduct, getAllProducts } from "../services/product.service"

export const Store_page = ({users, products, setProducts}) => {
    const {id} = useParams()
    const [user, setUser] = useState(null)
    const [userProducts, setUserProducts] = useState(null)
    const navigate = useNavigate()
    const { isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()

    useEffect(()=> {
        if (!user) {
            setUser(users.find((one)=> one._id == id))
        }
    }, [user])

    useEffect(()=> {
        if (user) {
            setUserProducts(products.filter((one)=> one.creator_id == id))
        }
    }, [user, products])

    function removeProduct(id) {
        deleteProduct(id)
        .then(()=> {
            fetchProducts()
        })
    }

    const fetchProducts = async()=> {
            try {
                const all = await getAllProducts()
                setProducts(all)
            }
            catch (err) {
            console.log("fetch product err", err)
            }  
        }

    return (
        <div>
            {!user? <p>Loading</p>:
            <div>
                <div className="title">
                    <h1>{user.fname}'s Store</h1>
                    {loggedInData._id == user._id && <Link to={`/product/new`} className="add-product">Add product</Link>}
                </div>
                <div className="home-con">
                {!userProducts? <p>None yet</p>:
                userProducts.map((one, index)=> (
                    <div className="product" key={index}>
                        <Link to = {`/product/${one._id}`} ><img src={ one.pic1?`${one.pic1}`: '/no-pic.jpg'} height="150" width="150"></img></Link>
                        <div>
                            <h2>{one.name}</h2>
                            <p>${one.price}</p>
                            <div className="cmd-btns">
                                <button onClick= {()=>{navigate(`/product/${one._id}`)}} className='btn3 view'>View</button>
                                { loggedInData._id == user._id && 
                                <><button onClick= {()=>{navigate(`/product/${one._id}/edit`)}} className='btn3 edit'>Edit</button>
                                <button onClick={()=> {removeProduct(one._id)}} className='btn3 delete'>Delete</button>
                                </>}
                            </div>
                        </div>
                    </div>
                ))}
                </div>
            </div>
            }
            
        </div>
    )

}