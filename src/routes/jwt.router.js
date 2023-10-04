import { Router} from "express";
import { usersManager } from "../managers/users/userManager.js";
import { generateToken, compareHashData } from "../utils.js";


const router= Router();


router.post("/login", async (req,res)=>{
    
    try {
        const { username, password } = req.body
        if (!username || !password) {
            return res.status(400).json({ message: 'alguna data is missing' })
        }
        const userDB = await usersManager.findUser(username)
        if (!userDB) {
            return res.status(400).json({ message: 'Signup first' })
        }
        const isPasswordValid = await compareHashData(password, userDB.password)
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Username or Password not valid' })
        }
        const token= generateToken(userDB)
    res.status(200).json({message:"token generated", token})
        console.log(token);
    } catch (error) {
        res.status(500).json({message:error})
    }
   
})
export default router;