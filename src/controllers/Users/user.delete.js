import usersManager from "../../daos/fs/Manager/UserManager.js";

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userDel = await usersManager.deleteUser(id);
    res.status(200).json({ message: `User id: ${userDel.id} deleted ok` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
