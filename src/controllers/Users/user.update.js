import usersManager from "../../Manager/UserManager.js";

export const updateUser = async (req, res) => {
  try {
    const { uid } = req.params;
    const userUpd = await usersManager.updateUser(uid, req.body);
    res.status(200).json(userUpd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
