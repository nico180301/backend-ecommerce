//import usersManager from "../../daos/fs/Manager/UserManager.js";
import { userService } from "../../services/user.service.js";
export const readUser = async (req, res) => {
  try {
    const users = await userService.readUser();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
