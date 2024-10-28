import { Router } from "express";
import usersManager from "../../Managers/UsersManager.js";

const userRouter = Router()

userRouter.get("/", async (req, res) => {
    try {
      const users = await usersManager.getUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  userRouter.get("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const user = await usersManager.getUserById(id);
      res.status(200).json({ id: user.id, email: user.email });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  });
  
  userRouter.post("/", async (req, res) => {
    try {
      const user = await usersManager.createUser(req.body);
      res.status(201).json({ id: user.id, email: user.email });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  userRouter.post("/upload-file", async (req, res) => {
    try {
      console.log(req.file);
      const userBody = req.body
      userBody.profile = req.file.filename
      const user = await usersManager.createUser(userBody);
      res.status(201).json(user);
    } catch (error) {
      console.log(error)
      res.status(500).json({ message: error.message });
    }
  });
  
  userRouter.delete("/", async (req, res) => {
    try {
      await usersManager.deleteUsers();
      res.json({ message: "users deleted ok" });
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
  
  userRouter.put("/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const userUpd = await usersManager.updateUser(req.body, id);
      res.status(200).json(userUpd);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  
export default userRouter