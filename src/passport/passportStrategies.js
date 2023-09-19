import passport from "passport";
import usersModel from "../db/models/users.model.js";
import { Strategy as githubStrategy } from "passport-github2";
import { Strategy as localStrategy } from "passport-local";
import { usersManager } from "../managers/users/userManager.js";
import { compareData } from "../utils.js";






//local 

passport.use('login', new localStrategy(
    async function (username, password, done) {
        try {
            const userDB = await usersManager.findUser(username)
            if (!userDB) {
                return done(null, false)
            }
            const isPasswordValid = await compareData(password, userDB.password)
            if (!isPasswordValid) {
                return done(null, false)
            }
            return done(null, userDB)
        } catch (error) {
            done(error)
        }
    }
))

//github

passport.use( new githubStrategy({
    clientID: 'Iv1.228b7835da6f6924',
    clientSecret: '6fe76744f0a8111fb272e46279d1fc7e89ed687c',
    callbackURL: "https://localhost:8080/api/session/github"
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
                email:profile.email,
                password: ' ',
                fromGithub: true
            }
            const result = await usersManager.create(newUser)
            return done(null, result)
        } catch (error) {
            done(error)
        }
    }
))

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

