import { Router } from "express";
import uploader from "../../middlewares/multer.mid.js";  // Asegúrate de que este archivo exista
import { createUser, readUser, readUserById, updateUser, deleteUser } from "../../controllers/index.js";

const usersRouter = Router();

usersRouter.post("/", uploader.single("photo"), createUser);

usersRouter.get("/", readUser);

usersRouter.get("/:uid", readUserById);

usersRouter.put("/:uid", updateUser);

usersRouter.delete("/:id", deleteUser);

export default usersRouter;
