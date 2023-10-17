import { Router} from "express";
import { usersManager } from "../persistencia/DAOs/managers/users/userManager.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {jwtValidation} from "../middlewares/jwt.middlewares.js"
const router = Router()

router.get("/:username",jwtValidation,authMiddleware(['admin','clietn',"premium"]), async(req,res)=>{
    const {username}= req.params
    try {
        const user= await usersManager.findUser(username);
        if(!username)return res.status(400).json({message: "user not exist"})
        res.status(200).json({message:"user founded", user})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})

router.delete('/:username',jwtValidation,authMiddleware('admin'), async(req,res)=>{
    const {username}= req.params
    try {
        const userDeleted = await usersManager.deleteUser(username)
        if(!userDeleted) res.status(400).json({message: "user not exist"})
        res.status(200).json({message:"User deleted", userDeleted})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})


export default router;
