import {CustomError} from '../utils/error.custom.js'

class BaseService {
    constructor(dao) {
        this.dao = dao;
    }

    async getAll() {
        try {
            const items = await this.dao.getAll();
            if (items.length === 0) throw new CustomError('No items found', 404);
            return items;
        } catch (error) {
            throw error;
        }
    }

    async getById(id) {
        try {
            const item = await this.dao.getById(id);
            if (!item) throw new CustomError(`Item with ID: ${id} not found`, 404);
            return item;
        } catch (error) {
            throw error;
        }
    }

    async create(obj) {
        try {
            const newItem = await this.dao.create(obj);
            if (!newItem) throw new CustomError('Error creating item', 400);
            return {
                message: `Created item`,
                item: newItem
            };
        } catch (error) {
            throw error;
        }
    }

    async update(id, obj) {
        try {
            const updatedItem = await this.dao.update(id, obj);
            if (!updatedItem) throw new CustomError(`Error updating item with ID: ${id}`, 400);
            return {
                message: `Updated item`,
                item: updatedItem
            };
        } catch (error) {
            throw error;
        }
    }

    async delete(id) {
        try {
            const deletedItem = await this.dao.delete(id);
            if (!deletedItem) throw new CustomError(`Error deleting item with ID: ${id}, item not found`, 400);
            return {
                message: `Deleted item`,
                item: deletedItem
            };
        } catch (error) {
            throw error;
        }
    }
}

export default BaseService;