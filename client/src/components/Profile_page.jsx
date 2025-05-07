import { useState, useEffect } from "react"
import {useParams, Link, useNavigate} from 'react-router-dom'
import { useLogin } from "../context/userContext"


export const Profile_page = ({users, products}) => {
    const [user, setUser] = useState(null)
    const {id} = useParams()
    const [purchases, setPurchases] = useState(null)
    const { isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()
    const navigate = useNavigate()


    useEffect(()=> {
        if (loggedInData._id == id) {
            if (!user) {
                async function getUser(){
                const oneUser = await users.find((one)=> (one._id == id))
                setUser(oneUser)
                }
                getUser()
            }
        }
        else {
            navigate("/")
        }
    }, [user])

    useEffect(() => {
        if (user) {
            console.log("profile setting purchases");
            const enrichedPurchases = user.purchases.map(purchase => {
            const product = products.find(prod => prod._id === purchase._id);
            if (!product) return null; // Handle missing product gracefully
            return {
                ...product,
            quantity: purchase.quantity,
            date: purchase.date
            };
          }).filter(p => p !== null); // Remove nulls if any products are missing

            setPurchases(enrichedPurchases);
        }
        }, [user, products]);


    return (
    <>
        {!user? <p>loading</p>:
            <div className="profile-con">
                <div className="banner">
                </div>
                <div className="con">
                    <div className="one">
                        <h1>{loggedInData.fname}'s Profile</h1>
                        <div className="box1">
                            <h2>Purchase History</h2>
                            {!purchases || purchases.length == 0 ? <p>None yet</p>:
                            purchases.map((one, index)=> (
                                <div className="purchase" key={index}>
                                    <Link to={`/product/${one._id}`}><img src={ one.pic1? `${one.pic1}`: '/no-pic.jpg'} alt="pic" height="100px"></img></Link>
                                    <div className="infos">
                                        <div className="row1">
                                            <Link className="bold" to={`/product/${one._id}`}>{one.name}</Link>
                                            <p>Quantity: {one.quantity}</p>
                                        </div>
                                        <p className="date-purchased">Purchased {new Date(one.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'})}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="two">
                        <div className="btn-space">
                            <Link to={`/store/${user._id}`} className="btn3 edit" id="wide">Visit Store</Link>
                        </div>
                        <div className="box2">
                            <h2>Store Stats</h2>
                            <p>0 products</p>
                            <p>0 sold</p>
                        </div>
                    </div>
                </div>
                
            </div>
        
        }
        </>
    )
    
}