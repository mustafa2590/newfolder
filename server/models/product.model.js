import mongoose from "mongoose"

// Define a schema for our product model
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Product nameis  required!'],
        minLength: [5, `product name must be at least 5 characters!`],
        maxLength: [30, `product name cannnot exceed 30 characters!`],
    },
    creator_id: {
        type: String,
        required: [false]
    },
    pic1:{
        type: String,
        required: [false],
        maxLength: [2048,  `Max length for url cannnot exceed 2048 characters!`],
    },
    pic2:{
        type: String,
        required: [false],
        maxLength: [2048, `Max length for url cannnot exceed 2048 characters!`],
    },
    description: {
        type: String,
        required: true,
        minLength: [5, `Description must be at least 5 characters!`],
        maxLength: [30, `Description cannnot exceed 30 characters!`],
      },
      price: {
        type: Number,
        required: [true, 'Please put your price.'],
        min: [1, 'Price must be at least $1'],
      },
      stock: {
        type: Number,
        required: [true, 'Please type number of your stock.'],
        min: [1, 'Stock must be at least 0'],
      },
      
     category: {
        type: String,
        required: [true,'Please select a Category.'],
        default:'clothes',
        enum:['clothes','accessories','beauty&health', 'home', 'kitchen', 'electronics', 
        'toys&games','books&media','pets', 'outdoors', 'others'],
      },
        color: {
        type: String,
        required: [true, "Please select a color"],
        enum:['white','black','grey','red','orange', 'yellow', 'green', 'blue', 'purple', 'pink', 'brown', 'tan', 'multi-color'],
      },
     size: {
        type:String,
            required: [true,'Please select size'],
            default:'Small',
            enum:['extra-small', 'small','medium','large','extra-large'],
      },
      purchases: {
        type: Array,
        required: [false],
    },
    sales: {
        type: Array,
        required: [false],
    },
}, { timestamps: true });


// Create the product model from the schema
const Product = mongoose.model('Product', productSchema);

export default Product;
