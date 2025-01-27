//import usersManager from "../../daos/fs/Manager/UserManager.js";
import { userService } from "../../services/user.service.js";
export const createUser = async (req, res) => {
  try {
    const user = await userService.createUser(req.body);
    res.status(201).json({ id: user.id, email: user.email, cartId: user.cartId });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
