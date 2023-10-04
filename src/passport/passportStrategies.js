import passport from "passport";
import usersModel from "../db/models/users.model.js";
import { Strategy as githubStrategy } from "passport-github2";
import { Strategy as localStrategy } from "passport-local";
import { Strategy as googleStrategy } from "passport-google-oauth20";
import { usersManager } from "../managers/users/userManager.js";
import { compareHashData, hashData } from "../utils.js";






//local 

passport.use('login', new localStrategy(
    async function (username, password, done) {
        try {
            const userDB = await usersManager.findUser(username)
            if (!userDB) {
                return done(null, false)
            }
            const isPasswordValid = await compareHashData(password, userDB.password)
            if (!isPasswordValid) {
                return done(null, false)
            }
            return done(null, userDB)
        } catch (error) {
            done(error)
        }
    }
))
//local singup
passport.use(
    "localSignUp",
    new localStrategy({
        usernameField: "email",
        passReqToCallback: true,
    },
        async (req, username, password, done) => {
            const { first_name, last_name } = req.body
            if (!first_name || !last_name || !username || !password || !age) {
                return done(null, false);
            }
            try {
                const user = await usersManager.findUser(username)
                if (user) {
                    return done(null, false);
                }
                const hashPassword = await hashData(password)
                const newUser = { ...req.body, password: hashPassword }
                const response = await usersManager.createOne(newUser)
                done(null, response)
            } catch (error) {
                done(error)
            }
        })
);


//github

passport.use(new githubStrategy({
    clientID: 'Iv1.228b7835da6f6924',
    clientSecret: '6fe76744f0a8111fb272e46279d1fc7e89ed687c',
    callbackURL: "http://localhost:8080/api/session/github",
    usernameField: "email"
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const userDB = await usersManager.findUser(profile.username)
            //login
            if (userDB) {
                if (userDB.fromGithub) {
                    return done(null, userDB)
                } else {
                    return done(null, false)
                }
            }
            // registro
            const newUser = {
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                username: profile.username,
                email: profile.email,
                password: ' ',
                fromGithub: false
            }
            const result = await usersManager.create(newUser)
            return done(null, result)
        } catch (error) {
            done(error)
        }
    }
))
// passport con google

passport.use(new googleStrategy({
    clientID: '639480626800-qqd1d6ticnjeai86unkth0a8ivt83alr.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: "http://localhost:8080/api/views/profile",
    passReqToCallback: true,
    
},
    async function (accessToken, refreshToken, profile, done) {
        try {
            const userDB = await usersManager.findUser(profile.username)
            //login
            if (userDB) {
                if (userDB.fromGoogle) {
                    return done(null, userDB)
                } else {
                    return done(null, false)
                }
            }
            // registro
            const newUser = {
                first_name: profile.displayName.split(' ')[0],
                last_name: profile.displayName.split(' ')[1],
                username: profile.username,
                email: profile.email,
                password: ' ',
                fromGoogle: false
            }
            const result = await usersManager.create(newUser)
            return done(null, result)
        } catch (error) {
            done(error)
        }
    }
));




//user=>id

passport.serializeUser((user, done) => {
    done(null, user._id)
})

//id=>user

passport.deserializeUser(async (id, done) => {
    try {
        const user = await usersModel.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
})

