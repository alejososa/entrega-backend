import { usersService } from "../services/users.services.js";


class UsersControllers{
    async findUser(req,res){
        const {username}= req.params
        try {
            const user= await usersService.findUser(username);
            res.status(200).json({message:"success", user});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async findById(req,res){
        const {userid}= req.params;
        try {
            const user = await usersService.findById(userid);
            res.status(200).json({message:"success", user});
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

    async createUser(req,res){
        const{first_name, last_name, email, password}= req.body;
        if(!first_name || !last_name || !email || !password){
            return res.status(400).json({message:"Some data is missing"});
        }
        try {
            const createdUser= await usersService.createOne(req.body);
            res.status(200).json({message:"User created", createdUser})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }

    async deleteUser(req,res){
        const{username}=req.params;
        try {
            const deletedUser = await usersService.deleteOne(username)
            res.status(200).json({message: "User deleted"})
        } catch (error) {
            res.status(500).json({message: error.message})
        }
    }
}

export const usersControllers = new UsersControllers();