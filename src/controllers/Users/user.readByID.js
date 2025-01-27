//import usersManager from "../../daos/fs/Manager/UserManager.js";
import { userService } from "../../services/user.service.js";
export const readUserById = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await userService.readUserById(uid);
    res.status(200).json({ uid: user.id, email: user.email });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
