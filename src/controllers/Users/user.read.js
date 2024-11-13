import usersManager from "../../Manager/UserManager.js";

export const readUser = async (req, res) => {
  try {
    const users = await usersManager.readUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
