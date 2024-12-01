import usersManager from "../../Manager/UserManager.js";

export const readUserId = async (req, res) => {
  try {
    const { uid } = req.params;
    const user = await usersManager.readUserId(uid);
    res.status(200).json({ uid: user.id, email: user.email });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
