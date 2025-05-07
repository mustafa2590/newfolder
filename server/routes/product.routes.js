import { Router } from "express"
import { createProduct, getProducts, deleteProduct, updateProduct ,getProductsByCategory,updateStock} from "../controllers/product.controller.js"

const productRouter = Router()

// routes
productRouter.route('/all')
    .get( getProducts )

productRouter.route('/')
    .post( createProduct )
    .put (updateProduct)
    .delete (deleteProduct)

// filter or search for products based on category
productRouter.route('/category/:category')
    .get(getProductsByCategory);

//decrease number of stock after purchase happen
productRouter.route('/:id')
    .patch(updateStock)

export default productRouter
