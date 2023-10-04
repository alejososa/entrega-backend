import { Router } from "express";
import userModel from "../db/models/users.model.js";
import passport from "passport";
import { usersManager } from "../managers/users/userManager.js";
import { compareHashData } from "../utils.js";
import { hashData } from "../utils.js";

const router = Router();



router.get("/login", async (req, res) => {
    // const { username, password } = req.body;
    // if (!username || !password) {
    //     return res.status(400).json({ message: "complete all fields" })
    // }

    // req.session["username"] = username
    // //por cuestiones de seguridad no se guarda el password en las session
    // //req.session["password"]=password
    // console.log(req);
    // res.send("probando session")
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

    req.session['username'] = username
    res.status(200).json({ message: 'Session created', user: userDB })
})


router.post('/register', async (req, res) => {
    const { first_name, last_name, email, username, password } = req.body;
    //chequeamos que haya llenado todos los datos
    if (!first_name || !last_name || !username || !password) {
        return res.status(400).json({ message: "Some data is missing" });
    }
    //chequeamos que se pueda usar el username
    const userDB = await usersManager.findUser(username);
    if (userDB) {
        return res.status(400).json({ message: "Username already used" });
    }

    // const user = { first_name, last_name, email, username, password }
    // const result = await usersManager.create(user);
    // res.send({ status: "success", payload: result, message: "user registered" });
    try {
        const hashPassword = await hashData(password)
        const newUser = { ...req.body, password: hashPassword }
        const response = await usersManager.create(newUser);
        res.status(200).json({ status: "success", payload: response, message: "User created" })
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})



router.post("/login", async (req, res) => {
    const { username, password } = req.body
    if (!username || !password) {
        return res.status(400).json({ message: 'Some data is missing' })
    }
    //1!!!! buscar usuario
    const userDB = await usersManager.findUser(username)
    if (!userDB) {
        return res.status(400).json({ message: 'User is not registered' })
    }
    //chequeamos el password
    const isPasswordValid = await compareHashData(password, userDB.password)

    if (!isPasswordValid) {

        return res.status(401).json({ message: 'Username or Password not valid' })
    }


    req.session.user = {
        name: `${userDB.first_name} ${userDB.last_name}`,
        email: userDB.email,
        username: username,

    }

    res.status(200).json({ message: 'Session created', user: userDB })

})

router.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).send({ status: "error", error: "No pudo cerrar sesion" })
        res.redirect('/login');
    })
})

//passport

router.get("/githubSignup", passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/github", passport.authenticate("github", {
    failureRedirect: "/login"
}), (req, res) => {
    console.log(req.user);
    req.session["username"] = req.user.username;
    res.redirect("api/views/profile");
}
);

//passport con google

router.get('/auth/google',
    passport.authenticate('google', { scope: ['user:email'] }));

router.get('/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        console.log(req.user);
        req.session["username"] = req.user.username;
        res.redirect("api/views/profile");
    });

export default router;
