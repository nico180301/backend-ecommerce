import BaseService from "./base.service.js";
import { cartDao } from "../daos/mongodb/cart.dao.js";
import { CustomError } from "../utils/error.custom.js";

class CartService extends BaseService{
    constructor(){
        super(cartDao);
    }

    async createCart(cartData){
        try {
            const cart = await this.dao.create(cartData);
            if (!cart) {
                throw new CustomError("Error creating cart",500)
            }
            return cart;
        } catch (error) {
            throw error;
        }
    }
}

export const cartService = new CartService