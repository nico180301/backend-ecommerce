import { Schema, model } from 'mongoose';
import { v4 as uuidv4 } from "uuid";

const cartSchema = new Schema({
    cartId: { type: String, unique: true, default: uuidv4() },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: 'product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                default: 1,
                min: [1, 'Quantity must be at least 1']
            }
        }
    ]
});

export const cartModel = model('cart', cartSchema);
