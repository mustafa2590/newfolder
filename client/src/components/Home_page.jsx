import { useEffect} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getAllProducts } from '../services/product.service'
import { getAllUsers } from '../services/user.service'
import { getProductsByCategory } from '../services/product.service'

export const Home_page = ({products, setProducts, users, setUsers}) => {
    const navigate = useNavigate()


    useEffect(()=> {
            const fetchProducts = async()=> {
                try {
                    const all = await getAllProducts()
                    console.log("all products", all)
                    setProducts(all)
                }
                catch (err) {
                console.log("fetch product err", err)
                }  
            }
            fetchProducts()
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
            fetchUsers()
        }, [])

        function filterProducts(e) {
                e.preventDefault();
                if (e.target.category.value == "") {
                    getAllProducts()
                    .then((res) => {
                        setProducts(res);
                    });
                } else {
                    getProductsByCategory(e.target.category.value)
                    .then((res) => {
                        setProducts(res);
                    });
                }
            }


    return (
        <>
        <h1>Newest Products</h1>
        <form className='filter' onSubmit={filterProducts}>
            <select name="category">
                <option value="" >All Categories</option>
                <option value="clothes">Clothes</option>
                <option value="accessories">Accessories</option>
                <option value="beauty&health">Beauty/health</option>
                <option value="home">Home</option>
                <option value="electronics">Electronics</option>
                <option value="kitchen">Kitchen</option>
                <option value="toys&games">Toys/games</option>
                <option value="books&media">Books/media</option>
                <option value="pets">Pets</option>
                <option value="outdoors">Outdoors</option>
                <option value="other">Other</option>
            </select>
            <input type="submit" value="Filter"></input>
        </form>
        <div className='home-con'>
            {products&& products.map((one, index)=> (
            <div className="product" key={index}>
                <Link to = {`/product/${one._id}`} ><img src={ one.pic1?`${one.pic1}`: '/no-pic.jpg'}  alt="pic" height="150" width="150"></img></Link>
                <div>
                    <Link to={`/product/${one._id}`}><h2>{one.name}</h2></Link>
                    <p>${one.price}</p>
                    <div className="cmd-btns">
                        <button onClick={()=>{navigate(`/product/${one._id}`)}} className='btn3 view'>View</button>
                    </div>
                </div>
            </div>
            ))}
        </div>
        </>
    )

}