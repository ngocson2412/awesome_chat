import passport from "passport"
import passportFacebook from "passport-facebook"
import UserModel from "./../../models/userModel"
import {transErrors, tranSuccess} from "./../../../lang/vi"

let FacebookStrategy = passportFacebook.Strategy

let fbAppId = process.env.FB_APP_ID
let fbAppSecret = process.env.FB_APP_SECRET
let fbCallbackUrl = process.env.FB_CALLBACK_URL
/**
 * Valid use account type: facebook
 */

let initPassportFacebook = () => {
    passport.use(new FacebookStrategy({
        clientID: fbAppId,
        clientSecret: fbAppSecret,
        callbackURL: fbCallbackUrl,
        passReqToCallback: true,
        profileFields: ["email", "gender", "displayName"]
    }, async (req, aceessToken, refreshToken, profile, done) => {
        try {
            let user = await UserModel.findByFbUid(profile.id)
            if(user) {
                return done(null, user, req.flash("success",tranSuccess.login_successfull(user.username)))
            }
            
            let newUserItem = {
                username: profile.displayName,
                gender: profile.gender,
                local: {
                    isActive: true
                },
                facebook: {
                    uid: profile.id,
                    token: aceessToken,
                    email: profile.emails[0].value
                }
            }
            let newUser = await UserModel.createNew(newUserItem)
            return done(null, newUser, req.flash("success",tranSuccess.login_successfull(newUser.username)))
        } catch (error) {
            console.log(error)
            return done(null, false, req.flash("errors",transErrors.server_error))
        }
    }))

    // save userId to session
    passport.serializeUser((user, done) => {
        done(null, user._id)
    })

    //this is called by passport.session()
    //return userInfo to req.user
    passport.deserializeUser((id, done) => {
        UserModel.findUserById(id)
        .then(user => {
            return done(null, user)
        })
        .catch(error =>{
            return done(error, null)
        } )
    })
}

module.exports = initPassportFacebook
