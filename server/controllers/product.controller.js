import Product from "../models/product.model.js"

// get all products
export const getProducts = async(req, res) => {
    try {
        const products = await Product.find().sort({ timestamp: -1 })
        res.status(200).json(products)
    } catch (error){ res.status(400).json(error) }
}

//create product
export const createProduct = async(req, res) => {
    try {
        const newProduct = await Product.create(req.body)
        res.status(201).json( newProduct )
    } catch (err){ 
        if (err.name === 'ValidationError') {
            // Sends back errors in a flat object
            const errors = {};
            for (const field in err.errors) {
            errors[field] = err.errors[field].message;
            }
            return res.status(400).json({ errors });
        }
        res.status(500).json({ message: 'Server error' });
        }
}
// update product
export const updateProduct = async (req, res) => {
    const options = {
        new: true,
        runValidators: true,
    };
    try {
        const editedProduct = await Product.findByIdAndUpdate(
            req.body._id,
            req.body,
            options
        );
        res.status(200).json(editedProduct);}
        catch (err){ 
            if (err.name === 'ValidationError') {
                // Sends back errors in a flat object
                const errors = {};
                for (const field in err.errors) {
                errors[field] = err.errors[field].message;
                }
                return res.status(400).json({ errors });
            }
            res.status(500).json({ message: 'Server error' });
            }
}

// delete product 
export const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.body._id)
        if (!deletedProduct) {
            return res.status(404).json({ message: 'Product not found.' })
        }
        res.status(200).json(deletedProduct)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
}
// filter or search products by category
export async function getProductsByCategory(req, res) {
    try {
        const all = await Product.find({ category: { $eq: req.params.category } });
        res.status(200).json(all);
    } catch (err) {
        console.log("not a category");
        return res.status(400).json(err);
    }
} 
// update stock handler
export const updateStock = async (req, res) => {
    try {
        const updatedUser = await Product.findByIdAndUpdate(
        req.params.id,
        // this resets the attribute purchases. For testing.
        { $set: { stock: req.body.stock } }
        );
        console.log("changed stock")
    }
        catch (err){ 
            console.log("error", err)
            return res.status(500).json(err);
            }
}


