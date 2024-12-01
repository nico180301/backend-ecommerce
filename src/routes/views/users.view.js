import { Router } from "express";
import { readUser, readUserId } from "../../controllers/index.js";

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
        const one= await readUserId(uid);
        return res.render("userdatails", {user: one})
    } catch (error) {
        return next(error)
    }
});


export default usersRouter;