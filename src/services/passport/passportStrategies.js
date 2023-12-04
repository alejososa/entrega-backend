import passport from "passport";
import userModel from "../../persistencia/db/models/users.model.js";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GithubStrategy } from "passport-github2";
import { usersManager } from "../../persistencia/DAOs/managers/users/userManagerMonngo.js";
import { compareHashData } from "../../utils.js";

// Estrategia Local
passport.use("local", new LocalStrategy (
    async function (username, password, done) {
        try {
            const user = await usersManager.findUser(username)
            if (!user) {
                return done (null, false)
            }
            const isPasswordValid = await compareHashData(password, user.password)
            if (!isPasswordValid) {
                return done(null, false)
            }
            return done(null, user)
        } catch (error) {
            done (error)
        }
    }
));

// Estrategia Github
passport.use("github", new GithubStrategy ({
    clientID: 'Iv1.228b7835da6f6924',
    clientSecret: '6fe76744f0a8111fb272e46279d1fc7e89ed687c',
    callbackURL: 'http://localhost:8080/api/session/githubcallback',
    },
    async function(accessToken, refreshToken, profile, done) {
        try {
            //console.log(profile)
            const user = await userModel.findOne({email: profile.username});
            if (user) {
                return done(null, user)
            }
            //console.log(user)
            // Login
            if(user) {
                if(user.fromGithub) {
                    return done(null, user)
                } else {
                    return done(null, false)
                }
            }
            // Register
            const newUser = {
                first_name: profile.displayName.split(" ") [0],
                last_name: profile.displayName.split(" ") [1],
                email: profile.username,
                password: " ",
                fromGithub: true,
            }
            const result = await userModel.create(newUser)
            return done(null, result)
        } catch (error) {
            done(error)
        }
    }
));

// passport con google

// passport.use(new googleStrategy({
//     clientID: '639480626800-qqd1d6ticnjeai86unkth0a8ivt83alr.apps.googleusercontent.com',
//     clientSecret: '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',
//     callbackURL: "http://localhost:8080/api/views/profile",
//     passReqToCallback: true,
    
// },
//     async function (accessToken, refreshToken, profile, done) {
//         try {
//             const userDB = await usersManager.findUser(profile.username)
//             //login
//             if (userDB) {
//                 if (userDB.fromGoogle) {
//                     return done(null, userDB)
//                 } else {
//                     return done(null, false)
//                 }
//             }
//             // registro
//             const newUser = {
//                 first_name: profile.displayName.split(' ')[0],
//                 last_name: profile.displayName.split(' ')[1],
//                 username: profile.username,
//                 email: profile.email,
//                 password: ' ',
//                 fromGoogle: false
//             }
//             const result = await usersManager.create(newUser)
//             return done(null, result)
//         } catch (error) {
//             done(error)
//         }
//     }
// ));



//with out cookies
// passport.use('jwt',new current({
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: jwtSecretKey
// },async(jwt_payload, done)=>{
//     console.log('jwt_payload', jwt_payload);
//     done(null,jwt_payload.user)

// }))


//with galletas

// const cookieExtractor= (req)=>{
//     return req.cookies.token
//     }
    
    
    
//     passport.use('jwt',new current({
//         jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
//         secretOrKey: jwtSecretKey
//     },async(jwt_payload, done)=>{
//         console.log('jwt_payload', jwt_payload);
//         done(null,jwt_payload.user)
    
//     }))
    




// User => ID
passport.serializeUser((user, done) => {
   
    done(null, user)
});

// ID => User
passport.deserializeUser(async (id, done) => {
    try {
       
        const user = await userModel.findById(id)
        done(null, user)
    } catch (error) {
        done(error)
    }
});