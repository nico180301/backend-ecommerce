import usersManager from "../../daos/fs/Manager/UserManager.js";

export const createUser = async (req, res) => {
  try {
    const user = await usersManager.createUser(req.body);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
