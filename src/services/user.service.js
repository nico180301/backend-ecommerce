import BaseService from "./base.service.js";
import { userDao } from "../daos/mongodb/users.dao.js";
import { CustomError } from "../utils/error.custom.js";

class UserService extends BaseService{
    constructor(){
        super(userDao);
    }

    async createUser(userData){
        try {
            const user = await userDao.create(userData);
            if (!user) {
                throw new CustomError("Error creating user", 500);
            };
            return user;
        } catch (error) {
           throw error; 
        }
    }
    async readUser(){
        try {
            const user = await userDao.readAll();
            if (!user) {
                throw new CustomError("Error getting user",500);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
    async readUserById(id){
        try {
            const user = await userDao.readById(id);
            if (!user) {
                throw new CustomError("Error getting user",500);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
    async updateUser(id,userData){
        try {
            const user = await userDao.update(id,userData);
            if (!user) {
                throw new CustomError("Error updating user", 500);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
    async deleteUser(id){
        try {
            const user = await userDao.delete(id);
            if (!user) {
                throw new CustomError("Error deleting user", 500);
            }
            return user;
        } catch (error) {
            throw error;
        }
    }
}

export const userService = new UserService()