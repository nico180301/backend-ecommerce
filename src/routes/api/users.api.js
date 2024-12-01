import { Router } from "express";
import uploader from "../../middlewares/multer.mid.js";
import { createUser, readUser, readUserId, updateUser, deleteUser } from "../../controllers/index.js";

const usersRouter = Router();

usersRouter.post("/", uploader.single("photo"),createUser);

usersRouter.get("/", readUser);

usersRouter.get("/:uid", readUserId);

usersRouter.put("/:uid", updateUser);

usersRouter.delete("/:id", deleteUser);

export default usersRouter;
