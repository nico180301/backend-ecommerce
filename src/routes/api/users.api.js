import { Router } from "express";
import usersManager from "../../Manager/UserManager.js";

const userRouter = Router();

userRouter.post("/", async (req, res) => {
  try {
    const user = await usersManager.createUser(req.body);
    res.status(201).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.get("/", async (req, res) => {
  try {
    const users = await usersManager.readUsers();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await usersManager.readUserId(id);
    res.status(200).json({ id: user.id, email: user.email });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

userRouter.put("/:uid", async (req, res) => {
  try {
    const { uid } = req.params;
    const userUpd = await usersManager.updateUser(req.body, uid);
    res.status(200).json(userUpd);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

userRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const userDel = await usersManager.deleteUser(id);
    res.status(200).json({ message: `User id: ${userDel.id} deleted ok` });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export default userRouter;
