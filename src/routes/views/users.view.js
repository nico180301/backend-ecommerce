import { Router } from "express";
<<<<<<< HEAD
import { readUser, readUserId } from "../../controllers/index.js";
=======
import { readUser, readUserById } from "../../controllers/index.js";
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd

const usersRouter = Router();

usersRouter.get("/", async(req,res,next)=>{
    try {
        const users = await readUser();
        return res.render("users",{users});
    } catch (error) {
        return next(error)
    }
});

usersRouter.get("/login", async(req,res,next)=>{
    try {
        const users = await readUser();
        return res.render("loginUser", {users})
    } catch (error) {
        return next(error)
    }
});

usersRouter.get("/register", async(req,res,next)=>{
    try {
        const users= await readUser();
        return res.render("register", {users})
    } catch (error) {
        return next(error)
    }
});

usersRouter.get("/:uid", async(req,res,next)=>{
    try {
        const {uid} = req.params
<<<<<<< HEAD
        const one= await readUserId(uid);
=======
        const one= await readUserById(uid);
>>>>>>> cb7667791fc38662d1a7bc084a9f9bed63dcf0fd
        return res.render("userdatails", {user: one})
    } catch (error) {
        return next(error)
    }
});


export default usersRouter;