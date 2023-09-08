import { Router } from "express";
import userModel from "../db/models/users.model.js";
const router = Router();


router.post('/register', async (req, res) => {

    const result = await userModel.create(req.body);
    res.send({ status: "success", payload: result });
    
    
})
router.post("/login", async (req, res) => {
    const { email, password } = req.body
    //1!!!! buscar usuario
    const user = await userModel.findOne({ email, password });
    //si no existe     
    if(!user)return res.status(400).send({status:"error",error:"nombre de usuario y contraseña incorrecta"})
    //si existe, le creo un session
    req.session.user = {
        //elijo que guardar
        name: `${user.first_name}`,
        email: user.email
    }
    res.send({status:"success", payload:user});
})

router.get('/logout', (req,res)=>{
    req.session.destroy(err =>{
        if(err) return res.status(500).send({status:"error", error:"No pudo cerrar sesion"})
        res.redirect('/login');
    })
})

export default router;
