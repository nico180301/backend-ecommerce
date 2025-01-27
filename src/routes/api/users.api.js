import { Router } from "express";
<<<<<<< HEAD
import uploader from "../../middlewares/multer.mid.js";
import { createUser, readUser, readUserId, updateUser, deleteUser } from "../../controllers/index.js";

const usersRouter = Router();

usersRouter.post("/", uploader.single("photo"),createUser);

usersRouter.get("/", readUser);

usersRouter.get("/:uid", readUserId);
=======
//import uploader from "../../middlewares/multer.mid.js";
import {  readUser, readUserById, updateUser, deleteUser } from "../../controllers/index.js";

const usersRouter = Router();

//usersRouter.post("/", uploader.single("photo"),createUser);

usersRouter.get("/", readUser);

usersRouter.get("/:uid", readUserById);
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd

usersRouter.put("/:uid", updateUser);

usersRouter.delete("/:id", deleteUser);

export default usersRouter;
