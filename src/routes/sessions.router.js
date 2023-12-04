// este session.router es elq ue el profe farid llamo autentication en sus clases


import Router from "express";
import userModel from "../persistencia/db/models/users.model.js";
import { compareHashData, hashData } from "../utils.js";
import passport from "passport";
import UsersDto from "../persistencia/DTOs/user.dtos.js";

const sessionsRouter = Router();

sessionsRouter.post("/register", async (req, res) => {
    const { first_name, last_name, username, email, password } = req.body;
    // Hash Password
    const hashPassword = await hashData(password);
    const exist = await userModel.findOne({ email });
    if (exist) {
        return res.status(400).send({ status: "error", error: "User already exists" });
    }
    const user = {
        first_name, last_name, email, password: hashPassword
    };
    const result = await userModel.create(user);
    res.send({ status: "success", message: "Succesfully registered" });
});

sessionsRouter.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    
    const user = await userModel.findOne({ email });
    if (!user)
        return res.status(400).send({
            status: "error",
            error: "Invalid data",
        });
    // compara contraseña en caso de existir el usuario
    const isPasswordValid = await compareHashData(password, user.password);
    
    if (!isPasswordValid) {
        return res.status(401).json({ message: "User or password not valid" });
    }
    // Si esta todo piola
    req.session.passport = {
        user: {
            first_name: user.first_name,
            last_name: user.last_name,
            _id: user._id,
            email: user.email,
            username: user.username,
        }
    };
    if (!user) {
        return res.status(400).send({ status: "error", error: "Invalid data" })
    }
    // Validacion para ADMIN
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
        user.role = "ADMIN";
    }
    req.session.passport.user = {
        _id: user._id,
        name: `${user.first_name}${user.last_name}`,
        email: user.email,
        age: user.age,
        role: user.role,
    }
    res.redirect('/api/views');
});

sessionsRouter.get("/logout", (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "Cant close session" });
        res.redirect("/login")
    });
});

// Github
sessionsRouter.get("/github", passport.authenticate("github", { scope: ["user: email"] }))

sessionsRouter.get('/githubcallback', passport.authenticate('github', { failureRedirect: '/login', successRedirect: '/profile' }), async (req, res) => {
    req.session.user = req.user
    res.redirect('/profile')
})

// Ruta Current
sessionsRouter.get("/current", (req, res) => {
    const userDto = new UsersDto(req.session.user);
    res.status(200).json({ user: userDto })
    
});

export default sessionsRouter;