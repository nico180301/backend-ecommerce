import { Schema, model } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import { v4 as uuidv4 } from "uuid";

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    minlength: [3, "Name must be at least 3 characters long"],
  },
  photo:{
    type: String,
    required: [true, "Product photo is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price must be a positive value"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Stock must be a positive value"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },
  item_code: {
    type: String,
    unique: true,
    default: uuidv4(),
  },
});

// plugin de paginación 
productSchema.plugin(mongoosePaginate); 
// Manejador de duplicados
productSchema.pre('save', async function (next) { 
  const product = this; 
  if (!product.isNew) return next(); 
  let isUnique = false; 
  while (!isUnique) { 
    product.item_code = uuidv4(); 
    const existingProduct = await model('product').findOne({ item_code: product.item_code }); 
    if (!existingProduct) isUnique = true; 
  } 
  next(); 
});

export const prodModel = model("product", productSchema);
