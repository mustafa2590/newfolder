import { useState } from 'react'
import {Route, Routes} from "react-router-dom"
import { Header } from './components/Header'
import {Home_page} from './components/Home_page'
import { Login_page } from './components/Login_page'
import { Profile_page } from './components/Profile_page'
import { Store_page } from './components/Store_page'
import { Add_product } from './components/Add_product'
import { Edit_product } from './components/Edit_product'
import { Product_page } from './components/Product_page'
import './App.css'

function App() {
  
  const[users, setUsers] = useState([])
  const [products, setProducts] = useState(null)
  const [userData, setuserData] = useState([])
  const [userProducts, setUserProducts] = useState([])


  // Stretch goals:
  // fix user's own store products fetching. (doesn't always fetch)
  // Add a photo upload (up to 2 photos)
  // deploy app

  //fix slugs on product page
  // push carousel to main!
  //

  //intergration
  // add:
  // userRouter.route('/:id')
  //     .patch(updateHistory)
  //     .delete (deleteUser)
  //     .put(updateUser)

  // fix quiz validations (empty errors)

  return (
    <> 
      <Header/>
      <Routes>
        <Route path="/" element={<Home_page products={products} setProducts={setProducts} users={users} setUsers={setUsers}/>}/>
        <Route path="/login" element={<Login_page/>}/>
        <Route path="/profile/:id" element={<Profile_page users={users} products={products}/>}/>
        <Route path="/store/:id" element={<Store_page users={users} products={products} setProducts={setProducts}/>}/>
        <Route path="/product/new" element={<Add_product products={products} setProducts={setProducts}/>}/>
        <Route path="/product/:id" element={<Product_page products={products} users={users} setUsers={setUsers}/>}/>
        <Route path="/product/:id/edit" element={<Edit_product products={products} setProducts={setProducts}/>}/>
      </Routes>
    </>

  )
}

export default App
