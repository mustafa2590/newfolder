import { useState, useEffect } from "react"
import {useNavigate, useParams} from 'react-router-dom'
import { useLogin } from "../context/userContext"
import { updateProduct } from "../services/product.service"
import { getAllProducts } from "../services/product.service"


export const Edit_product = ({setProducts, products}) => {
    const {id} = useParams()
    const { login: loginClient, isLoggedIn, logout:userLogout, setLoggedInData, loggedInData } = useLogin()
    const [errors, setErrors] = useState(null)
    const navigate = useNavigate()
    const [data, setData] = useState(null)


    async function addData() {
        const oneProduct =  await products.find((one)=> one._id == id)
        setData(oneProduct)
    }

    useEffect(()=> {
        if (!data) {
            console.log("id", id)
            addData()
        }
    },[])

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

    function editProduct(e) {
        e.preventDefault()
        const {name, price, description, stock, color, size, category, pic1, pic2} = e.target
        const allData = {
            ...data,
            creator_id: loggedInData._id,
        }
        updateProduct(allData)
            .then(() => {
                fetchProducts()
                navigate(`/store/${loggedInData._id}`);
            })
            .catch((err) => {
                console.log("err", err)
                if (err.response?.data?.errors) {
                    setErrors(err.response.data.errors);
                }
            });
    }

    function handleChange(e){
        setData((prev)=>({...prev, [e.target.name]: e.target.value}))
    }

    return (
        <>
        {!data? <p>loading</p>:
            <div className="create-con">
            <form onSubmit={editProduct}>
                <h1>Edit Product</h1>
                <div className="inputs">
                    <div className="input1">
                        {errors?.name && <p className="errors-product">{errors.name}</p>}
                        <input type="text" name="name" id="" placeholder="Product Name" value={data.name} onChange={handleChange}/>
                        {errors?.price && <p className="errors-product">{errors.price}</p>}
                        <input type="number" name="price" id="" placeholder="Price" value={data.price} onChange={handleChange}/>
                        {errors?.description && <p className="errors-product">{errors.description}</p>}
                        <textarea name="description" id="" placeholder="Description" value={data.description} onChange={handleChange}/>
                        {errors?.stock && <p className="errors-product">{errors.stock}</p>}
                        <input type="number" name="stock" id="" min="1" max="500" placeholder="Number in stock" value={data.stock} onChange={handleChange}/>
                    </div>
                    <div className="input2">
                    {errors?.size && <p className="errors-product">{errors.size}</p>}
                        <select name="size" value={data.size} onChange={handleChange}>
                            <option value="">Pick a size</option>
                            <option value="extra-small">Extra-small</option>
                            <option value="small">Small</option>
                            <option value="medium">Medium</option>
                            <option value="large">Large</option>
                            <option value="extra-large">Extra-large</option>
                        </select>
                        {errors?.color && <p className="errors-product">{errors.color}</p>}
                        <select name="color" value={data.color} onChange={handleChange}>
                            <option value="">Pick a color</option>
                            <option value="white">White</option>
                            <option value="black">Black</option>
                            <option value="grey">Grey</option>
                            <option value="red">Red</option>
                            <option value="orange">Orange</option>
                            <option value="yellow">Yellow</option>
                            <option value="green">Green</option>
                            <option value="blue">Blue</option>
                            <option value="purple">Purple</option>
                            <option value="pink">Pink</option>
                            <option value="brown">Brown</option>
                            <option value="tan">Tan</option>
                            <option value="multi-color">Multi-color</option>
                        </select>
                        {errors?.category && <p className="errors-product">{errors.category}</p>}
                        <select name="category" value={data.category} onChange={handleChange}>
                            <option value="">Pick category</option>
                            <option value="clothes">Clothes</option>
                            <option value="accessories">Accessories</option>
                            <option value="beauty&health">Beauty/health</option>
                            <option value="home">Home</option>
                            <option value="kitchen">Kitchen</option>
                            <option value="electronics">Electronics</option>
                            <option value="toys&games">Toys/games</option>
                            <option value="books&media">Books/media</option>
                            <option value="pets">Pets</option>
                            <option value="outdoors">Outdoors</option>
                            <option value="other">Other</option>
                        </select>
                        {errors?.pic1 && <p className="errors-product">{errors.pic1}</p>}
                        <input type="text" name="pic1" id="" placeholder="Image url (optional)" value={data.pic1} onChange={handleChange} />
                        {errors?.pic2 && <p className="errors-product">{errors.pic2}</p>}
                        <input type="text" name="pic2" id="" placeholder="Second image url (optional)" value={data.pic2} onChange={handleChange} />
                    </div>
                </div>
                <div className="form-btns">
                    <input type="submit" value="Update"/>
                    <button type="button" onClick={()=> {navigate(-1)}}>Cancel</button>
                </div>
                
            </form>
                
        </div>}
        </>
    )

}