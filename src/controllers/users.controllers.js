import { productsService } from "../services/products.services.js";
import { usersService } from "../services/users.services.js";

export const createUser = async (req, res) => {
    try {
        const newUser = await usersService.createUser(req.body);
        res.status(200).json({user: newUser});
    } catch (error) {
        return res.status(300).send({status: "error"});
    }
};

export const findUser = async (req, res) => {
    const {username} = req.params;
    try {
        const user = await usersService.findUser(username)
        if (user) {
            res.status(200).json({user});
        } else {
            return res.status(201).send({status: "error", message: "Usuario no encontrado"});
        }
    } catch (error) {
        return res.status(300).send({status: "error"});
    }
};

export const deleteUser = async (req, res) => {
    const {username} = req.params;
    try {
        const response = await productsService.deleteUser(username);
        if (response) {
            res.status(200).json({user: response})
        } else {
            return res.status(201).send({status: "error", message: "Usuario no encontrado"});
        }
    } catch (error) {
        return res.status(300).send({status: "error"});
    }
};